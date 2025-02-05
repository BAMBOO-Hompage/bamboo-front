import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import KnowledgeData from "../../mockup_data/knowledge_data.tsx";
import "../../App.css";

export default function KnowledgePost() {
  const knowledgeData = KnowledgeData();

  const sanitizer = dompurify.sanitize;

  const postId = parseInt(localStorage.getItem("postId") || "0");
  const currentPost = knowledgeData.filter((post) => postId == post.id)[0];

  return (
    <div>
      <Nav type="community" />
      <div id="background" className="background">
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
            height: "1250px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1100px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "100%",
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
                정보 공유
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
                    window.history.back();
                  }}
                >
                  목록으로
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
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
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
                <div style={{ height: "30px" }}>
                  <img
                    src="../../img/btn/trash_disabled.png"
                    alt="trash"
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      marginRight: "15px",
                    }}
                    onClick={() => {
                      const confirm = window.confirm("정말 삭제하시겠습니까?");
                      if (confirm) {
                        window.history.back();
                      }
                    }}
                    onMouseOver={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `../../img/btn/trash_enabled.png`;
                    }}
                    onMouseOut={(e) => {
                      (
                        e.target as HTMLImageElement
                      ).src = `../../img/btn/trash_disabled.png`;
                    }}
                  />
                  <img
                    src="../../img/btn/edit_enabled.png"
                    alt="edit"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {
                      window.location.href = "/knowledgeEdit";
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginBottom: "13px",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {currentPost.title}
              </div>
              <div
                style={{
                  marginBottom: "50px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                작성 일자 : {currentPost.date}
              </div>
              <div>
                <div
                  className="container"
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(`${currentPost.content}`),
                  }}
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "1.4",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
