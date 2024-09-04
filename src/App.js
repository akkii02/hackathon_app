import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import InfoBar from './components/InfoBar/InfoBar';
import Information from './components/ChanllengesInformation/Information';
import SearchBar from './components/SearchBar/SearchBar';
import ChalangesList from './components/ChalangesList/ChalangesList';
import CreateChallenges from './components/CreateChallengesForm/CreateChallenges'; 
import ChallengesDetailPage from './components/ChallengesDetailPage/ChallengesDetailPage';
import ChallengesPage from './components/SearchandFilter/ChallengesPage';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection/>
            <InfoBar/>
            <Information/>
            {/* <SearchBar/>
            <ChalangesList/> */}
            <ChallengesPage/>
          </>
        } />
        <Route path="/create-challenge" element={<CreateChallenges />} />
        <Route path="/edit-challenge/:id" element={<CreateChallenges />} /> 
        <Route path="/challenge-detail/:id" element={<ChallengesDetailPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
