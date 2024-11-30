import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import AlexandriaData from "../../mockup_data/alexandria_data.tsx";
import "../../App.css";

const papersPerPage = 11;
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
  const data = AlexandriaData();

  const filteredData = data.filter(
    (paper) => paperList === "전체" || paper.category === paperList
  );

  const totalPages = Math.ceil(filteredData.length / papersPerPage);
  const startIndex = (currentPage - 1) * papersPerPage;
  const endIndex = startIndex + papersPerPage;
  const papersToDisplay = filteredData.slice(startIndex, endIndex);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Nav type="dataCenter" />
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
              width: "60%",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  marginBottom: "45px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
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
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    marginRight: "150px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100px",
                      height: "36px",
                      marginRight: "10px",
                      borderRadius: "20px 0 0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "15px",
                      color: "#2CC295",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <select
                      defaultValue="논문 이름"
                      style={{
                        boxSizing: "border-box",
                        width: "90%",
                        height: "30px",
                        backgroundColor: "transparent",
                        border: "none",
                        fontFamily: "Pretendard-Light",
                        fontSize: "16px",
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
                      width: "300px",
                      height: "36px",
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
                        borderRadius: "0",
                        fontFamily: "Pretendard-Light",
                        fontSize: "16px",
                      }}
                    />
                    <input type="text" style={{ display: "none" }} />
                    <img
                      src="../../img/btn/search_disabled.png"
                      style={{
                        width: "30px",
                        marginRight: "5px",
                        opacity: "0.5",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>

                <img
                  src="../../img/btn/edit_enabled.png"
                  style={{ width: "30px", cursor: "pointer" }}
                  onClick={() => {
                    window.location = "/paperAdd";
                  }}
                />
              </div>
            </div>

            <div>
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
                <div style={{ width: "34%" }}>논문 이름</div>
                <div style={{ width: "9%" }}>연도</div>
                <div style={{ width: "14%" }}>태그</div>
                <div style={{ width: "19%" }}>주제</div>
                <div style={{ width: "9%" }}>발표자</div>
                <div style={{ width: "10%" }}>논문 링크</div>
              </div>
              <hr
                style={{ height: "1px", background: "#666", border: "none" }}
              />

              {papersToDisplay.map((paper) => (
                <div key={paper.id}>
                  <div
                    style={{
                      width: "100%",
                      height: "80px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "34%" }}>{paper.title}</div>
                    <div style={{ width: "9%" }}>{paper.year}</div>
                    <div style={{ width: "14%" }}>#transformer #detector</div>
                    <div style={{ width: "19%" }}>{paper.subject}</div>
                    <div style={{ width: "9%" }}>{paper.user.name}</div>
                    <div
                      style={{
                        width: "10%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <a href={paper.link} target="_blank">
                          <img
                            src="../../img/btn/link_disabled.png"
                            style={{ width: "30px" }}
                          />
                        </a>
                        <Link
                          to="/paper"
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            localStorage.setItem("paperId", paper.id);
                          }}
                        >
                          <img
                            src="../../img/btn/move.png"
                            style={{ width: "13px" }}
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
            </div>

            <div
              style={{
                width: "100%",
                position: "absolute",
                bottom: "10px",
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
          </motion.div>
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
