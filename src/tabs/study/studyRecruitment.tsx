import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import StudyData from "../../mockup_data/study_data.tsx";
// import StudyPostAPI from "../../api/studyPostAPI.tsx";
import "../../App.css";

const postsPerPage = 8;
const maxVisiblePages = 5;

export default function StudyRecruitment() {
  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <div
          style={{
            padding: "200px 0 300px",
            fontFamily: "Pretendard-Bold",
            fontSize: "40px",
          }}
        >
          Coming Soon...
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
