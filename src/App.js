import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './tabs/logIn.tsx';
import SignUp from './tabs/signUp.tsx';
import Main from './tabs/main.tsx';
import MyPage from './tabs/myPage.tsx';
import Activity from './tabs/community/activity.tsx';
import Discord from './tabs/community/discord.tsx';
import Post from './tabs/community/post.tsx';
import PostAdd from './tabs/community/postAdd.tsx';
import PostEdit from './tabs/community/postEdit.tsx';
import PostBoard from './tabs/community/postBoard.tsx';
import Alexandria from './tabs/dataCenter/alexandria.tsx';
import PaperAdd from './tabs/dataCenter/paperAdd.tsx';
import PaperEdit from './tabs/dataCenter/paperEdit.tsx';
import Paper from './tabs/dataCenter/paper.tsx';
import HallOfFame from './tabs/dataCenter/hallOfFame.tsx';
import Knowledge from './tabs/dataCenter/knowledge.tsx';
import Introduction from './tabs/joinUs/introduction.tsx';
import JoinUs from './tabs/joinUs/joinUs.tsx';
import ApplyStudy from './tabs/study/applyStudy.tsx';
import CurriculumStudy from './tabs/study/curriculumStudy.tsx';
import SelfStudy from './tabs/study/selfStudy.tsx';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/logIn" element={<LogIn />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/myPage" element={<MyPage />} />
                    <Route path="/activity" element={<Activity />} />
                    <Route path="/discord" element={<Discord />} />
                    <Route path="/post" element={<Post />} />
                    <Route path="/postAdd" element={<PostAdd />} />
                    <Route path="/postEdit" element={<PostEdit />} />
                    <Route path="/postBoard" element={<PostBoard />} />
                    <Route path="/alexandria" element={<Alexandria />} />
                    <Route path="/paper" element={<Paper />} />
                    <Route path="/paperAdd" element={<PaperAdd />} />
                    <Route path="/paperEdit" element={<PaperEdit />} />
                    <Route path="/hallOfFame" element={<HallOfFame />} />
                    <Route path="/knowledge" element={<Knowledge />} />
                    <Route path="/introduction" element={<Introduction />} />
                    <Route path="/joinUs" element={<JoinUs />} />
                    <Route path="/applyStudy" element={<ApplyStudy />} />
                    <Route path="/curriculumStudy" element={<CurriculumStudy />} />
                    <Route path="/selfStudy" element={<SelfStudy />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
