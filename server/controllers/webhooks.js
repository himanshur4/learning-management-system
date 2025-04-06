import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
        
        if (!webhookSecret) {
            throw new Error('Webhook secret is not defined');
        }

        const whook = new Webhook(webhookSecret);
        
        // Verify webhook signature
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;
        console.log('Webhook type:', type);
        console.log('Webhook data:', data);

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || data.imageUrl || '',
                };
                console.log('Creating user:', userData);
                const user = await User.create(userData);
                console.log('User created successfully:', user);
                res.status(201).json({ success: true, user });
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    imageUrl: data.image_url || data.imageUrl || '',
                };
                console.log('Updating user:', data.id, userData);
                const user = await User.findByIdAndUpdate(data.id, userData, { new: true });
                console.log('User updated successfully:', user);
                res.status(200).json({ success: true, user });
                break;
            }

            case 'user.deleted': {
                console.log('Deleting user:', data.id);
                await User.findByIdAndDelete(data.id);
                console.log('User deleted successfully');
                res.status(200).json({ success: true });
                break;
            }

            default:
                console.log('Unhandled webhook type:', type);
                res.status(400).json({ success: false, message: 'Unhandled webhook type' });
                break;
        }
    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};