import { ref, set, get, remove } from 'firebase/database';
import { db } from './firebaseConfig';


export const saveChallenge = async (challengeData) => {
  try {
    const challengeRef = ref(db, 'challenges/' + (challengeData.id || new Date().getTime()));
    await set(challengeRef, challengeData);
  } catch (error) {
    console.error("Error saving challenge:", error);
  }
};


export const fetchChallenges = async () => {
    try {
        const challengesRef = ref(db, 'challenges');
        const snapshot = await get(challengesRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return {}; 
        }
    } catch (error) {
        console.error("Error fetching challenges:", error);
        return {}; 
    }
};


export const getChallengeById = async (id) => {
    try {
        const challenges = await fetchChallenges();
        if (challenges) {
            const challenge = Object.values(challenges).find(challenge => challenge.id === id);
            return challenge || null;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching challenge by ID:", error);
        return null;
    }
};

export const deleteChallengeById = async (id) => {
    try {
        const challengeRef = ref(db, 'challenges/' + id);
        await remove(challengeRef);
    } catch (error) {
        console.error("Error deleting challenge:", error);
    }
};
