import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SubscriptionPage from "./pages/SubscriptionPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import MainPage from "./pages/MainPage.jsx";
import ResumeEditorPage from "./pages/ResumeEditorPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PublicResumePage from "./pages/PublicResumePage.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/auth" element={<SignInPage/>}/>
                <Route path="/reg" element={<SignUpPage/>}/>
                <Route path="/edit" element={<ResumeEditorPage />} />
                <Route path="/edit/:template" element={<ResumeEditorPage />} />
                <Route path="/edit/:template/:resumeId" element={<ResumeEditorPage />} />
                <Route path="/subscript" element={<SubscriptionPage/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/r/:slug" element={<PublicResumePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}
