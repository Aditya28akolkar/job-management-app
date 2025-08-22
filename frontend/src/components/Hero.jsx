import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
    const { searchFilter, setSearchFilter, setInSearched } = useContext(AppContext);

    const onSearch = () => {
        setInSearched(true);
    };

    const handleTitleChange = (e) => {
        setSearchFilter(prev => ({ ...prev, title: e.target.value }));
    };

    const handleLocationChange = (e) => {
        setSearchFilter(prev => ({ ...prev, location: e.target.value }));
    };

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div className='bg-gradient-to-r from-blue-800 to-blue-900 text-white py-16 text-center mx-2 rounded-xl'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Over 10,000 jobs to apply</h2>
                <p className='mb-8 max-w-xl mx-auto text-sm font-light px-5'>Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!</p>
                <div className='flex items-center justify-between bg-white rounded text-black max-w-xl pl-4 mx-4 sm:mx-auto'>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                        <input
                            type='text'
                            placeholder='Search for jobs'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            value={searchFilter.title}
                            onChange={handleTitleChange}
                        />
                    </div>
                    <div className='flex items-center'>
                        <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                        <input
                            type='text'
                            placeholder='Location'
                            className='max-sm:text-xs p-2 rounded outline-none w-full'
                            value={searchFilter.location}
                            onChange={handleLocationChange}
                        />
                    </div>
                    <button onClick={onSearch} className='bg-violet-600 px-6 py-2 rounded text-white m-1'>Search</button>
                </div>
            </div>
            <div className='border border-black shadow-md mx-2 mt-5 p-6 rounded-md flex flex-col justify-center items-center gap-6 md:flex-row md:justify-around'>
                <p className='font-medium'>Trusted by</p>
                <div className='flex flex-wrap items-center justify-center gap-10 lg:gap-16'>
                    <img className='h-6' src={assets.microsoft_logo} alt="Microsoft" />
                    <img className='h-6' src={assets.accenture_logo} alt="Accenture" />
                    <img className='h-6' src={assets.amazon_logo} alt="Amazon" />
                    <img className='h-6' src={assets.samsung_logo} alt="Samsung" />
                    <img className='h-6' src={assets.walmart_logo} alt="Walmart" />
                    <img className='h-6' src={assets.adobe_logo} alt="Adobe" />
                </div>
            </div>
        </div>
    );
};

export default Hero;