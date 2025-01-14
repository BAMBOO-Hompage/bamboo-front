import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

type JoinUsType = "basic" | "inPeriod";

type JoinUsProps = { type?: JoinUsType };

export default function JoinUs(props: JoinUsProps) {
  const { type } = props;
  return (
    <div>
      <Nav type="joinUs" />
      <div className="background">
        {props.type === "basic" ? (
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
                width: "100vw",
                height: "620px",
              }}
            >
              <div
                style={{
                  width: "1000px",
                  margin: "0 auto",
                  paddingTop: "120px",
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
                  width: "1000px",
                  height: "320px",
                  margin: "0 auto",
                  marginBottom: "60px",
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
                    지금은 지원 기간이 아닙니다.
                  </div>
                  <div
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#aaa",
                      lineHeight: "1.5",
                    }}
                  >
                    현재는 신규 회원을 모집하지 않고 있습니다.
                    <br />
                    다음 학기에 지원하시기 바랍니다.
                  </div>
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  top: "750px",
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
                  width: "1000px",
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
                  이전 모집 공고
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
                width: "100vw",
                height: "530px",
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
                  width: "1000px",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/3(월) ~ 3/7(금)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                      opacity: "0.3",
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/10(월)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                      opacity: "0.3",
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/11(화) ~ 3/13(목)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                      opacity: "0.3",
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/14(금)</span>
                  <br />
                  <img
                    src="../img/icon/bamboo_list.png"
                    alt="leaf_list"
                    style={{
                      width: "30px",
                      marginTop: "15px",
                      opacity: "0.3",
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
                width: "100vw",
                height: "980px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "350px",
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
                  position: "absolute",
                  top: "1000px",
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
              <div
                style={{
                  position: "absolute",
                  top: "980px",
                  width: "100%",
                  height: "300px",
                  background: "#111015",
                  zIndex: "-8",
                }}
              ></div>

              <div
                style={{
                  width: "1000px",
                  margin: "0 auto",
                  paddingTop: "120px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                지 원&nbsp;&nbsp;안 내
              </div>
              <div>
                <img
                  src="../img/main_logo.png"
                  alt="logo_blk"
                  style={{
                    width: "250px",
                    marginTop: "150px",
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
                  marginTop: "150px",
                  marginBottom: "50px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                “ 파이썬, 데이터 분석, 데이터 과학, 머신러닝, 딥러닝 까지! ”
              </div>
              <div style={{ width: "1000px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
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
                    style={{
                      display: "flex",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    파이썬부터 딥러닝, 논문 리뷰와 작성까지 데이터 과학 핵심
                    기술을 체계적으로 익힙니다.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
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
                      display: "flex",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    데이콘·캐글 대회와 백준 문제 풀이로 실무 데이터와 알고리즘
                    문제 해결 능력을 키웁니다.
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "40px",
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
                      display: "flex",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    멘토·동료와의 협업과 전문가 네트워크를 통해 폭넓은 경험을
                    쌓습니다.
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
                      marginTop: "60px",
                      padding: "10px",
                      backgroundColor: "#111015",
                      borderRadius: "20px",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      color: "#fff",
                    }}
                  >
                    주요 활동 {">"}
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
                height: "420px",
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
                모집 일정
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
                    width: "250px",
                    textAlign: "center",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/3(월) ~ 3/7(금)</span>
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/10(월)</span>
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/11(화) ~ 3/13(목)</span>
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
                    fontSize: "22px",
                    color: "#fff",
                  }}
                >
                  <span>3/14(금)</span>
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
            width: "100vw",
            height: "730px",
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
              width: "1000px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                height: "150px",
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
                height: "150px",
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
                  A. 서류 결과, 최종 결과 모두 합격자 및 탈락자 분 모두에게
                  연락을 드립니다. 혹시 연락이 오지 않는다면 문의 바랍니다.
                </div>
              </div>
            </div>
            <div
              style={{
                position: "relative",
                color: "#fff",
                width: "100%",
                height: "150px",
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
            height: "420px",
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
              width: "980px",
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
                    fontSize: "30px",
                    marginBottom: "10px",
                  }}
                >
                  문의 및 지원 연락처
                </div>
                <div
                  style={{
                    color: "#777",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    lineHeight: "2",
                  }}
                >
                  동아리장: 이창민 (010-3369-1051)
                  <br />
                  부동아리장: 김진석 (010-2628-2898)
                </div>
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
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
