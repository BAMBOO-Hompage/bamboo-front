import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.tsx";

import LogIn from "./tabs/main/logIn.tsx";
import PrivacyPolicy from "./tabs/main/privacyPolicy.tsx";
import SignUp from "./tabs/main/signUp.tsx";
import Main from "./tabs/main.tsx";

import PersonalInfo from "./tabs/myPage/personalInfo.tsx";
import MembershipManagement from "./tabs/myPage/membershipManagement.tsx";
import CurriculumManagement from "./tabs/myPage/curriculumManagement.tsx";
import StudyManagement from "./tabs/myPage/studyManagement.tsx";

import Introduction from "./tabs/aboutUs/introduction.tsx";
import Activity from "./tabs/aboutUs/activity.tsx";
import ActivityAdd from "./tabs/aboutUs/activityAdd.tsx";
import ActivityEdit from "./tabs/aboutUs/activityEdit.tsx";
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
import AlexandriaEdit from "./tabs/dataCenter/alexandriaEdit.tsx";
import AlexandriaPost from "./tabs/dataCenter/alexandriaPost.tsx";
import HallOfFame from "./tabs/dataCenter/hallOfFame.tsx";
import Project from "./tabs/dataCenter/project.tsx";

import CurriculumStudy from "./tabs/study/curriculumStudy.tsx";
import SelfStudy from "./tabs/study/selfStudy.tsx";
import StudyPost from "./tabs/study/studyPost.tsx";
import StudyAdd from "./tabs/study/studyAdd.tsx";
import StudyRecruitment from "./tabs/study/studyRecruitment.tsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/signUp" element={<SignUp />} />

          <Route path="/personalInfo" element={<PersonalInfo />} />
          <Route
            path="/membershipManagement"
            element={<MembershipManagement />}
          />
          <Route
            path="/curriculumManagement"
            element={<CurriculumManagement />}
          />
          <Route path="/studyManagement" element={<StudyManagement />} />

          <Route path="/introduction" element={<Introduction />} />
          <Route path="/joinUs" element={<JoinUs type="inPeriod" />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activityAdd" element={<ActivityAdd />} />
          <Route path="/activityEdit" element={<ActivityEdit />} />

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
          <Route path="/alexandriaPost" element={<AlexandriaPost />} />
          <Route path="/alexandriaEdit" element={<AlexandriaEdit />} />
          <Route path="/hallOfFame" element={<HallOfFame />} />
          <Route path="/project" element={<Project />} />

          <Route path="/curriculumStudy" element={<CurriculumStudy />} />
          <Route path="/selfStudy" element={<SelfStudy />} />
          <Route path="/studyPost" element={<StudyPost />} />
          <Route path="/studyAdd" element={<StudyAdd />} />
          <Route path="/studyRecruitment" element={<StudyRecruitment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
