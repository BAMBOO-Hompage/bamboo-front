import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import AlexandriaData from "../../mockup_data/alexandria_data.tsx";
import "../../App.css";

export default function AlexandriaPost() {
  const alexandriaData = AlexandriaData();

  const postId = parseInt(localStorage.getItem("postId") || "0");
  const currentPost = alexandriaData.filter((post) => postId == post.id)[0];

  return (
    <div>
      <Nav type="dataCenter" />
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
              height: "1200px",
              margin: "100px auto",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "60px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                  marginBottom: "8px",
                }}
              >
                알렉산드리아 도서관
              </div>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                알렉산드리아 도서관은 이집트 알렉산드리아에 있었던 고대에 가장
                크고 영향력 있는 도서관으로,
                <br />
                세상의 모든 지식을 수집한다는 의미를 가지고 있습니다.
              </div>
            </div>

            <div
              style={{
                width: "100%",
                height: "960px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "20px",
                    fontFamily: "Pretendard-Bold",
                    fontSize: "28px",
                    color: "#fff",
                  }}
                >
                  {currentPost.title}
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;논문 링크</div>
                  <a
                    href={currentPost.link}
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                    target="_blank"
                  >
                    {currentPost.link}
                  </a>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;연도</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.year}
                  </div>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;주제</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.subject}
                  </div>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;태그</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.tag}
                  </div>
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#444",
                    height: "2px",
                  }}
                />
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "600px",
                    marginBottom: "20px",
                    borderRadius: "30px",
                    border: "none",
                    padding: "20px",
                    overflowY: "auto",
                  }}
                >
                  <MDEditor.Markdown
                    style={{
                      backgroundColor: "transparent",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                    source={currentPost.content}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="destructive"
                    size="small"
                    title="취소"
                    onClick={() => {
                      const deleteAdd =
                        window.confirm("작성을 취소하시겠습니까?");
                      if (deleteAdd) {
                        window.location.href = "/alexandria";
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
