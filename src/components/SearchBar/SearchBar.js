import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faAngleDown, faAngleUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

const SearchBar = ({ onSearch, onFilter }) => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        status: [],
        level: []
    });
    const [searchQuery, setSearchQuery] = useState('');
    const filterRef = useRef(null);

    const toggleFilter = () => setShowFilter(prev => !prev);

    const handleCheckboxChange = (category, value) => {
        setSelectedFilters(prev => {
            const updatedCategory = prev[category].includes(value)
                ? prev[category].filter(item => item !== value)
                : [...prev[category], value];
            return { ...prev, [category]: updatedCategory };
        });
        onFilter(category, value);
    };

    const handleRemoveFilter = (category, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [category]: prev[category].filter(item => item !== value)
        }));
        onFilter(category, value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleMouseOver = () => {
        setShowFilter(true);
    };

    const handleMouseLeave = (e) => {
        if (!filterRef.current.contains(e.relatedTarget)) {
            setShowFilter(false);
        }
    };

    const renderSelectedFilters = () => {
        const { status, level } = selectedFilters;
        let filters = [];
        if (status.length) filters.push(...status);
        if (level.length) filters.push(...level);
        return filters.length > 0 ? filters.map(filter => (
            <span key={filter} className={styles.filterTag}>
                {filter}
                <FontAwesomeIcon
                    icon={faTimes}
                    className={styles.removeIcon}
                    onClick={() => {
                        if (status.includes(filter)) handleRemoveFilter('status', filter);
                        if (level.includes(filter)) handleRemoveFilter('level', filter);
                    }}
                />
            </span>
        )) : null;
    };

    return (
        <div className={styles.main}>
            <h3 className={styles.heading}>Explore Challenges</h3>
            <div className={styles.container}>
                <div className={styles.searchBarContainer}>
                    <FontAwesomeIcon className={styles.icon} icon={faMagnifyingGlass} />
                    <input
                        className={styles.searchInput}
                        type="search"
                        name="search"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div
                    className={styles.filterContainer}
                    onMouseOver={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    ref={filterRef}
                >
                    <button
                        className={`${styles.filterButton} ${showFilter ? styles.expanded : ''}`}
                        onClick={toggleFilter}
                    >
                        Filter
                        <FontAwesomeIcon
                            className={`${styles.filterIcon} ${showFilter ? styles.up : styles.down}`}
                            icon={showFilter ? faAngleUp : faAngleDown}
                        />
                    </button>
                    <div className={`${styles.dropdown} ${showFilter ? styles.show : ''}`}>
                        <span className={styles.divider}></span>
                        <div className={styles.section}>
                            <h4>Status</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    value="All"
                                    checked={selectedFilters.status.includes('All')}
                                    onChange={() => handleCheckboxChange('status', 'All')}
                                />
                                All
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Active"
                                    checked={selectedFilters.status.includes('Active')}
                                    onChange={() => handleCheckboxChange('status', 'Active')}
                                />
                                Active
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Upcoming"
                                    checked={selectedFilters.status.includes('Upcoming')}
                                    onChange={() => handleCheckboxChange('status', 'Upcoming')}
                                />
                                Upcoming
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Past"
                                    checked={selectedFilters.status.includes('Past')}
                                    onChange={() => handleCheckboxChange('status', 'Past')}
                                />
                                Past
                            </label>
                        </div>
                        <div className={styles.section}>
                            <span className={styles.divider}></span>
                            <h4>Level</h4>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Easy"
                                    checked={selectedFilters.level.includes('Easy')}
                                    onChange={() => handleCheckboxChange('level', 'Easy')}
                                />
                                Easy
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Medium"
                                    checked={selectedFilters.level.includes('Medium')}
                                    onChange={() => handleCheckboxChange('level', 'Medium')}
                                />
                                Medium
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    value="Hard"
                                    checked={selectedFilters.level.includes('Hard')}
                                    onChange={() => handleCheckboxChange('level', 'Hard')}
                                />
                                Hard
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.showFilterOption}>
                {renderSelectedFilters()}
            </div>
        </div>
    );
};

export default SearchBar;
