import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetCohortLatestAPI from "../../api/cohorts/GetCohortLatestAPI.tsx";

import "../../App.css";

export default function JoinUs() {
  const [type, setType] = useState("basic");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cohortResult = await GetCohortLatestAPI();
        if (cohortResult.status === "활동 준비") {
          setType("inPeriod");
        } else {
          setType("basic");
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Nav type="aboutUs" />
      <div className="background">
        {type === "basic" ? (
          <>
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
                height: "620px",
              }}
            >
              <div
                style={{
                  maxWidth: "1000px",
                  padding: "120px 20px 0",
                  margin: "0 auto",
                  marginBottom: "60px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                지 원&nbsp;&nbsp;안 내
              </div>

              <div
                style={{
                  maxWidth: "1000px",
                  padding: "0 20px",
                  height: "320px",
                  margin: "0 auto",
                  marginBottom: "60px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "320px",
                    background:
                      "linear-gradient(320deg, #042222 0%, #0B3F37 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Bold",
                        fontSize: "30px",
                        color: "#fff",
                        marginBottom: "30px",
                      }}
                    >
                      6기 모집이 마감되었습니다.
                    </div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color: "#aaa",
                        lineHeight: "1.5",
                      }}
                    >
                      현재는 신규 회원 모집 기간이 아닙니다.
                      <br />
                      다음 학기에 다시 지원해주세요.
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
                  justifyContent: "space-between",
                }}
              >
                <hr
                  style={{
                    width: "420px",
                    height: "2px",
                    backgroundColor: "#777",
                    border: "none",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                    color: "#777",
                    padding: "0 32px",
                  }}
                >
                  6기 모집 공고
                </div>
                <hr
                  style={{
                    width: "420px",
                    height: "2px",
                    backgroundColor: "#777",
                    border: "none",
                  }}
                />
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
                height: "530px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "130px",
                  left: "50%",
                  transform: "translate(-50%, 0)",
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
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#fff",
                  paddingTop: "90px",
                  marginBottom: "70px",
                }}
              >
                <img
                  src="../img/main_logo.png"
                  alt="logo_blk"
                  style={{
                    width: "250px",
                  }}
                />
                <br />
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "28px",
                    color: "#fff",
                    marginTop: "10px",
                  }}
                >
                  6기 모집
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                    color: "#777",
                    marginTop: "10px",
                  }}
                >
                  2025년 1학기
                </div>
              </div>
              <div
                style={{
                  maxWidth: "1000px",
                  padding: "0 20px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>2/28(금) ~ 3/4(수)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    서류 모집
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/5(수)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    서류 합격자 발표
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/6(목) ~ 3/7(금)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    면접
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/8(토)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    최종 합격자 발표
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 1,
              }}
              style={{
                position: "relative",
                width: "100%",
                minHeight: "900px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "320px",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "100%",
                  maxWidth: "1000px",
                  display: "flex",
                  justifyContent: "center",
                  zIndex: "-10",
                }}
              >
                <div
                  style={{
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
                  position: "absolute",
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  width: "100%",
                  maxWidth: "1000px",
                  height: "25px",
                  borderRadius: "1171px",
                  background: "#2CC295",
                  filter: "blur(90px)",
                  zIndex: "-10",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  width: "100%",
                  height: "300px",
                  background: "#111015",
                  zIndex: "-8",
                }}
              ></div>

              <div
                style={{
                  maxWidth: "1000px",
                  padding: "120px 29px 0",
                  margin: "0 auto",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                지 원&nbsp;&nbsp;안 내
              </div>
              <div
                style={{
                  maxWidth: "250px",
                  padding: "0 20px",
                  margin: "0 auto",
                  marginTop: "120px",
                }}
              >
                <img
                  src="../img/main_logo.png"
                  alt="logo_blk"
                  style={{
                    width: "100%",
                  }}
                />
                <br />
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "28px",
                    color: "#fff",
                    marginTop: "10px",
                  }}
                >
                  6기 모집 중
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                    color: "#777",
                    marginTop: "10px",
                  }}
                >
                  2025년 1학기
                </div>
              </div>
              <div
                style={{
                  padding: "0 20px",
                  marginTop: "100px",
                  marginBottom: "50px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                “ 파이썬, 데이터 분석, 데이터 과학, 머신러닝, 딥러닝 까지! ”
              </div>
              <div
                style={{
                  maxWidth: "1000px",
                  padding: "0 20px",
                  margin: "0 auto",
                  textAlign: "left",
                }}
              >
                <div
                  className="joinUs_text"
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "22px",
                      color: "#2cc295",
                    }}
                  >
                    <img
                      src="../img/icon/leaf_list.png"
                      alt="leaf_list"
                      style={{
                        width: "10px",
                        marginRight: "20px",
                      }}
                    />
                    전문성 강화
                  </div>
                  <div
                    className="joinUs_text2"
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                      textAlign: "right",
                    }}
                  >
                    파이썬부터 딥러닝, 논문 리뷰와 작성까지 데이터 과학 핵심
                    기술을 체계적으로 익힙니다.
                  </div>
                </div>
                <div
                  className="joinUs_text"
                  style={{
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "22px",
                      color: "#2cc295",
                    }}
                  >
                    <img
                      src="../img/icon/leaf_list.png"
                      alt="leaf_list"
                      style={{
                        width: "10px",
                        marginRight: "20px",
                      }}
                    />
                    실전 역량
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                      textAlign: "right",
                    }}
                  >
                    데이콘·캐글 대회와 백준 문제 풀이로 실무 데이터와 알고리즘
                    문제 해결 능력을 키웁니다.
                  </div>
                </div>
                <div
                  className="joinUs_text"
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "22px",
                      color: "#2cc295",
                    }}
                  >
                    <img
                      src="../img/icon/leaf_list.png"
                      alt="leaf_list"
                      style={{
                        width: "10px",
                        marginRight: "20px",
                      }}
                    />
                    협업과 네트워킹
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                      textAlign: "right",
                    }}
                  >
                    멘토·동료와의 협업과 전문가 네트워크를 통해 폭넓은 경험을
                    쌓습니다.
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
                      color: "#2cc295",
                      width: "150px",
                      marginTop: "40px",
                      marginBottom: "50px",
                      padding: "10px",
                      backgroundColor: "#111015",
                      borderRadius: "20px",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      transition: "box-shadow 0.5s ease",
                      animation: hovered
                        ? "shadow-rotate 0.5s linear forwards"
                        : "shadow-reset 0.5s linear forwards",
                    }}
                    className={hovered ? "rotate-animation" : ""}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                  >
                    주요 활동 ➜
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
                minHeight: "420px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#fff",
                  paddingTop: "90px",
                  marginBottom: "70px",
                }}
              >
                모집 일정(PY, DA)
              </div>
              <div
                style={{
                  maxWidth: "1000px",
                  padding: "0 20px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>2/28(금) ~ 3/4(수)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    서류 모집
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/5(수)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    서류 합격자 발표
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/6(목) ~ 3/7(금)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    면접
                  </span>
                </div>
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "clamp(14px, 2vw, 22px)",
                    color: "#fff",
                  }}
                >
                  <span>3/8(토)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      padding: "10px 20px",
                      backgroundColor: "#222",
                      borderRadius: "8px",
                    }}
                  >
                    최종 합격자 발표
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}

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
            minHeight: "900px",
          }}
        >
          <div
            style={{
              width: "100%",
              fontFamily: "Pretendard-Bold",
              fontSize: "28px",
              color: "#fff",
              paddingTop: "90px",
              marginBottom: "70px",
            }}
          >
            FAQ
          </div>
          <div
            style={{
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                minHeight: "110px",
                padding: "20px 0",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#2cc295",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  Q. 모집 과정 이후에 추가 지원이 가능한가요?
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  A. 아닙니다. 동아리 내 스터디 및 정해진 커리큘럼을 진행하기
                  위해 추가 지원을 받지 않고 있습니다.
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                minHeight: "110px",
                padding: "20px 0",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#2cc295",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  Q. 합격자만 연락을 받나요?
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  A. 아닙니다. 서류 결과, 최종 결과 모두 합격자 및 탈락자 분
                  모두에게 연락을 드립니다. 혹시 연락이 오지 않는다면 문의
                  바랍니다.
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                minHeight: "110px",
                padding: "20px 0",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#2cc295",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  Q. 프로젝트 관련 경험이 없어도 되나요?
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  A. 네, 가능합니다. BAMBOO는 숙달된 경험자가 아니더라도 데이터
                  분석과 인공지능에 대한 관심과 열정 있는 모든 지원자를
                  환영합니다.
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                minHeight: "110px",
                padding: "20px 0",
                backgroundColor: "#111015",
                borderRadius: "20px",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <div style={{ width: "80%", margin: "0 auto" }}>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#2cc295",
                    lineHeight: "20px",
                    marginBottom: "25px",
                  }}
                >
                  Q. 동아리 자체 대회에 반드시 참여해야 하나요?
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "20px",
                  }}
                >
                  A. 네, 맞습니다. 스터디 커리큘럼뿐만 아니라 대회 참여까지가 한
                  기수의 필수 일정입니다. 스터디와 대회를 모두 완료해야 수료증이
                  발급됩니다.
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
            minHeight: "420px",
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
              maxWidth: "980px",
              padding: "0 20px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                padding: "150px 0 60px",
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
                <div
                  style={{
                    color: "#fff",
                    fontFamily: "Pretendard-Bold",
                    fontSize: "clamp(24px, 3.8vw, 30px)",
                    marginBottom: "10px",
                  }}
                >
                  문의 및 지원 연락처
                </div>
                <div
                  style={{
                    color: "#777",
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    lineHeight: "2",
                  }}
                >
                  동아리장: 김진석 (카톡 ID: jinseok_02)
                  <br />
                  부동아리장: 유세리 (카톡 ID: serih0219)
                </div>
              </div>
              <div>
                <img
                  src="../img/main_logo_blk.png"
                  alt="logo_blk"
                  className="joinUs_img"
                  style={{
                    width: "260px",
                    paddingRight: "90px",
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
