import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/button.tsx";
import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

export default function Main() {
  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div>
      <Nav type="logIn" />
      <div className="background">
        <div
          style={{
            position: "absolute",
            top: " 0",
            left: "0",
            width: "100vw",
            height: "100vh",
            opacity: "0.4",
            zIndex: "-1",
          }}
        >
          <video
            autoPlay
            muted
            loop
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          >
            <source src="../../img/main_background.mp4" type="video/mp4" />
          </video>
        </div>

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
            height: "100vh",
            textAlign: "left",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <img src="../../img/main_text.png" style={{ width: "650px" }} />
            {/** 
                        <div
                            style={{
                                fontFamily: 'Pretendard-Bold',
                                fontSize: '60px',
                                color: '#fff',
                            }}
                        >
                            Sangmyung University
                        </div>
                        <div
                            style={{
                                fontFamily: 'Pretendard-Bold',
                                fontSize: '75px',
                                color: '#fff',
                            }}
                        >
                            Data Study Club
                        </div>
                        <div
                            style={{
                                fontFamily: 'Pretendard-SemiBold',
                                fontSize: '22px',
                                color: '#2CC295',
                                marginTop: '15px',
                            }}
                        >
                            상명대학교 서울캠퍼스 데이터 스터디 동아리 '데나무'
                        </div>
                        */}
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "60px 0",
              fontFamily: "Pretendard-Bold",
              fontSize: "40px",
              color: "#fff",
              textShadow: "0 0 0.1em, 0 0 0.1em",
            }}
          >
            About Us
          </div>
          <div
            style={{
              width: "70%",
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
              'bomboo'
            </span>
            는 데이터 분석 및 인공지능(AI) 분야에 관심 있는 학생들이 모여 함께
            학습하고 성장하는 동아리입니다. 우리의 목표는 자발적이고 효율적인
            스터디를 통해 동아리원들이 해당 분야에서 성공적으로 진출할 수 있는
            역량을 키우는 것입니다. 또한, 다양한 프로젝트와 공모전에 참여하여
            실질적인 경험을 쌓고, 이를 통해 진로를 명확히 하는 데 도움을 주고
            있습니다.
            <br />
            <br />
            bomboo에 가입하게 되면, 학년과 실력에 따라 학습할 교재를 선택하고,
            함께 학습할 수 있는 스터디 분반을 구성합니다. 정기적인 스터디,
            멘토링 및 네트워킹을 통해 동아리원들이 자발적으로 학습하고, 성장할
            수 있도록 지원합니다.
          </div>
          <div
            style={{
              width: "25%",
              height: "200px",
              margin: "0 auto",
              marginTop: "75px",
              backgroundColor: "#111015",
              borderRadius: "20px",
              boxShadow:
                "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
            }}
          >
            <img
              src="../img/main_logo.png"
              style={{ height: "100px", marginTop: "50px" }}
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div>
            <div
              style={{
                padding: "60px 0",
                fontFamily: "Pretendard-Bold",
                fontSize: "40px",
                color: "#fff",
                textShadow: "0 0 0.1em, 0 0 0.1em",
              }}
            >
              Activities
            </div>
            <div
              style={{
                width: "70%",
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
                'bomboo'
              </span>
              는 정기적인 스터디 뿐만 아니라 논문 리뷰 발표회, 파이썬 새싹톤,
              나무콘 등 다양한 활동을 통해서 부원들의 흥미를 돋우고, 의욕을
              일깨우고자 노력하고 있습니다. 동아리원들은 방학간 진행하는 각
              활동을 통해서 학기 중 자신의 학습 정도를 검증할 수 있습니다.
            </div>
            <div
              style={{
                width: "70%",
                height: "370px",
                margin: "0 auto",
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "30%",
                  height: "370px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/paper.png"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 30px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  논문 리뷰 발표회
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
                  최신 데이터 분석 및 인공지능 논문을 리뷰하고 발표하는
                  활동으로, 최신 연구 동향을 파악하고 학습한 내용을 공유하는
                  기회를 제공합니다.
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "40px",
                    }}
                  >
                    #최신_동향_파악 #발표_능력_향상
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "370px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/python.png"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 30px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  파이썬 새싹톤
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
                  1박 2일동안 파이썬을 활용한 프로그램을 개발함으로써 문제 해결
                  능력을 키우고, 창의적인 아이디어를 실현할 수 있는
                  해커톤입니다.
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "40px",
                    }}
                  >
                    #문제_해결_능력 #창의성_향상 #협업
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "30%",
                  height: "370px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                }}
              >
                <div>
                  <img
                    src="../img/icon/dacon.png"
                    style={{ height: "150px", marginTop: "20px" }}
                  />
                </div>
                <div
                  style={{
                    margin: "10px 0 30px",
                    fontFamily: "Pretendard-SemiBold",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  나무콘
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
                  데이터 분석 대회인 나무콘에 참여하여 실력을 검증하고, 최신
                  데이터 분석 기술을 직접 사용해 볼 수 있는 기회를 제공합니다.
                  <br />
                  <br />
                  <span
                    style={{
                      color: "#2CC295",
                      lineHeight: "40px",
                    }}
                  >
                    #선의의_경쟁 #최신_기술_실습
                  </span>
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
            width: "100vw",
            height: "100vh",
          }}
        >
          <div>
            <div
              style={{
                padding: "60px 0",
                fontFamily: "Pretendard-Bold",
                fontSize: "40px",
                color: "#fff",
                textShadow: "0 0 0.1em, 0 0 0.1em",
              }}
            >
              bomboo
            </div>
            <div
              style={{
                width: "70%",
                textAlign: "left",
                margin: "0 auto",
                fontFamily: "Pretendard-Light",
                fontSize: "18px",
                color: "#fff",
              }}
            ></div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
