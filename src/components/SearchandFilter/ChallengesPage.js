import React, { useState, useEffect } from 'react';
import SearchBar from '../SearchBar/SearchBar'; 
import ChalangesList from '../ChalangesList/ChalangesList'; 

const ChallengesPage = () => {
    const [challenges, setChallenges] = useState([]);
    const [filteredChallenges, setFilteredChallenges] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ status: [], level: [] });

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                "https://react-demo-project-a0e30-default-rtdb.firebaseio.com/challenges.json"
            );
            const data = await res.json();
            const values = Object.values(data);
            setChallenges(values);
            setFilteredChallenges(values);
        };

        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchQuery, filters, challenges]);

    const applyFilters = () => {
        let result = challenges;

        if (searchQuery) {
            result = result.filter(challenge =>
                challenge.challengeName.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filters.status.length) {
            result = result.filter(challenge => filters.status.includes(challenge.status));
        }
        if (filters.level.length) {
            result = result.filter(challenge => filters.level.includes(challenge.levelType));
        }

        setFilteredChallenges(result);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleFilter = (category, value) => {
        setFilters(prev => {
            const updatedCategory = prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value];
            return { ...prev, [category]: updatedCategory };
        });
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
            <ChalangesList searchQuery={searchQuery} filters={filters} />
        </div>
    );
};

export default ChallengesPage;
