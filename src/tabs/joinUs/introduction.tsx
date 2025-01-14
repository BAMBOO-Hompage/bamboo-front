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
          style={{
            width: "100vw",
            height: "700px",
          }}
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
              fontFamily: "Pretendard-Light",
              fontSize: "17px",
              color: "#fff",
              width: "1000px",
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
            는 빅데이터와 인공지능(AI)에 관심 있는 학생들이 자발적이고
            체계적으로 학습하며, 다양한 프로젝트와 공모전을 통해 실질적인 경험을
            쌓을 수 있도록 돕습니다. 함께 성장하며 진로를 명확히 다져보세요.
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
            height: "680px",
          }}
        >
          <div
            style={{
              width: "1000px",
              height: "220px",
              margin: "0 auto",
              paddingTop: "30px",
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                position: "absolute",
                left: "0",
              }}
            >
              학년별 및 실력별
              <br />
              맞춤 스터디
            </div>
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                position: "absolute",
                left: "200px",
              }}
            >
              선후배 간의
              <br />
              멘토링 시스템
            </div>
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                position: "absolute",
                left: "400px",
              }}
            >
              학습 자료
              <br />
              공유 및 지원
            </div>
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                position: "absolute",
                left: "600px",
              }}
            >
              다양한 대회
              <br />
              공유 및 참여
            </div>
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "110px",
                background:
                  "linear-gradient(320deg, #111015 40%, #2CC295 150%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                position: "absolute",
                left: "800px",
              }}
            >
              졸업 선배들과의
              <br />
              네트워킹
            </div>
          </div>
          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              marginTop: "50px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: "17px",
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
              "효율적인 학습을 위한 든든한 지원 시스템"
            </div>
            <div
              style={{
                fontFamily: "Pretendard-Light",
                fontSize: "17px",
                lineHeight: "2.3",
                marginBottom: "30px",
              }}
            >
              'BAMBOO' 만의 "알렉산드리아 도서관"과 선후배 간의 멘토링 시스템은
              학습 자료 공유와 학업 지원을 통해 후배들의 성장을 돕습니다. 언제
              어디서든 비대면으로도 학습할 수 있는 여러가지의 커뮤니티도
              구축하고 있습니다.
            </div>
            <br />
            <div
              style={{
                fontFamily: "Pretendard-SemiBold",
                fontSize: "17px",
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
                fontSize: "17px",
                lineHeight: "2.3",
                marginBottom: "30px",
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
            width: "100vw",
            height: "700px",
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
                'bamboo'
              </span>
              는 정기적인 스터디 뿐만 아니라 데이터 분석 대회, 멘토링 및
              네트워킹 등 다양한 활동을 통해 부원들의 학습 능력 증진을 돕고
              있습니다.
            </div>
            <div
              style={{
                width: "1000px",
                height: "350px",
                margin: "0 auto",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "350px",
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
                    style={{ height: "140px", marginTop: "20px" }}
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
                      lineHeight: "45px",
                    }}
                  >
                    #간단한_실습 #자유로운_토론
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "350px",
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
                    style={{ height: "140px", marginTop: "20px" }}
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
                      lineHeight: "45px",
                    }}
                  >
                    #문제_해결_능력 #경쟁력_향상
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "350px",
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
                    style={{ height: "140px", marginTop: "20px" }}
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
                      lineHeight: "45px",
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
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  width: "150px",
                  marginLeft: "830px",
                  marginTop: "25px",
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
            height: "680px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "120px",
              left: "50%",
              transform: "translate(-0%, 0)",
              width: "450px",
              display: "flex",
              justifyContent: "space-between",
              zIndex: "-10",
            }}
          >
            <div
              style={{
                marginTop: "80px",
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#297FB8",
                filter: "blur(100px)",
              }}
            ></div>
            <div
              style={{
                width: "250px",
                height: "60px",
                borderRadius: "1171px",
                background: "#2CC295",
                filter: "blur(100px)",
              }}
            ></div>
          </div>

          <div
            style={{
              width: "1000px",
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
                  style={{
                    width: "260px",
                    paddingRight: "100px",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              width: "1000px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "480px",
                height: "280px",
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
                    marginBottom: "30px",
                  }}
                >
                  학습 자료 아카이브
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "15px",
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
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: "20px",
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
                width: "480px",
                height: "280px",
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
                    marginBottom: "30px",
                  }}
                >
                  자발적 스터디 그룹 생성
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "15px",
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
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: "20px",
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
            width: "100vw",
            height: "520px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "140px",
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
              padding: "100px 0 100px",
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
                  fontFamily: "Pretendard-Light",
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
