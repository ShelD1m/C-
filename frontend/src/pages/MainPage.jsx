import React from "react";
import Header from "../components/ui/Header.jsx";
import LetsCreateResumeSection from "../components/main-sections/LetsCreateResumeSection.jsx";
import AiResumeSection from "../components/main-sections/AiResumeSection.jsx";
import CreationStagesSection from "../components/main-sections/CreationStagesSection.jsx";
import TemplatesPreviewSection from "../components/main-sections/TemplatesPreviewSection.jsx";
import "../styles/pages/MainPage.css"
import Footer from "../components/ui/Footer.jsx";

export default function MainPage() {
    return (
        <div className={"main-page"}>
            <Header variant="main-screen"/>
            <LetsCreateResumeSection/>
            <AiResumeSection />
            <TemplatesPreviewSection/>
            <CreationStagesSection/>
            <Footer/>
        </div>
    )
}