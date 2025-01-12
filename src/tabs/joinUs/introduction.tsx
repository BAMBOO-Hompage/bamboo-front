import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

export default function Introduction() {
  return (
    <div>
      <Nav type="joinUs" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              marginBottom: "20px",
              paddingTop: "100px",
              fontFamily: "Pretendard-Bold",
              fontSize: "30px",
              color: "#fff",
              textShadow: "0 0 0.1em, 0 0 0.1em",
              textAlign: "left",
            }}
          >
            About Us
          </div>

          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              marginBottom: "20px",
              background: "linear-gradient(320deg, #042222 0%, #2CC295 100%)",
              textAlign: "left",
            }}
          >
            <div style={{ padding: "120px 0" }}>
              <img
                src="../img/main_logo_blk.png"
                alt="logo_blk"
                style={{
                  width: "280px",
                  paddingLeft: "100px",
                  marginBottom: "30px",
                }}
              />
              <br />
              <span
                style={{
                  fontFamily: "Pretendard-Thin",
                  fontSize: "20px",
                  color: "#000",
                  width: "280px",
                  paddingLeft: "100px",
                }}
              >
                BigData · AI · Machine Learning · Basic Programming ·
                Optimization · Overall algorithms
              </span>
            </div>
          </div>
          <div
            style={{
              fontFamily: "Pretendard-ExtraLight",
              fontSize: "16px",
              color: "#fff",
              width: "1000px",
              margin: "0 auto",
              textAlign: "left",
              lineHeight: "2.2",
            }}
          >
            <span
              style={{
                color: "#2CC295",
                fontFamily: "Pretendard-SemiBold",
                fontSize: "20px",
              }}
            >
              'BAMBOO'
            </span>
            는 빅데이터와 인공지능(AI)에 관심 있는 학생들이 자발적이고
            체계적으로 학습하며, 다양한 프로젝트와 공모전을 통해 실질적인 경험을
            쌓을 수 있도록 돕습니다. 함께 성장하며 진로를 명확히 다져보세요.
          </div>

          <div
            style={{
              position: "relative",
              width: "80%",
              fontFamily: "Pretendard-Bold",
              fontSize: "28px",
              color: "#fff",
              textAlign: "left",
            }}
          ></div>
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "1000px",
              textAlign: "left",
              margin: "0 auto",
              fontFamily: "Pretendard-Light",
              fontSize: "17px",
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
              'bamboo'
            </span>
            는 데이터 분석 및 인공지능(AI) 분야에 관심 있는 학생들이 모여 함께
            학습하고 성장하는 동아리입니다. 우리의 목표는 자발적이고 효율적인
            스터디를 통해 동아리원들이 해당 분야에서 성공적으로 진출할 수 있는
            역량을 키우는 것입니다. 또한, 다양한 프로젝트와 공모전에 참여하여
            실질적인 경험을 쌓고, 이를 통해 진로를 명확히 하는 데 도움을 주고
            있습니다.
            <br />
            <br />
            <span
              style={{
                color: "#2CC295",
                fontFamily: "Pretendard-SemiBold",
                fontSize: "20px",
              }}
            >
              'bamboo'
            </span>
            에 가입하게 되면, 학년과 실력에 따라 학습할 교재를 선택하고, 함께
            학습할 수 있는 스터디 분반을 구성합니다. 정기적인 스터디, 멘토링 및
            네트워킹을 통해 동아리원들이 자발적으로 학습하고, 성장할 수 있도록
            지원합니다.
          </div>
          <Link to="/introduction" style={{ textDecoration: "none" }}>
            <div style={{ width: "1000px", margin: "0 auto" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  width: "150px",
                  marginLeft: "830px",
                  marginTop: "18vh",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
                  color: "#2CC295",
                }}
              >
                더 알아보기 {">"}
              </div>
            </div>
          </Link>
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "450px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#2CC295",
                filter: "blur(100px)",
              }}
            ></div>
            <div
              style={{
                marginTop: "60px",
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#297FB8",
                filter: "blur(100px)",
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                padding: "10vh 0 8vh",
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
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#999",
                }}
              >
                주 요 활 동
              </span>
            </div>
            <div
              style={{
                width: "1000px",
                textAlign: "left",
                margin: "0 auto",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
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
                'bamboo'
              </span>
              는 정기적인 스터디 뿐만 아니라 데이터 분석 대회, 멘토링 및
              네트워킹 등 다양한 활동을 통해 부원들의 학습 능력 증진을 돕고
              있습니다.
            </div>
            <div
              style={{
                width: "1000px",
                height: "40vh",
                margin: "0 auto",
                marginTop: "5vh",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "50vh",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/paper.png"
                    alt="paper"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "1vh 0 5vh",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  커리큘럼 스터디
                </div>
                <div
                  style={{
                    width: "80%",
                    textAlign: "left",
                    margin: "0 auto",
                    fontFamily: "Pretendard-Light",
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  학년, 실력, 시간에 따라 분반을 설정하고 매주 스터디를
                  진행합니다.
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "6vh",
                    }}
                  >
                    #간단한_실습 #자유로운_토론
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "50vh",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/dacon.png"
                    alt="dacon"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "1vh 0 5vh",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
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
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  국내외 대회 정보를 수집 및 공유하고 팀별 또는 개인별 참가하여
                  실전 경험을 쌓을 수 있습니다.
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "6vh",
                    }}
                  >
                    #문제_해결_능력 #경쟁력_향상
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "50vh",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/network.png"
                    alt="network"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "1vh 0 5vh",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
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
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  1:1 멘토링과 졸업 선배들과의 네트워킹을 통해 전문 지식과
                  경험을 습득하여 성장을 촉진할 수 있습니다.
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "6vh",
                    }}
                  >
                    #선의의_경쟁 #최신_기술_실습
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/activity" style={{ textDecoration: "none" }}>
            <div style={{ width: "1000px", margin: "0 auto" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  width: "150px",
                  marginLeft: "830px",
                  marginTop: "14vh",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
                  color: "#2CC295",
                }}
              >
                더 알아보기 {">"}
              </div>
            </div>
          </Link>
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: " 33vh",
              left: "50%",

              transform: "translate(-50%, 0)",
              width: "1000px",
              height: "25px",
              borderRadius: "1171px",
              background: "#2CC295",
              filter: "blur(90px)",
              zIndex: "-10",
            }}
          ></div>

          <div>
            <div
              style={{
                padding: "15vh 0 8vh",
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
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#999",
                }}
              >
                연&emsp;혁
              </span>
            </div>

            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "1000px",
                height: "390px",
                margin: "0 auto",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
              }}
            ></div>
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
            width: "100vw",
            height: "80vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "160px",
              left: "50%",
              transform: "translate(-90%, 0)",
              width: "400px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#2CC295",
                filter: "blur(100px)",
              }}
            ></div>
            <div
              style={{
                marginTop: "60px",
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#297FB8",
                filter: "blur(100px)",
              }}
            ></div>
          </div>
          <div
            style={{
              padding: "16vh 0 8vh",
            }}
          >
            <img
              src="../../img/main_logo2.png"
              alt="main_logo2"
              style={{ width: "400px" }}
            />
          </div>
          <Link to="/joinUs" style={{ textDecoration: "none" }}>
            <div style={{ width: "1000px", margin: "0 auto" }}>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  width: "150px",
                  margin: "0 auto",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  color: "#2CC295",
                }}
              >
                지원 안내 {">"}
              </div>
            </div>
          </Link>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
