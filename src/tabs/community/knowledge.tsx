import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import KnowledgeData from "../../mockup_data/knowledge_data.tsx";

import "../../App.css";

const postsPerPage = 8;
const maxVisiblePages = 5;

export default function Knoledge() {
  const [postList, setPostList] = useState<string>("전체");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const knowledgeData = KnowledgeData();

  const filteredData = knowledgeData.filter(
    (post) => postList === "전체" || post.category === postList
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
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useLayoutEffect(() => {
    const scrollY = sessionStorage.getItem("scrollY");
    const postList = sessionStorage.getItem("postList");
    const currentPage = sessionStorage.getItem("currentPage");

    if (scrollY) {
      window.scrollTo({ top: parseInt(scrollY, 10), behavior: "auto" });
      sessionStorage.removeItem("scrollY");
    }
    if (postList) {
      setPostList(postList);
      sessionStorage.removeItem("postList");
    }
    if (currentPage) {
      setCurrentPage(parseInt(currentPage, 10));
      sessionStorage.removeItem("currentPage");
    }
  }, []);

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
                지식 공유
                <br />
                게시판
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
                    postList === "전체"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("전체");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  전체
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "학습 자료"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("학습 자료");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  학습 자료
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "기술 트랜드 및 뉴스"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("기술 트랜드 및 뉴스");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  기술 트랜드 및 뉴스
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "커리어 및 취업 정보"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("커리어 및 취업 정보");
                    setCurrentPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  커리어 및 취업 정보
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
                  {postList === "전체" ? (
                    <div>전체</div>
                  ) : postList === "학습 자료" ? (
                    <div>학습 자료</div>
                  ) : postList === "기술 트랜드 및 뉴스" ? (
                    <div>기술 트랜드 및 뉴스</div>
                  ) : (
                    <div>커리어 및 취업 정보</div>
                  )}
                </div>
                <Link to="/knowledgeAdd">
                  <img
                    src="../../img/btn/edit_enabled.png"
                    alt="edit"
                    style={{
                      width: "30px",
                      cursor: "pointer",
                      opacity: "0.8",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onClick={() => {
                      localStorage.setItem("postList", postList);
                    }}
                  />
                </Link>
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
                        to="/knowledgePost"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          sessionStorage.setItem(
                            "scrollY",
                            String(window.scrollY)
                          );
                          sessionStorage.setItem("postList", postList);
                          sessionStorage.setItem(
                            "currentPage",
                            String(currentPage)
                          );
                          localStorage.setItem("postId", String(post.id));
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

        <BottomInfo />
      </div>
    </div>
  );
}
