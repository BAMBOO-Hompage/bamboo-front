import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.tsx";

import LogIn from "./tabs/logIn.tsx";
import SignUp from "./tabs/signUp.tsx";
import Main from "./tabs/main.tsx";
import MyPage from "./tabs/myPage.tsx";

import Introduction from "./tabs/aboutUs/introduction.tsx";
import Activity from "./tabs/aboutUs/activity.tsx";
import ActivityAdd from "./tabs/aboutUs/activityAdd.tsx";
import JoinUs from "./tabs/aboutUs/joinUs.tsx";

import Notice from "./tabs/community/notice.tsx";
import NoticeAdd from "./tabs/community/noticeAdd.tsx";
import NoticeEdit from "./tabs/community/noticeEdit.tsx";
import NoticePost from "./tabs/community/noticePost.tsx";
import Knowledge from "./tabs/community/knowledge.tsx";
import KnowledgeAdd from "./tabs/community/knowledgeAdd.tsx";
import KnowledgeEdit from "./tabs/community/knowledgeEdit.tsx";
import KnowledgePost from "./tabs/community/knowledgePost.tsx";

import Alexandria from "./tabs/dataCenter/alexandria.tsx";
import AlexandriaAdd from "./tabs/dataCenter/alexandriaAdd.tsx";
import PaperEdit from "./tabs/dataCenter/paperEdit.tsx";
import Paper from "./tabs/dataCenter/paper.tsx";
import HallOfFame from "./tabs/dataCenter/hallOfFame.tsx";

import CurriculumStudy from "./tabs/study/curriculumStudy.tsx";
import SelfStudy from "./tabs/study/selfStudy.tsx";
import StudyRecruitment from "./tabs/study/studyRecruitment.tsx";
import Study from "./tabs/study/study.tsx";
import StudyAdd from "./tabs/study/studyAdd.tsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/myPage" element={<MyPage />} />

          <Route path="/introduction" element={<Introduction />} />
          <Route path="/joinUs" element={<JoinUs type="inPeriod" />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activityAdd" element={<ActivityAdd />} />

          <Route path="/notice" element={<Notice />} />
          <Route path="/noticeAdd" element={<NoticeAdd />} />
          <Route path="/noticeEdit" element={<NoticeEdit />} />
          <Route path="/noticePost" element={<NoticePost />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/knowledgeAdd" element={<KnowledgeAdd />} />
          <Route path="/knowledgeEdit" element={<KnowledgeEdit />} />
          <Route path="/knowledgePost" element={<KnowledgePost />} />

          <Route path="/alexandria" element={<Alexandria />} />
          <Route path="/alexandriaAdd" element={<AlexandriaAdd />} />
          <Route path="/paper" element={<Paper />} />
          <Route path="/paperEdit" element={<PaperEdit />} />
          <Route path="/hallOfFame" element={<HallOfFame />} />

          <Route path="/curriculumStudy" element={<CurriculumStudy />} />
          <Route path="/selfStudy" element={<SelfStudy />} />
          <Route path="/studyRecruitment" element={<StudyRecruitment />} />
          <Route path="/studyAdd" element={<StudyAdd />} />
          <Route path="/study" element={<Study />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
