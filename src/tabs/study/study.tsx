import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import StudyData from "../../mockup_data/study_data.tsx";
import "../../App.css";

export default function Study() {
  const data = StudyData();

  const postId = localStorage.getItem("studyId");
  const currentPost = data.filter((post) => postId == post.id)[0];

  return (
    <div>
      <Nav type="study" />
      <div id="background" className="background">
        <div style={{ height: "200vh", display: "flex", padding: "100px 0" }}>
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
              width: "400px",
              borderRight: "1px solid #444",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "140px",
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#fff",
                position: "absolute",
                right: "50px",
              }}
            >
              스터디 모집
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                }}
              >
                <div
                  className="post_tabs"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  목록으로
                </div>
              </div>
            </div>
          </motion.div>

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
              width: "1120px",
              height: "100%",
              textAlign: "left",
            }}
          >
            <div style={{ width: "810px", position: "absolute", left: "60px" }}>
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "18px",
                    color: "#2CC295",
                  }}
                >
                  {currentPost.category}
                </div>
                <div style={{ height: "25px" }}>
                  <img
                    src="../../img/btn/trash_disabled.png"
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      marginRight: "15px",
                    }}
                    onClick={() => {
                      const confirm = window.confirm("정말 삭제하시겠습니까?");
                      if (confirm) {
                        window.location = "/postBoard";
                      }
                    }}
                    onMouseOver={(event) => {
                      event.target.src = `../../img/btn/trash_enabled.png`;
                    }}
                    onMouseOut={(event) => {
                      event.target.src = `../../img/btn/trash_disabled.png`;
                    }}
                  />
                  <img
                    src="../../img/btn/edit_enabled.png"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {
                      window.location = "/postEdit";
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: "15px",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {currentPost.title}
              </div>
              <div
                style={{
                  marginBottom: "100px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  color: "#fff",
                }}
              >
                작성 일자 : {currentPost.date}
              </div>
              <div>
                <pre
                  style={{
                    marginBottom: "15px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "22px",
                  }}
                >
                  {currentPost.content}
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
