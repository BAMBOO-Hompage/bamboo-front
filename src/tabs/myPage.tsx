import React, { useState } from "react";
import { motion } from "framer-motion";

import PersonalInfo from "../tabs/myPage/personalInfo.tsx";

import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

const memberData = [
  {
    id: 1,
    role: "아기판다🐼",
    major: "휴먼지능정보공학전공",
    studentId: "202010770",
    name: "맹의현",
    phone: "01092428053",
  },
  {
    id: 2,
    role: "아기판다🐼",
    major: "휴먼지능정보공학전공",
    studentId: "202010789",
    name: "유민균",
    phone: "01077128734",
  },
];

export default function MyPage() {
  const [postList, setPostList] = useState<string>("개인 정보");

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
              width: "1000px",
              minHeight: "650px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "50px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "600px",
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
                  style={
                    postList === "개인 정보"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("개인 정보");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "회원 관리"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("회원 관리");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  회원 관리
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
              key={postList}
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              {postList === "개인 정보" ? (
                <PersonalInfo />
              ) : (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-Bold",
                        fontSize: "30px",
                        color: "#fff",
                      }}
                    >
                      회원 관리
                    </div>
                    <div></div>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      marginTop: "40px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                      color: "#888",
                    }}
                  >
                    <div style={{ width: "70px" }}>선택</div>
                    <div style={{ width: "120px" }}>등급</div>
                    <div style={{ width: "200px" }}>학과</div>
                    <div style={{ width: "140px" }}>학번</div>
                    <div style={{ width: "80px" }}>이름</div>
                    <div style={{ width: "140px" }}>전화 번호</div>
                  </div>
                  <hr
                    style={{
                      height: "1px",
                      background: "#666",
                      border: "none",
                    }}
                  />
                  {memberData.map((member) => (
                    <div key={member.id}>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          fontFamily: "Pretendard-Light",
                          fontSize: "16px",
                          color: "#fff",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ width: "70px" }}>선택버튼</div>
                        <div style={{ width: "120px" }}>{member.role}</div>
                        <div style={{ width: "200px" }}>{member.major}</div>
                        <div style={{ width: "140px" }}>{member.studentId}</div>
                        <div style={{ width: "80px" }}>{member.name}</div>
                        <div style={{ width: "140px" }}>{member.phone}</div>
                      </div>
                      <hr
                        style={{
                          height: "1px",
                          background: "#666",
                          border: "none",
                        }}
                      />
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
