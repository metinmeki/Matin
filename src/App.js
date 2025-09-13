import "./App.css";
import React, { useState, useEffect } from "react";
import "./style.css";
import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Preloader from "./Preloader";
import MyNav from "./components/navbar/MyNav";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home_page/HomePage";
import Resume from "./pages/resume_page/ResumePage";
import ProjectPage from "./pages/project_page/ProjectPage";
import CertificatePage from "./pages/certificate_page/CertificatePage";
import ComingSoon from "./pages/comingsoon_page/comingsoon";
import Notfound from "./pages/blogs_page/notfound";

import About from "./components/aboutme/about/About";
import Ranking from "./components/aboutme/ranking/Ranking";
import EducationJourney from "./components/aboutme/journey/EducationJourney";
import ExperienceJourney from "./components/aboutme/journey/ExperienceJourney";
import TechnicalJourney from "./components/aboutme/journey/TechnicalJourney";
import ProjectJourney from "./components/aboutme/journey/ProjectJourney";
import PersonalSkill from "./components/aboutme/skills/PersonalSkill";
import TechnicalSkill from "./components/aboutme/skills/TechnicalSkill";
import Toolkit from "./components/aboutme/skills/Toolkit";
import SocialMedia from "./components/aboutme/social_media/SocialMedia";
import Footer from "./components/footer/Footer";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => updateLoad(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <MyNav />
        <Routes>
          {/* Home page nested routes */}
          <Route path="/" element={<Home />}>
            <Route index element={<About />} />
            <Route path="personalskill" element={<PersonalSkill />} />
            <Route path="technicalskill" element={<TechnicalSkill />} />
            <Route path="technicaljourney" element={<TechnicalJourney />} />
            <Route path="projectjourney" element={<ProjectJourney />} />
            <Route path="educationjourney" element={<EducationJourney />} />
            <Route path="experiencejourney" element={<ExperienceJourney />} />
            <Route path="ranking" element={<Ranking />} />
            <Route path="socialmedia" element={<SocialMedia />} />
            <Route path="toolkit" element={<Toolkit />} />
          </Route>

          {/* Other main routes */}
          <Route path="/projectspage" element={<ProjectPage />} />
          <Route path="/certificateepage" element={<CertificatePage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blogs" element={<ComingSoon />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
