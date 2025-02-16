import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import SelectDeactivateAPI from "../../api/members/selectDeactivateAPI.tsx";
import GetMembersAPI from "../../api/members/getMembersAPI.tsx";
import PatchRoleAPI from "../../api/members/patchRoleAPI.tsx";

import "../../App.css";

type Members = {
  id: number;
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
};

export default function StudyManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Nav type="myPage" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              minHeight: "570px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "clamp(120px, 20vw, 180px)",
                minHeight: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                마이페이지
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href = "/personalInfo";
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href =
                      "/membershipManagement?page=1&size=10";
                  }}
                >
                  회원 관리
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href = "/curriculumManagement";
                  }}
                >
                  커리큘럼 관리
                </div>
                <div
                  className="side_tabs"
                  style={{
                    boxSizing: "border-box",
                    color: "#2CC295",
                    borderRight: "1px solid #2cc295",
                  }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  스터디 관리
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "clamp(20px, 4vw, 50px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  스터디 관리
                  <span
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#FF5005",
                    }}
                  >
                    test 기간동안만 개방합니다. (활동 종료 제한)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
