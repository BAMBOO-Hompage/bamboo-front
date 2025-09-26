import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetNoticesAPI from "../../api/notices/getNoticesAPI.tsx";

import "../../App.css";

type Notice = {
  noticeId: number;
  title: string;
  content: string;
  writerId: number;
  writerName: string;
  type: string;
  images: string[];
  files: string[];
  comments: string[];
  createdAt: number[];
  updatedAt: number[];
};

const maxVisiblePages = 5;

export default function Notice() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const postList = searchParams.get("post") || "전체";

  const [checkAuth, setCheckAuth] = useState<number>(0);
  const [postsToDisplay, setPostsToDisplay] = useState<Notice[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) {
      page = 1;
      alert("첫 페이지 입니다.");
      return;
    }
    if (page > totalPages) {
      page = totalPages;
      alert("마지막 페이지 입니다.");
      return;
    }
    setSearchParams({
      post: postList,
      page: page.toString(),
      size: "8",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_MEMBER") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    const fetchActivities = async () => {
      const result = await GetNoticesAPI(postList, currentPage);
      const noticeData = result.content;
      setTotalPages(result.totalPages);
      if (currentPage > result.totalPages && result.totalPages > 0) {
        setSearchParams({
          post: postList,
          page: result.totalPages.toString(),
          size: "8",
        });
      } else {
        setPostsToDisplay(noticeData);
      }
    };
    fetchActivities();
  }, [postList, currentPage, setSearchParams]);

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
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              minHeight: "1000px",
              padding: "0 20px",
              margin: "100px auto",
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
                  fontFamily: "Paperozi-Regular",
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
                  fontFamily: "Paperozi-Regular",
                  fontSize: "18px",
                }}
              >
                {["전체", "대회 및 세미나", "동아리 공지"].map((category) => (
                  <div
                    key={category}
                    className="side_tabs"
                    style={
                      postList === category
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSearchParams({
                        post: category,
                        page: "1",
                        size: "8",
                      });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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
              key={postList}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "clamp(20px, 4vw, 50px)",
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
                    fontFamily: "Paperozi-Semibold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  {postList}
                </div>
                {checkAuth === 2 ? (
                  <Link
                    to={`/noticeAdd?post=${searchParams.get("post")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Paperozi-Light",
                      fontSize: "18px",
                      color: "#777",
                      textDecoration: "none",
                    }}
                  >
                    공지 사항 작성&emsp;
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
                    />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              <div style={{ margin: "40px 0 50px" }}>
                {postsToDisplay.length > 0 ? (
                  postsToDisplay.map((post) => (
                    <Link
                      to={`/noticePost?id=${post.noticeId}`}
                      key={post.noticeId}
                      style={{
                        textDecoration: "none",
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
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Paperozi-Regular",
                            fontSize: "15px",
                            color: "#2CC295",
                          }}
                        >
                          {post.type}
                        </div>
                        <div
                          style={{
                            marginBottom: "5px",
                            fontFamily: "Paperozi-Semibold",
                            fontSize: "18px",
                            color: "#fff",
                          }}
                        >
                          {post.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "Paperozi-Regular",
                            fontSize: "15px",
                            color: "#888",
                          }}
                        >
                          작성자: {post.writerName}
                          &emsp; 작성 일자:{" "}
                          {post.createdAt[0] +
                            "/" +
                            post.createdAt[1] +
                            "/" +
                            post.createdAt[2] +
                            " " +
                            post.createdAt[3] +
                            ":" +
                            post.createdAt[4] +
                            ":" +
                            post.createdAt[5]}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "Paperozi-Light",
                      fontSize: "18px",
                      textAlign: "center",
                      padding: "50px 40px",
                    }}
                  >
                    게시물이 없습니다.
                  </div>
                )}
              </div>

              {postsToDisplay.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "770px",
                    marginTop: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(1)}
                  >
                    <img
                      src="../img/btn/pageStart.png"
                      alt="pageStart"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(currentPage - 1)}
                  >
                    <img
                      src="../img/btn/pagePrev.png"
                      alt="pagePrev"
                      style={{
                        height: "12px",
                      }}
                    />
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
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(currentPage + 1)}
                  >
                    <img
                      src="../img/btn/pageNext.png"
                      alt="pageNext"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(totalPages)}
                  >
                    <img
                      src="../img/btn/pageEnd.png"
                      alt="pageNext"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* <motion.div
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
          <LockedPagePrepare />
        </motion.div> */}

        <BottomInfo />
      </div>
    </div>
  );
}
