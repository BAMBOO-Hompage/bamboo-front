import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import ImageSlider from "../../components/imageSlider.tsx";

import ActivityData from "../../mockup_data/activity_data.tsx";
import "../../App.css";

const activityData = ActivityData();

export default function Activity() {
  const [yearList, setYearList] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    parseInt(moment(activityData[0].date).format("YYYY"))
  );
  const [currentPage, setCurrentPage] = useState(1);

  const filteredActivityData = activityData.filter(
    (activity) =>
      parseInt(moment(activity.date).format("YYYY")) === selectedYear
  );

  const postsPerPage = 3;
  const maxVisiblePages = 5;

  const totalPages = Math.ceil(filteredActivityData.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToDisplay = filteredActivityData.slice(startIndex, endIndex);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (activityData.length > 0) {
      const latestYear = parseInt(moment(activityData[0].date).format("YYYY"));
      const years: Array<number> = [];
      for (let year = latestYear; year >= 2022; year--) {
        years.push(year);
      }
      setYearList(years); // 상태 업데이트
    }
  }, [activityData]);

  return (
    <div>
      <Nav type="aboutUs" />
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
                주요 활동
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                {yearList.map((year) => (
                  <div
                    key={year}
                    className="side_tabs"
                    style={
                      selectedYear === year
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSelectedYear(year);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {year}
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
              key={selectedYear}
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "40px",
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
                  {selectedYear}년도
                </div>
                <Link to="/">
                  <img
                    src="../../img/btn/edit_enabled.png"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {}}
                  />
                </Link>
              </div>
              <div
                style={{
                  width: "780px",
                }}
              >
                {postsToDisplay.map((activity) => (
                  <div
                    key={activity.id}
                    style={{
                      marginTop: "40px",
                      marginBottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-SemiBold",
                        fontSize: "20px",
                        color: "#fff",
                      }}
                    >
                      {activity.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "16px",
                        color: "#777",
                        marginBottom: "10px",
                      }}
                    >
                      {activity.date}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "280px",
                      }}
                    >
                      <ImageSlider images={activity.images} />
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: "810px",
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%)",
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
