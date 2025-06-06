import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../components/nav.tsx";
import Snowfall from "../components/snowfall.tsx";
import CherryBlossom from "../components/cherryBlossom.tsx";
import DDayCounter from "../components/dDayCounter.tsx";
import BottomInfo from "../components/bottomInfo.tsx";

import HistoryData from "../mockup_data/history_data.tsx";
import "../App.css";

const historyData = HistoryData();

export default function Main() {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div>
      {/* <CherryBlossom /> */}
      {/* <Snowfall /> */}
      <Nav type="main" />
      <div style={{ width: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: " 0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: "1",
            zIndex: "-2",
          }}
        >
          <video
            className="main_1"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", objectFit: "cover" }}
          >
            <source src="../../img/main_background.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="main_1"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            border: "none",
            opacity: "0.3",
            backgroundColor: "#000",
            zIndex: "-1",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: " 100vh",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "100%",
            maxWidth: "1000px",
            height: "25px",
            borderRadius: "1171px",
            background: "#2CC295",
            filter: "blur(90px)",
            willChange: "transform",
            zIndex: "-10",
          }}
        ></div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          className="main_1"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: "700px", padding: "50px" }}>
            <img
              src="../../img/main_logo1.png"
              alt="main_logo"
              style={{ width: "100%" }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              width: "100%",
              height: "150px",
              background:
                "linear-gradient(0deg, #111015 -10%, rgba(255, 255, 255, 0) 100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <motion.div
              animate={{
                y: [0, 10, 0], // 위아래 움직임
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity, // 무한 반복
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                bottom: "30px",
                width: "100px",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "20px",
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                Scroll
              </div>
              <img
                src="../img/icon/scroll.png"
                alt="scroll"
                style={{ width: "30px" }}
              />
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
          className="main_1"
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "0 12vw",
              marginTop: "100px",
            }}
          >
            <img
              src="../../img/main_logo1.png"
              alt="main_logo"
              style={{ width: "100%" }}
            />
          </div>
          <DDayCounter />
        </motion.div> */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            y: { duration: 1 },
          }}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "690px",
          }}
        >
          <div
            style={{
              padding: "110px 0 80px",
            }}
          >
            <span
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "40px",
                color: "#fff",
                textShadow: "0 0 0.1em, 0 0 0.1em",
              }}
            >
              About Us
            </span>
            <br />
            <span
              style={{
                fontFamily: "Pretendard-Light",
                fontSize: "16px",
                color: "#999",
              }}
            >
              소&emsp;개
            </span>
          </div>
          <div
            style={{
              maxWidth: "1000px",
              textAlign: "left",
              margin: "0 auto",
              padding: "0 20px",
              fontFamily: "Pretendard-Light",
              fontSize: "18px",
              color: "#fff",
              lineHeight: "33px",
            }}
          >
            <span
              style={{
                color: "#2CC295",
                fontFamily: "Pretendard-SemiBold",
                fontSize: "20px",
              }}
            >
              "BAMBOO"
            </span>
            는 데이터 분석 및 인공지능(AI) 분야에 관심 있는 휴먼지능정보공학전공
            학생들이 모여 함께 학습 하고 성장하는 유일 학과 동아리입니다. 우리
            "BAMBOO"의 목표는 자발적이고 효율적인 스터디를 통해 동아리원들이
            해당 분야에서 성공적으로 진출할 수 있는 역량을 키우는 것입니다.
            또한, 다양한 프로젝트와 공모전에 참여하여 실질적인 경험을 쌓고, 이를
            통해 진로를 명확히 하는 데 도움을 주고 있습니다.
            <br />
            <br />
            <span
              style={{
                color: "#2CC295",
                fontFamily: "Pretendard-SemiBold",
                fontSize: "20px",
              }}
            >
              "BAMBOO"
            </span>
            에 가입하게 되면 모든 동아리원은 한 학기 동안 데이터 분석과 AI 관련
            필수 커리큘럼을 이수하며, 학습한 내용을 바탕으로 교내외 AI
            경진대회나 공모전에 참여하게 됩니다. 정기적인 스터디, 멘토링 및
            네트워킹을 통해 동아리원들이 자발적으로 학습하고, 성장할 수 있도록
            지원합니다.
          </div>
          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Link to="/introduction" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  width: "150px",
                  marginTop: "80px",
                  marginBottom: "70px",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
                  color: "#2CC295",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLDivElement).style.transform = "scale(1.05)"; // 살짝 확대
                  (e.target as HTMLDivElement).style.boxShadow =
                    "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLDivElement).style.transform = "scale(1)";
                  (e.target as HTMLDivElement).style.boxShadow =
                    "-10px -10px 30px #242424, 15px 15px 30px #000";
                }}
              >
                더 알아보기 ➜
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            y: { duration: 1 },
          }}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "680px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "60px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "100%",
              maxWidth: "450px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "60px",
                borderRadius: "1171px",
                background: "#2CC295",
                filter: "blur(100px)",
                willChange: "transform",
              }}
            ></div>
            <div
              style={{
                marginTop: "60px",
                width: "50%",
                height: "60px",
                borderRadius: "1171px",
                background: "#297FB8",
                filter: "blur(100px)",
                willChange: "transform",
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                padding: "50px 0 50px",
              }}
            >
              <span
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "40px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                Activities
              </span>
              <br />
              <span
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  color: "#999",
                }}
              >
                주 요 활 동
              </span>
            </div>
            <div
              style={{
                maxWidth: "1000px",
                padding: "0 20px",
                textAlign: "left",
                margin: "0 auto",
                fontFamily: "Pretendard-Light",
                fontSize: "18px",
                color: "#fff",
                lineHeight: "30px",
              }}
            >
              <span
                style={{
                  color: "#2CC295",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: "20px",
                }}
              >
                "BAMBOO"
              </span>
              는 정기적인 스터디 뿐만 아니라 데이터 분석 대회, 멘토링 및
              네트워킹 등 다양한 활동을 통해 부원들의 학습 능력 증진을 돕고
              있습니다.
            </div>
            <div
              style={{
                maxWidth: "1000px",
                minHeight: "320px",
                padding: "0 20px",
                margin: "0 auto",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "30%",
                  minHeight: "320px",
                  padding: "20px 0",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div style={{ width: "100%" }}>
                  <img
                    src="../img/icon/paper.png"
                    alt="paper"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 35px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  정규 스터디
                </div>
                <div
                  style={{
                    width: "80%",
                    textAlign: "left",
                    margin: "0 auto",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  학년, 실력, 시간에 따라 분반을 설정하고 매주 스터디를
                  진행합니다.
                  <br />
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                    }}
                  >
                    #맞춤형 학습 #간단한_실습
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  minHeight: "320px",
                  padding: "20px 0",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div style={{ width: "100%" }}>
                  <img
                    src="../img/icon/dacon.png"
                    alt="paper"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 35px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  데이터 분석 대회
                </div>
                <div
                  style={{
                    width: "80%",
                    textAlign: "left",
                    margin: "0 auto",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  국내외 대회 정보를 수집 및 공유하고 팀별 또는 개인별 참가하여
                  실전 경험을 쌓을 수 있습니다.
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                    }}
                  >
                    #문제_해결_능력 #포트폴리오_작성
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  minHeight: "320px",
                  padding: "20px 0",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div style={{ width: "100%" }}>
                  <img
                    src="../img/icon/network.png"
                    alt="paper"
                    style={{
                      width: "100%",
                      height: "140px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 35px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  멘토링 및 네트워킹
                </div>
                <div
                  style={{
                    width: "80%",
                    textAlign: "left",
                    margin: "0 auto",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  1:1 멘토링과 졸업 선배들과의 네트워킹을 통해 전문 지식과
                  경험을 습득하여 성장을 촉진할 수 있습니다.
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                    }}
                  >
                    #선후배_네트워킹
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "right",
            }}
          >
            <Link to="/activity" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  width: "150px",
                  marginTop: "25px",
                  marginBottom: "30px",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
                  color: "#2CC295",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLDivElement).style.transform = "scale(1.05)"; // 살짝 확대
                  (e.target as HTMLDivElement).style.boxShadow =
                    "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLDivElement).style.transform = "scale(1)";
                  (e.target as HTMLDivElement).style.boxShadow =
                    "-10px -10px 30px #242424, 15px 15px 30px #000";
                }}
              >
                더 알아보기 ➜
              </div>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            y: { duration: 1 },
          }}
          style={{
            position: "relative",
            width: "100%",
            minHeight: "660px",
          }}
        >
          <div
            style={{
              flex: "1",
              position: "absolute",
              top: "180px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "100%",
              maxWidth: "900px",
              height: "25px",
              borderRadius: "1171px",
              background: "#297FB8",
              filter: "blur(90px)",
              willChange: "transform",
              zIndex: "-10",
            }}
          ></div>

          <div>
            <div
              style={{
                padding: "60px 0 50px",
              }}
            >
              <span
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "40px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                History
              </span>
              <br />
              <span
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  color: "#999",
                }}
              >
                연&emsp;혁
              </span>
            </div>

            <div
              style={{
                maxWidth: "1000px",
                minHeight: "390px",
                padding: "0 20px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  position: "relative",
                  minHeight: "390px",
                  margin: "0 auto",
                  padding: "0 30px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    maxWidth: "940px",
                    minHeight: "390px",
                    margin: "0 auto",
                    overflow: "auto",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {historyData.map((item) => {
                      return (
                        <div key={item.year}>
                          <div
                            style={{
                              width: "100px",
                              textAlign: "left",
                              paddingRight: "50px",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Pretendard-Bold",
                                fontSize: "40px",
                                fontWeight: "bold",
                                marginBottom: "10px",
                              }}
                            >
                              {item.year}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "230px",
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    {historyData.map((item) => {
                      if (parseInt(item.year) % 2 !== 0) {
                        return (
                          <div key={item.year}>
                            <div
                              style={{
                                width: "50px",
                                textAlign: "left",
                                paddingLeft: "150px",
                                marginBottom: "5px",
                              }}
                            >
                              {item.events.map((event, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    fontFamily: "Pretendard-Light",
                                    fontSize: "16px",
                                    lineHeight: "1.5",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {event}
                                </div>
                              ))}
                            </div>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "150px",
                                height: "30px",
                                marginLeft: "150px",
                                borderLeft: "1px solid #2cc295",
                              }}
                            ></div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "220px",
                      height: "40%",
                      display: "flex",
                    }}
                  >
                    {historyData.map((item) => {
                      if (parseInt(item.year) % 2 === 0) {
                        return (
                          <div key={item.year}>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "300px",
                                height: "30px",
                                borderLeft: "1px solid #2cc295",
                              }}
                            ></div>
                            <div
                              style={{
                                width: "150px",
                                textAlign: "left",
                                marginTop: "5px",
                              }}
                            >
                              {item.events.map((event, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    fontFamily: "Pretendard-Light",
                                    fontSize: "16px",
                                    lineHeight: "1.5",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {event}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            y: { duration: 1 },
          }}
          style={{
            position: "relative",
            width: "100%",
            height: "520px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "140px",
              left: "50%",
              transform: "translate(-90%, 0)",
              width: "100%",
              maxWidth: "400px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                width: "50%",
                height: "60px",
                borderRadius: "1171px",
                background: "#2CC295",
                filter: "blur(100px)",
                willChange: "transform",
              }}
            ></div>
            <div
              style={{
                marginTop: "60px",
                width: "50%",
                height: "60px",
                borderRadius: "1171px",
                background: "#297FB8",
                filter: "blur(100px)",
                willChange: "transform",
              }}
            ></div>
          </div>
          <div
            style={{
              padding: "100px 20px 100px",
              maxWidth: "400px",
              margin: "0 auto",
            }}
          >
            <img
              src="../../img/main_logo2.png"
              alt="main_logo2"
              style={{ width: "100%" }}
            />
          </div>

          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/joinUs" style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  width: "150px",
                  margin: "0 auto",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 10px 10px 30px #000",
                  color: "#2CC295",
                  transition: "box-shadow 0.5s ease",
                  animation: hovered
                    ? "shadow-rotate 0.5s linear forwards"
                    : "shadow-reset 0.5s linear forwards",
                }}
                className={hovered ? "rotate-animation" : ""}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                지원 안내 ➜
                <style>
                  {`
                    @keyframes shadow-rotate {
                      0% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                      25% {
                        box-shadow: inset -20px 0px 30px #242424, inset 20px 0px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                      }
                      75% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      100% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                    }

                    @keyframes shadow-reset {
                      0% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                      25% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                      }
                      75% {
                        box-shadow: inset -20px 0px 30px #242424, inset 0px 20px 30px #000;
                      }
                      100% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                    }
                  `}
                </style>
              </div>
            </Link>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
