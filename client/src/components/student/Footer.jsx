import React from 'react'
import assets from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-fuchsia-950 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.gurukulLogo} alt="logo" />
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Empowering learners through accessible, high-quality education. Our LMS platform connects students and instructors to a world of knowledge—anytime, anywhere.</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2 '>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About us</a>
            </li>
            <li>
              <a href="#">Contact us</a>
            </li>
            <li>
              <a href="#">Privacy policy</a>
            </li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>The latest news, articles, and resources, sent to your inbox weekly.</p>
          <div className='flex items-center gap-2 pt-4'>
            <input type="email" placeholder='Enter your email' className='border border-gray-500 bg-gray-900 text-gray-300 placeholder-gray-400 outline-none w-64 h-9 rounded px-2 text-sm' />
            <button className='bg-fuchsia-500 w-24 h-9 text-white rounded cursor-pointer'>Subscribe</button>
          </div>
        </div>

      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>
        Copyright {new Date().getFullYear()} © Gurukul. All Right Reserved.
      </p>

    </footer>
  )
}

export default Footer
