import React, { useEffect, useState } from 'react';
import styles from "./ChallengesDetailPage.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import clock from "../../assets/clock.png";
import signal from "../../assets/signal.png";
import { getChallengeById, deleteChallengeById } from '../utils/realtimeDatabase';
import { format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale'; 
import Loading from '../Loading/Loading';

const ChallengesDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getChallengeById(id);
                if (data) {
                    setChallenge(data);
                } else {
                    setError("Challenge not found.");
                }
            } catch (err) {
                setError("Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const handleEditClick = () => {
        if (challenge) {
            navigate(`/edit-challenge/${challenge.id}`);
        }
    };

    const handleDeleteClick = async () => {
        try {
            await deleteChallengeById(id);
            navigate('/');
        } catch (err) {
            setError("Error deleting challenge.");
        }
    };

    const formatDate = (date) => {
        if (!date) return "";
        try {
            const parsedDate = typeof date === 'string' ? parseISO(date) : new Date(date);
            const day = format(parsedDate, "do", { locale: enGB });
            const monthYear = format(parsedDate, "MMM'yy", { locale: enGB });
            const time = format(parsedDate, "hh:mm a");
            return `${day} ${monthYear} ${time} (India Standard Time)`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return date;
        }
    };

    if (loading) return <Loading/>;
    if (error) return <div>{error}</div>;

    if (!challenge) return null;
    const { startDate, challengeName, description, levelType, image } = challenge;
    const truncatedDescription = description.length > 100 ? description.substring(0, 100) + '...' : description;

    return (
        <div className={styles.detailContainer}>
            <div className={styles.detailHead}>
                <div className={styles.infoContainer}>
                    <h4 className={styles.timeBanner}>
                        <img src={clock} alt="Clock Logo" /> Starts on {formatDate(startDate)}
                    </h4>
                    <h1 className={styles.heading}>
                        {challengeName}
                    </h1>
                    <p className={styles.paragraph}>
                        {truncatedDescription}
                    </p>
                    <h5 className={styles.levelBtn}>
                        <img src={signal} alt="Signal Logo" className={styles.logoSignal} />
                        <h6 className={styles.txt}> {levelType}</h6>
                    </h5>
                </div>
            </div>
            <div className={styles.mainBar}>
                <div className={styles.overviewBar}>
                    <h1 className={styles.overviewBarHead}>Overview</h1>
                    <div className={styles.overviewBtn}>
                        <button onClick={handleEditClick} className={styles.edit}>Edit</button>
                        <button onClick={handleDeleteClick} className={styles.del}>Delete</button>
                    </div>
                </div>
            </div>
            <p className={styles.des}>
               {description}
            </p>
        </div>
    );
};

export default ChallengesDetailPage;
