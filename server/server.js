import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());

// Initialize database connection
try {
    await connectDB();
    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
}

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});

app.post('/clerk', express.json(), clerkWebhooks);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});