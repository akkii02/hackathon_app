import React, { useState, useEffect } from "react";
import styles from "./CreateChallenges.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uil_calender from "../../assets/icons/uil_calender.svg";
import upload from "../../assets/icons/bxs_cloud-upload.svg";
import { uploadImage } from '../utils/firebaseStorage';
import { saveChallenge, getChallengeById } from '../utils/realtimeDatabase';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { format, parseISO } from 'date-fns'; 
import editImgIcon from "../../assets/icons/bi_image-fill.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const CreateChallenges = () => {
  const [challengeName, setChallengeName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(""); 
  const [levelType, setLevelType] = useState("Easy");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    if (id) {
      const fetchChallenge = async () => {
        try {
          const challengeData = await getChallengeById(id); 
          if (challengeData) {
            setChallengeName(challengeData.challengeName);
            setStartDate(challengeData.startDate ? parseISO(challengeData.startDate) : null);
            setEndDate(challengeData.endDate ? parseISO(challengeData.endDate) : null);
            setDescription(challengeData.description);
            setImagePreview(challengeData.image); 
            setLevelType(challengeData.levelType);
          } else {
            setError("Challenge not found.");
          }
        } catch (error) {
          console.error("Error fetching challenge:", error);
          setError("An error occurred while fetching the challenge data.");
        }
      };

      fetchChallenge();
    }
  }, [id]);

  const validateDates = (start, end) => {
    if (start && end && new Date(start) > new Date(end)) {
      setError("End date must be after the start date.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDates(startDate, endDate)) {
      return;
    }

    setLoading(true);
    try {
      let imageUrl = imagePreview; 
      if (image) {
        imageUrl = await uploadImage(image);
      }

      const challengeData = {
        id: id || uuidv4(), 
        challengeName,
        startDate: startDate ? startDate.toISOString() : "",
        endDate: endDate ? endDate.toISOString() : "",
        description,
        image: imageUrl,
        levelType
      };

      await saveChallenge(challengeData); 
      alert(id ? 'Challenge updated successfully!' : 'Challenge created successfully!');
      navigate('/');
    } catch (error) {
      console.error("Error saving challenge:", error);
      setError("An error occurred while saving the challenge.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0])); 
    }
  };

  // Format dates for display
  const formatDate = (date) => {
    return date ? format(parseISO(date), "do MMM'yy hh:mm a") : ""; 
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headingBar}>
        <div className={styles.subDiv}>
          <p className={styles.heading}>{id ? 'Edit Challenge' : 'Create Challenge'}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.formMainContainer}>
        <div className={styles.formContainer}>
          <label htmlFor="challengeName">Challenge Name</label>
          <input
            id="challengeName"
            type="text"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
          />
        </div>
        <div className={styles.formContainer}>
          <label htmlFor="startDate">Start Date and Time</label>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.date}
              id="startDate"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Add start date and time"
            />
            <img src={uil_calender} alt="calendar" className={styles.imgs} />
          </div>
        </div>
        <div className={styles.formContainer}>
          <label htmlFor="endDate">End Date and Time</label>
          <div className={styles.dateWrapper}>
            <DatePicker
              className={styles.date}
              id="endDate"
              selected={endDate}
              onChange={(date) => {
                if (validateDates(startDate, date)) {
                  setEndDate(date);
                }
              }}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Add end date and time"
            />
            <img src={uil_calender} alt="calendar" className={styles.imgs} />
          </div>
        </div>
        <div className={styles.formContainer}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        { id ? (
               <div className={`${styles.formContainer}`}>
               <label htmlFor="image">Image</label> 
               <div className={styles.imgWrapper}>

                 {imagePreview && (
                   <img src={imagePreview} alt="Current Challenge" className={styles.imagePreview} />
                  )}
               <div className={styles.editWrapper}>
                 <input
                   type="file"
                   id="image"
                   className={styles.editUpload}
                   onChange={handleImageChange} 
                   />
                 <img src={editImgIcon} alt="EditImgIcon" className={styles.editIcon} />
                 <p className={styles.editText}>Change Image</p>
                 <FontAwesomeIcon icon={faArrowRight} style={{color: "#44924c",}} />
                   </div>
               </div>
             </div>
        ):

        <div className={`${styles.formContainer}`}>
          <label htmlFor="image">Image</label> 
            {imagePreview && (
              <img src={imagePreview} alt="Current Challenge" className={styles.imagePreview} />
            )}
          <div className={styles.uploadWrapper}>
            <input
              type="file"
              id="image"
              className={styles.upload}
              onChange={handleImageChange} 
            />
            <p className={styles.uploadText}>Upload</p>
            <img src={upload} alt="UploadIcon" className={styles.uploadIcon} />
          </div>
        </div>
        }
        <div className={styles.formContainer}>
          <label htmlFor="levelType">Level Type</label>
          <select
            id="levelType"
            className={styles.selectBtn}
            value={levelType}
            onChange={(e) => setLevelType(e.target.value)}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.createBtn} type="submit" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Challenge' : 'Create Challenge')}
        </button>
      </form>
    </div>
  );
};

export default CreateChallenges;
