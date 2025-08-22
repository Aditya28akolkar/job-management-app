import React, { useState, createContext, useEffect } from 'react';
import { jobsData } from '../assets/assets';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
    // Initialize state from local storage or default to an empty object
    const [searchFilter, setSearchFilter] = useState(() => {
        const storedFilter = localStorage.getItem('searchFilter');
        return storedFilter ? JSON.parse(storedFilter) : {
            title: '',
            location: ''
        };
    });

    const [isSearched, setInSearched] = useState(false);
const [jobs,setJobs]=useState([])
const [showRecruiterLogin,setshowRecruiterLogin]=useState(false)

//functin to fetch job data

const fetchJobs=async()=>{
setJobs(jobsData)
}
    // Save searchFilter to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('searchFilter', JSON.stringify(searchFilter));
    }, [searchFilter]);


    useEffect(()=>{
fetchJobs()
    },[])
    const value = {
        setSearchFilter,
        searchFilter,
        isSearched,
        setInSearched,
        jobs,setJobs,
        showRecruiterLogin,setshowRecruiterLogin
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};