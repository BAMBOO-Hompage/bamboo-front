import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import NoticeData from "../../mockup_data/notice_data.tsx";

import "../../App.css";

const postsPerPage = 8;
const maxVisiblePages = 5;

export default function Notice() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPostList = searchParams.get("postList") || "전체";

  const noticeData = NoticeData();

  const filteredData = noticeData.filter(
    (post) => currentPostList === "전체" || post.category === currentPostList
  );

  const totalPages = Math.ceil(filteredData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToDisplay = filteredData.slice(startIndex, endIndex);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setSearchParams({ postList: currentPostList, page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const changePostList = (newPostList: string) => {
    setSearchParams({ postList: newPostList, page: "1" }); // 카테고리 변경 시 페이지를 1로 초기화
  };

  return (
    <div>
      <Nav type="community" />
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
            height: "1450px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1300px",
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
                공지 사항
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                {["전체", "대회 및 세미나", "동아리 공지"].map((category) => (
                  <div
                    key={category}
                    className="side_tabs"
                    style={
                      currentPostList === category
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => changePostList(category)}
                  >
                    {category}
                  </div>
                ))}
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
              key={currentPostList}
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
                  {currentPostList}
                </div>
              </div>

              <div style={{ margin: "40px 0 50px" }}>
                {postsToDisplay.map((post) => (
                  <div
                    key={post.id}
                    style={{
                      width: "100%",
                      height: "110px",
                      backgroundColor: "#222",
                      border: "0.5px solid #343434",
                      borderRadius: "30px",
                      marginBottom: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "0.5px solid #777";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "0.5px solid #343434";
                    }}
                  >
                    <div style={{ width: "90%", margin: "0 auto" }}>
                      <Link
                        to="/noticePost"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          sessionStorage.setItem("postList", currentPostList);
                          sessionStorage.setItem(
                            "currentPage",
                            String(currentPage)
                          );
                        }}
                      >
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Pretendard-Regular",
                            fontSize: "15px",
                            color: "#2CC295",
                          }}
                        >
                          {post.category}
                        </div>
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Pretendard-SemiBold",
                            fontSize: "18px",
                            color: "#fff",
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Pretendard-Regular",
                            fontSize: "15px",
                            color: "#888",
                          }}
                        >
                          작성일자 : {post.date}
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: "770px",
                  position: "absolute",
                  bottom: "0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button className="bottom_tabs" onClick={() => changePage(1)}>
                  {"<<"}
                </button>
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(currentPage - 1)}
                >
                  {"<"}
                </button>
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((page) => (
                  <button
                    key={page}
                    className="bottom_tabs"
                    onClick={() => changePage(page)}
                    style={
                      page === currentPage
                        ? {
                            textShadow: "0 0 0.1em, 0 0 0.1em",
                            color: "#2CC295",
                          }
                        : {}
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(currentPage + 1)}
                >
                  {">"}
                </button>
                <button
                  className="bottom_tabs"
                  onClick={() => changePage(totalPages)}
                >
                  {">>"}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
