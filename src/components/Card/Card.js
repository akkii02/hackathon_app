import { useState, useEffect } from 'react';
import styles from "./Card.module.css";
import circleCheck from "../../assets/circleCheck.png";
import { useNavigate } from 'react-router-dom';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return 'th'; 
        switch (day % 10) {
            case 1:  return 'st';
            case 2:  return 'nd';
            case 3:  return 'rd';
            default: return 'th';
        }
    };

    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    const formattedDay = `${day}${ordinalSuffix}`;

    const options = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', options).format(date);

    const year = date.getFullYear().toString().slice(-2);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

    return `${formattedDay} ${month} '${year} ${formattedTime}`;
};

const Card = ({ id, imgSrc, heading, startDateTime, endDateTime }) => {
    const navigate = useNavigate();
    const [timeRemaining, setTimeRemaining] = useState({});
    const [status, setStatus] = useState('Upcoming');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const start = new Date(startDateTime);
            const end = new Date(endDateTime);

            if (now < start) {
                const total = start - now;
                const days = Math.floor(total / (1000 * 60 * 60 * 24));
                const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

                setStatus('Upcoming');
                setTimeRemaining({ days, hours, mins });
            } else if (now >= start && now <= end) {
                const total = end - now;
                const days = Math.floor(total / (1000 * 60 * 60 * 24));
                const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const mins = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

                setStatus('Active');
                setTimeRemaining({ days, hours, mins });
            } else {
                setStatus('Past');
                setTimeRemaining({});
            }
        };

        updateTime(); 

        const interval = setInterval(() => {
            updateTime();
        }, 60000); 

        return () => clearInterval(interval); 
    }, [startDateTime, endDateTime]);

    if (!imgSrc || !heading || !startDateTime || !endDateTime) {
        return null; 
    }

    const handleClick = () => {
        navigate(`/challenge-detail/${id}`);
    };

    const statusClass = 
        status === 'Upcoming' ? styles.statusUpcoming :
        status === 'Active' ? styles.statusActive :
        styles.statusPast;
    return (
        <div className={styles.main} onClick={handleClick}>
            <div className={styles.imgContainer}>
                <img src={imgSrc} alt="Challenge" />
            </div>
            <div className={styles.infoContainer}>
                <p className={statusClass}>{status}</p>
                <h3 className={styles.heading}>{heading}</h3>
                <div className={styles.timer}>
                    <h6 className={styles.status}>
                        {status === 'Past' ? 'Event Ended' : status === 'Upcoming' ? 'In Coming Days' : 'Ends in'}
                    </h6>
                    <div className={styles.currentTimingTab}>
                        {status === 'Past' ? (
                            <div>
                                <h4 className={styles.pastNote}>{formatDate(endDateTime)}</h4>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h4>{timeRemaining.days !== undefined ? timeRemaining.days : '00'}</h4>
                                    <p>Days</p>
                                </div>
                                <span className={styles.timeDivider}>:</span>
                                <div>
                                    <h4>{timeRemaining.hours !== undefined ? timeRemaining.hours : '00'}</h4>
                                    <p>Hours</p>
                                </div>
                                <span className={styles.timeDivider}>:</span>
                                <div>
                                    <h4>{timeRemaining.mins !== undefined ? timeRemaining.mins : '00'}</h4>
                                    <p>Mins</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <button className={styles.cardBtn}>
                    <img src={circleCheck} alt="Check" />
                    Participate Now
                </button>
            </div>
        </div>
    );
};

export default Card;
