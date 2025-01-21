import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import ImageSlider from "../../components/imageSlider.tsx";

import GetActivitiesAPI from "../../api/main-activities/getActivitiesAPI.tsx";

import "../../App.css";

type Activities = {
  mainActivitiesId: number;
  title: string;
  startDate: number[];
  endDate: number[];
  images: string[];
};

export default function Activity() {
  const [yearList, setYearList] = useState<number[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(
    parseInt(moment(new Date()).format("YYYY"))
  );
  const [postsToDisplay, setPostsToDisplay] = useState<Activities[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const maxVisiblePages = 5;

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
    const latestYear = parseInt(moment(new Date()).format("YYYY"));
    const years: Array<number> = [];

    for (let year = latestYear; year >= 2022; year--) {
      years.push(year);
    }
    setYearList(years);
  }, []);

  useEffect(() => {
    GetActivitiesAPI(selectedYear, currentPage).then((result) => {
      var activityData = result.content;
      setPostsToDisplay(activityData);
      setTotalPages(result.totalPages);
    });
  }, [selectedYear, currentPage]);

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
                      setCurrentPage(1);
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
                  {selectedYear}년도
                </div>
                <Link to="/activityAdd">
                  <img
                    src="../../img/btn/edit_enabled.png"
                    alt="edit"
                    style={{ width: "30px", cursor: "pointer" }}
                    onClick={() => {}}
                  />
                </Link>
              </div>

              <div
                style={{
                  width: "100%",
                }}
              >
                {postsToDisplay.map((activity: Activities) => (
                  <div
                    key={activity.mainActivitiesId}
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
                      {activity.startDate[0]}/{activity.startDate[1]}/
                      {activity.startDate[2]} ~ {activity.endDate[0]}/
                      {activity.endDate[1]}/{activity.endDate[2]}
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
