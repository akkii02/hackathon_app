import React, { useState, useEffect } from 'react';
import Card from "../Card/Card";
import styles from "./ChalangesList.module.css";

const calculateStatus = (startDateTime, endDateTime) => {
    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (now < start) {
        return 'Upcoming';
    } else if (now >= start && now <= end) {
        return 'Active';
    } else {
        return 'Past';
    }
};

const ChalangesList = ({ searchQuery, filters }) => {
  const [cardData, setCardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://react-demo-project-a0e30-default-rtdb.firebaseio.com/challenges.json"
        );
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        const values = Object.values(data);
        const dataWithStatus = values.map(challenge => ({
          ...challenge,
          status: calculateStatus(challenge.startDate, challenge.endDate)
        }));

        setCardData(dataWithStatus);
        setFilteredData(dataWithStatus);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, cardData]);

  const applyFilters = () => {
    let result = [...cardData];

    if (searchQuery) {
      result = result.filter(challenge =>
        challenge.challengeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      result = result.filter(challenge =>
        filters.status.includes(challenge.status)
      );
    }

    if (filters.level.length > 0) {
      result = result.filter(challenge =>
        filters.level.includes(challenge.levelType)
      );
    }

    setFilteredData(result);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        {filteredData.length === 0 ? (
          <p className={styles.notFound}>No data available</p>
        ) : (
          filteredData.map((data) => {
            console.log('Rendering Card with data:', data);
            return (
              <Card
                key={data.id}
                id={data.id}
                imgSrc={data.image}
                heading={data.challengeName}
                startDateTime={data.startDate}
                endDateTime={data.endDate}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChalangesList;
