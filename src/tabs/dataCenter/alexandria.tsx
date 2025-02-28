import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetPapersAPI from "../../api/library-posts/getPapersAPI.tsx";

import "../../App.css";

type Paper = {
  libraryPostId: number;
  paperName: string;
  link: string;
  year: string;
  member: { studentId: number; name: string };
  topic: string;
  tagNames: string[];
  content: string;
};

const maxVisiblePages = 5;

export default function Alexandria() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const paperList = searchParams.get("tab") || "논문 이름";
  const searchKeyword = searchParams.get("search") || "";

  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [papersToDisplay, setPapersToDisplay] = useState<Paper[]>([]);
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
      tab: paperList,
      search: searchKeyword,
      page: page.toString(),
      size: "10",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (
        data.role === "ROLE_ADMIN" ||
        data.role === "ROLE_OPS" ||
        data.role === "ROLE_MEMBER"
      ) {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    GetPapersAPI(paperList, searchKeyword, currentPage).then((result) => {
      var alexandriaData = result.content;
      setPapersToDisplay(alexandriaData);
      setTotalPages(result.totalPages);
    });
  }, [paperList, searchKeyword, currentPage]);

  const onValid = (e: any) => {
    console.log(e, "onValid");
    setSearchParams({
      tab: e.PaperList,
      search: e.SearchKeyword,
      page: "1",
      size: "10",
    });
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
    window.location.href = "/alexandria?tab=&search&page=1&size=10";
  };

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
            minHeight: "1000px",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              padding: "0 20px",
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
              className="alexandria_1"
              style={{
                width: "100%",
                marginBottom: "40px",
              }}
            >
              <form
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
                onSubmit={handleSubmit(onValid, onInvalid)}
              >
                <div
                  style={{
                    width: "100px",
                    height: "40px",
                    padding: "0 10px",
                    marginRight: "10px",
                    borderRadius: "20px 0 0 20px",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  }}
                >
                  <select
                    defaultValue={searchParams.get("tab") || "논문 이름"}
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      border: "none",
                      borderRadius: "15px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                    }}
                    {...register("PaperList", {
                      validate: (value) =>
                        value !== "전체" || "카테고리를 선택해주세요.",
                    })}
                  >
                    <option
                      value="논문 이름"
                      style={{ background: "#111015", cursor: "pointer" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#2cc295";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#111015";
                      }}
                    >
                      논문 이름
                    </option>
                    <option
                      value="연도"
                      style={{ background: "#111015", cursor: "pointer" }}
                    >
                      연도
                    </option>
                    <option
                      value="태그"
                      style={{ background: "#111015", cursor: "pointer" }}
                    >
                      태그
                    </option>
                  </select>
                </div>
                <div
                  style={{
                    maxWidth: "2550px",
                    height: "40px",
                    borderRadius: "0 20px 20px 0",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="search"
                    type="text"
                    defaultValue={searchParams.get("search") || ""}
                    placeholder="논문 검색"
                    style={{
                      width: "100%",
                      height: "15px",
                      padding: "15px 10px",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderRadius: "10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      display: "flex",
                    }}
                    {...register("SearchKeyword", {
                      required: "검색어를 입력해주세요.",
                    })}
                  />
                  <input type="text" style={{ display: "none" }} />
                  <button
                    type="submit"
                    style={{
                      width: "30px",
                      height: "30px",
                      marginRight: "5px",
                      padding: "0",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <img
                      src="../../img/btn/search_disabled.png"
                      alt="search"
                      style={{
                        width: "30px",
                        opacity: "0.5",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.5";
                      }}
                    />
                  </button>
                </div>
              </form>
              <div
                className="alexandria_2"
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "center",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  color: "#777",
                }}
              >
                논문 리뷰 작성&emsp;
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
                    window.location.href = "/alexandriaAdd";
                  }}
                />
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Pretendard-Light",
                fontSize: "16px",
                color: "#888",
                gap: "14px",
              }}
            >
              <div style={{ width: "340px" }}>논문 이름</div>
              <div style={{ width: "70px" }}>연도</div>
              <div style={{ width: "100px" }}>태그</div>
              <div style={{ width: "240px" }}>주제</div>
              <div style={{ width: "80px" }}>발표자</div>
              <div style={{ width: "100px" }}>논문</div>
            </div>
            <hr style={{ height: "1px", background: "#666", border: "none" }} />

            {papersToDisplay.length > 0 ? (
              papersToDisplay.map((paper) => (
                <div key={paper.libraryPostId}>
                  <div
                    style={{
                      width: "100%",
                      minHeight: "78px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "340px",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word",
                      }}
                    >
                      <Link
                        to={`/alexandriaPost?id=${paper.libraryPostId}`}
                        style={{ textDecoration: "none", color: "#fff" }}
                      >
                        {paper.paperName}
                      </Link>
                    </div>
                    <div style={{ width: "70px" }}>{paper.year}</div>
                    <div
                      style={{
                        width: "100px",
                        overflow: "hidden",
                      }}
                    >
                      {paper.tagNames.slice(0, 4).map((tag, index) => (
                        <div
                          key={index}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span style={{ color: "#2CC295" }}>#</span>
                          {tag}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        width: "240px",
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        overflowWrap: "break-word",
                      }}
                    >
                      {paper.topic}
                    </div>
                    <div style={{ width: "80px" }}>{paper.member.name}</div>
                    <div
                      style={{
                        width: "100px",
                        minHeight: "100%",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "90%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a href={paper.link} target="_blank" rel="noreferrer">
                          <img
                            src="../../img/btn/link_disabled.png"
                            alt="link"
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
                        </a>
                        <Link
                          to={`/alexandriaPost?id=${paper.libraryPostId}`}
                          style={{ textDecoration: "none" }}
                        >
                          <img
                            src="../../img/btn/move.png"
                            alt="move"
                            style={{
                              width: "12px",
                              cursor: "pointer",
                              transition: "transform 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = "scale(1.4)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <hr
                    style={{
                      height: "1px",
                      background: "#666",
                      border: "none",
                    }}
                  />
                </div>
              ))
            ) : (
              <div
                style={{
                  color: "#fff",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  textAlign: "center",
                  padding: "50px 40px",
                }}
              >
                검색 결과가 없습니다.
              </div>
            )}

            {papersToDisplay.length > 0 ? (
              <div
                style={{
                  width: "100%",
                  marginTop: "100px",
                  paddingBottom: "100px",
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
            ) : (
              <></>
            )}
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
