import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto py-3 mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
      {/* Logo and copyright text section */}
      <div className='flex items-center gap-4'>
        <img width={160} src={assets.logo} alt="InsiderJobs logo" />
        <p className='text-sm text-gray-400'>Copyright @adityaakolkar | All rights reserved.</p>
      </div>

      {/* Social media icons and subscribe button */}
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-2'>
          <div className='w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center'>
            <img width={20} src={assets.facebook_icon} alt="Facebook icon" />
          </div>
          <div className='w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center'>
            <img width={20} src={assets.twitter_icon} alt="Twitter icon" />
          </div>
          <div className='w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center'>
            <img width={20} src={assets.instagram_icon} alt="Instagram icon" />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
