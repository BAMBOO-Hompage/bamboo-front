import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import AlexandriaData from "../../mockup_data/alexandria_data.tsx";
import "../../App.css";

const papersPerPage = 10;
const maxVisiblePages = 5;

export default function Alexandria() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [paperList, setPaperList] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);
  const paperData = AlexandriaData();

  const filteredData = paperData.filter((paper) => paperList === "전체");

  const totalPages = Math.ceil(filteredData.length / papersPerPage);
  const startIndex = (currentPage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const papersToDisplay = filteredData.slice(startIndex, endIndex);

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
    const currentPage = sessionStorage.getItem("currentPage");

    if (scrollY) {
      window.scrollTo({ top: parseInt(scrollY, 10), behavior: "auto" });
      sessionStorage.removeItem("scrollY");
    }
    if (currentPage) {
      setCurrentPage(parseInt(currentPage, 10));
      sessionStorage.removeItem("currentPage");
    }
  }, []);

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
            height: "1450px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1300px",
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
                marginBottom: "40px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <form
                style={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "120px",
                    height: "40px",
                    padding: "0 0 0 10px",
                    marginRight: "10px",
                    borderRadius: "20px 0 0 20px",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  }}
                >
                  <select
                    defaultValue="논문 이름"
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                    }}
                    {...register("Category", {
                      validate: (value) =>
                        value !== "전체" || "카테고리를 선택해주세요.",
                    })}
                  >
                    <option
                      value="논문 이름"
                      style={{ background: "#111015", cursor: "pointer" }}
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
                    width: "330px",
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
                    placeholder="논문 검색"
                    style={{
                      width: "300px",
                      height: "15px",
                      padding: "15px 10px",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      borderRadius: "10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                  <input type="text" style={{ display: "none" }} />
                  <img
                    src="../../img/btn/search_disabled.png"
                    alt="search"
                    style={{
                      width: "30px",
                      marginRight: "5px",
                      opacity: "0.5",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1"; // Hover 시 opacity 변경
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.5"; // Hover 해제 시 opacity 복원
                    }}
                    onClick={() => {}}
                  />
                </div>
              </form>
              <img
                src="../../img/btn/edit_enabled.png"
                alt="edit"
                style={{ width: "30px", cursor: "pointer", opacity: "0.8" }}
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

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "Pretendard-Light",
                fontSize: "16px",
                color: "#888",
              }}
            >
              <div style={{ width: "340px" }}>논문 이름</div>
              <div style={{ width: "70px" }}>연도</div>
              <div style={{ width: "140px" }}>태그</div>
              <div style={{ width: "200px" }}>주제</div>
              <div style={{ width: "80px" }}>발표자</div>
              <div style={{ width: "100px" }}>논문 링크</div>
            </div>
            <hr style={{ height: "1px", background: "#666", border: "none" }} />

            {papersToDisplay.map((paper) => (
              <div key={paper.id}>
                <div
                  style={{
                    width: "100%",
                    height: "78px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ width: "340px" }}>{paper.title}</div>
                  <div style={{ width: "70px" }}>{paper.year}</div>
                  <div style={{ width: "140px" }}>#transformer #detector</div>
                  <div style={{ width: "200px" }}>{paper.subject}</div>
                  <div style={{ width: "80px" }}>{paper.user.name}</div>
                  <div
                    style={{
                      width: "100px",
                      height: "100%",
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
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = "1"; // Hover 시 opacity 변경
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = "0.8"; // Hover 해제 시 opacity 복원
                          }}
                        />
                      </a>
                      <Link
                        to="/alexandriaPost"
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          sessionStorage.setItem(
                            "scrollY",
                            String(window.scrollY)
                          );
                          sessionStorage.setItem(
                            "currentPage",
                            String(currentPage)
                          );
                          localStorage.setItem("postId", String(paper.id));
                        }}
                      >
                        <img
                          src="../../img/btn/move.png"
                          alt="move"
                          style={{ width: "12px", cursor: "pointer" }}
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
            ))}

            <div
              style={{
                width: "100%",
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
                      ? { textShadow: "0 0 0.1em, 0 0 0.1em", color: "#2CC295" }
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
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
