import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import "../../App.css";

export default function Introduction() {
  const [hovered, setHovered] = useState(false);

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
            minHeight: "680px",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
              marginBottom: "20px",
              padding: "100px 20px 0",
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
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "linear-gradient(320deg, #042222 0%, #2CC295 100%)",
                textAlign: "left",
              }}
            >
              <div style={{ padding: "120px 5%" }}>
                <div
                  style={{
                    maxWidth: "280px",
                    marginBottom: "30px",
                  }}
                >
                  <img
                    src="../img/main_logo_blk.png"
                    alt="logo_blk"
                    style={{
                      width: "100%",
                      marginRight: "50px",
                    }}
                  />
                </div>
                <div
                  className="intro_font"
                  style={{
                    fontFamily: "Pretendard-Thin",
                    color: "#000",
                  }}
                >
                  BigData · AI · Machine Learning · Basic Programming ·
                  Optimization · Overall algorithms
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              fontFamily: "Pretendard-Light",
              fontSize: "18px",
              color: "#fff",
              maxWidth: "1000px",
              padding: " 0 20px 40px",
              margin: "0 auto",
              textAlign: "left",
              lineHeight: "2.3",
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
            는 빅데이터와 인공지능(AI) 분야의 열정 넘치는 인재들이 모여 체계적인
            커리큘럼과 실전 프로젝트를 통해 함께 성장하는 전문 학술
            동아리입니다.
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
              maxWidth: "1000px",
              padding: "30px 20px 0",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "clamp(100px, 20%, 200px)",
                aspectRatio: "1 / 1",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "clamp(14px, 2vw, 18px)",
              }}
            >
              학년별 및 실력별
              <br />
              맞춤 스터디
            </div>
            <div
              style={{
                width: "clamp(100px, 20%, 200px)",
                aspectRatio: "1 / 1",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "clamp(14px, 2vw, 18px)",
              }}
            >
              선후배 간의
              <br />
              멘토링 시스템
            </div>
            <div
              style={{
                width: "clamp(100px, 20%, 200px)",
                aspectRatio: "1 / 1",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "clamp(14px, 2vw, 18px)",
              }}
            >
              학습 자료 및
              <br />
              AI 학습 툴 지원
            </div>
            <div
              style={{
                width: "clamp(100px, 20%, 200px)",
                aspectRatio: "1 / 1",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "clamp(14px, 2vw, 18px)",
              }}
            >
              다양한 대회
              <br />
              공유 및 참여
            </div>
            <div
              style={{
                width: "clamp(100px, 20%, 200px)",
                aspectRatio: "1 / 1",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "clamp(14px, 2vw, 18px)",
              }}
            >
              졸업 선배들과의
              <br />
              네트워킹
            </div>
          </div>
          <div
            style={{
              maxWidth: "1000px",
              padding: " 0 20px 50px",
              margin: "0 auto",
              marginTop: "50px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Study System
            </div>
            <div
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "25px",
                color: "#2cc295",
                marginBottom: "15px",
              }}
            >
              "최고의 성장을 위한 BAMBOO만의 지원 시스템"
            </div>
            <div
              style={{
                fontFamily: "Pretendard-Light",
                fontSize: "18px",
                lineHeight: "2.2",
                marginBottom: "30px",
              }}
            >
              "BAMBOO"는 논문 아카이브 '알렉산드리아 도서관'과 체계적인 멘토링
              시스템을 통해 양질의 학습 자료와 선배들의 노하우를 공유합니다.
              온/오프라인 학습 플랫폼 구축으로 언제 어디서나 끊김 없는 성장이
              가능합니다.
            </div>
            <br />
            <div
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Study System
            </div>
            <div
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "25px",
                color: "#2cc295",
                marginBottom: "15px",
              }}
            >
              "함께 성장할 수 있는 학습 공동체"
            </div>
            <div
              style={{
                fontFamily: "Pretendard-Light",
                fontSize: "18px",
                lineHeight: "2.2",
              }}
            >
              학년과 실력에 맞춘 스터디 분반과 멘토링, 네트워킹 기회를 통해
              자발적으로 학습하고 성장할 수 있는 다양한 프로그램을 진행하고
              있습니다.
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
            minHeight: "680px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "80px",
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
              }}
            ></div>
          </div>
          <div>
            <div
              style={{
                padding: "70px 0 50px",
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
                    alt="dacon"
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
                    alt="network"
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
              top: "120px",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "100%",
              maxWidth: "1000px",
              display: "flex",
              justifyContent: "right",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                display: "flex",
                justifyContent: "space-between",
                zIndex: "-10",
              }}
            >
              <div
                style={{
                  marginTop: "80px",
                  width: "50%",
                  height: "60px",
                  borderRadius: "1171px",
                  background: "#297FB8",
                  filter: "blur(100px)",
                }}
              ></div>
              <div
                style={{
                  width: "50%",
                  height: "60px",
                  borderRadius: "1171px",
                  background: "#2CC295",
                  filter: "blur(100px)",
                }}
              ></div>
            </div>
          </div>

          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              fontFamily: "Pretendard-Bold",
              fontSize: "35px",
            }}
          >
            <div
              style={{
                padding: "130px 0 60px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  textAlign: "left",
                }}
              >
                <span style={{ color: "#777" }}>
                  이외에
                  <br />
                  활용할 수 있는
                  <br />
                </span>
                <span style={{ color: "#fff" }}>다양한 자료와 기회</span>
              </div>
              <div>
                <img
                  src="../img/main_logo_blk.png"
                  alt="logo_blk"
                  className="intro_img"
                  style={{
                    width: "260px",
                    paddingRight: "5%",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "48%",
                minHeight: "280px",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#2cc295",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  학습 자료 아카이브
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  2020년부터 진행해 온 파이썬, 데이터분석, ML, DL 스터디 내용을
                  체계적으로 정리하여 아카이브화
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  동아리원들이 필요한 자료를 손쉽게 접근하고, 최신 지식을
                  지속적으로 업데이트할 수 있는 자료실 운영
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "48%",
                minHeight: "280px",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#2cc295",
                    marginTop: "20px",
                    marginBottom: "30px",
                  }}
                >
                  자발적 스터디 그룹 생성
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  동아리원들이 자발적으로 스터디 그룹을 조직하여, 관심 있는
                  주제를 심도 있게 탐구하고 학습할 수 있는 환경 조성
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    lineHeight: "20px",
                    marginBottom: "20px",
                  }}
                >
                  이를 통해 동아리원들은 자기주도적으로 학습하며, 공동의 목표를
                  향해 협력
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
        
                      keyframes shadow-reset {
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
