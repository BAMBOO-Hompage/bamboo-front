import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import "../../App.css";

type StudyRecruitmentItem = {
  id: number;
  title: string;
  writerName: string;
  maxMembers: number;
  deadline: number[];
  createdAt: number[];
};

const maxVisiblePages = 5;
const pageSize = 8;

export default function StudyRecruitment() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const newStudy = location.state?.newStudy;

  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const keyword = searchParams.get("keyword") || "전체";
  const [checkAuth] = useState<number>(2);

  const [posts, setPosts] = useState<StudyRecruitmentItem[]>(
    Array.from({ length: 20 }, (_, idx) => ({
      id: idx + 1,
      title: `스터디 모집 ${idx + 1}`,
      writerName: `작성자${idx + 1}`,
      maxMembers: 5 + (idx % 3),
      deadline: [2025, 9, (idx % 28) + 1],
      createdAt: [2025, 8, 6, 10, idx, 0],
    }))
  );

  // 새 게시글 받아서 추가
  useEffect(() => {
    if (newStudy) {
      setPosts((prev) => [newStudy, ...prev]);

      // 작성 후 새 글 보이도록 1페이지로 이동
      setSearchParams({
        keyword,
        page: "1",
        size: pageSize.toString(),
      });

      // 새로고침 시 중복 방지
      window.history.replaceState({}, document.title);
    }
  }, [newStudy]);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(posts.length / pageSize);
  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) return alert("첫 페이지 입니다.");
    if (page > totalPages) return alert("마지막 페이지 입니다.");
    setSearchParams({
      keyword,
      page: page.toString(),
      size: pageSize.toString(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <LockedPagePrepare />
          {/* <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                width: "clamp(120px, 20vw, 180px)",
                borderRight: "1px solid #444",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                스터디 모집
              </div>

              <div style={{ marginTop: "40px", fontSize: "16px" }}>
                {["전체"].map((cat) => (
                  <div
                    key={cat}
                    className="side_tabs"
                    style={{
                      textAlign: "left",
                      paddingLeft: "10px",
                      ...(keyword === cat
                        ? {
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}),
                    }}
                    onClick={() =>
                      setSearchParams({
                        keyword: cat,
                        page: "1",
                        size: pageSize.toString(),
                      })
                    }
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              key={keyword + currentPage}
              style={{
                width: "100%",
                maxWidth: "820px",
                paddingLeft: "clamp(20px, 4vw, 50px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "40px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  {keyword}
                </div>

                {checkAuth === 2 ? (
                  <Link
                    to={`/studyRecruitmentAdd?keyword=${keyword}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#777",
                      textDecoration: "none",
                    }}
                  >
                    스터디 모집 작성&emsp;
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

              {paginatedPosts.length > 0 ? (
                paginatedPosts.map((post) => (
                  <Link
                    to={`/studyRecruitmentDetail?id=${post.id}`}
                    key={post.id}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      backgroundColor: "#222",
                      border: "0.5px solid #343434",
                      borderRadius: "30px",
                      marginBottom: "30px",
                      padding: "20px",
                    }}
                  >
                    <div style={{ color: "#fff", fontSize: "18px" }}>
                      {post.title}
                    </div>
                    <div style={{ color: "#888", fontSize: "15px" }}>
                      작성자: {post.writerName} &emsp; 인원: {post.maxMembers}명
                    </div>
                    <div style={{ color: "#2CC295", fontSize: "15px" }}>
                      마감: {post.deadline.join("/")}
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ color: "#fff", textAlign: "center" }}>
                  스터디 모집이 없습니다.
                </div>
              )}

              {paginatedPosts.length > 0 && (
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
                  <button className="bottom_btn" onClick={() => changePage(1)}>
                    <img
                      src="../img/btn/pageStart.png"
                      alt="pageStart"
                      style={{ height: "12px" }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    onClick={() => changePage(currentPage - 1)}
                  >
                    <img
                      src="../img/btn/pagePrev.png"
                      alt="pagePrev"
                      style={{ height: "12px" }}
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
                    onClick={() => changePage(currentPage + 1)}
                  >
                    <img
                      src="../img/btn/pageNext.png"
                      alt="pageNext"
                      style={{ height: "12px" }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    onClick={() => changePage(totalPages)}
                  >
                    <img
                      src="../img/btn/pageEnd.png"
                      alt="pageEnd"
                      style={{ height: "12px" }}
                    />
                  </button>
                </div>
              )}
            </motion.div>
          </div> */}
        </motion.div>
        <BottomInfo />
      </div>
    </div>
  );
}
