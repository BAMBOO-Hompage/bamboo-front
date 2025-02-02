import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import AlexandriaData from "../../mockup_data/alexandria_data.tsx";
import "../../App.css";

export default function AlexandriaPost() {
  const alexandriaData = AlexandriaData();

  const [comment, setComment] = useState("");

  const postId = parseInt(localStorage.getItem("postId") || "0");
  const currentPost = alexandriaData.filter((post) => postId == post.id)[0];

  return (
    <div>
      <Nav type="dataCenter" />
      <div id="background" className="background">
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
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
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
                marginBottom: "10px",
                display: "flex",
                justifyContent: "right",
                gap: "5px",
              }}
            >
              <Button
                type="destructive"
                size="Xsmall"
                title="목록"
                onClick={() => {
                  window.history.back();
                }}
              />
              <Button
                type="primary"
                size="Xsmall"
                title="수정"
                onClick={() => {}}
              />
            </div>

            <div
              style={{
                width: "100%",
                minHeight: "960px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "20px",
                    fontFamily: "Pretendard-Bold",
                    fontSize: "28px",
                    color: "#fff",
                  }}
                >
                  {currentPost.title}
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;논문 링크</div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={currentPost.link}
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.link}
                  </a>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;연도</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.year}
                  </div>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;주제</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.subject}
                  </div>
                </div>
                <div
                  style={{
                    width: "920px",
                    height: "40px",
                    padding: "0 20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ color: "#aaa" }}>·&emsp;태그</div>
                  <div
                    style={{
                      width: "760px",
                      padding: "0 20px",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    {currentPost.tag}
                  </div>
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#444",
                    height: "2px",
                  }}
                />
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    minHeight: "500px",
                    borderRadius: "30px",
                    border: "none",
                    padding: "20px",
                    paddingBottom: "100px",
                  }}
                >
                  <MDEditor.Markdown
                    style={{
                      backgroundColor: "transparent",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                    source={currentPost.content}
                  />
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#444",
                    height: "2px",
                  }}
                />
                <form
                  style={{
                    padding: "0 20px",
                    marginTop: "20px",
                    marginBottom: "40px",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-Bold",
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    >
                      <img src="#" style={{ marginRight: "20px" }} />
                      {"휴먼지능정보공학전공_맹의현"}
                    </div>
                    <Button
                      type={comment.trim() ? "primary" : "destructive"}
                      size="small"
                      title="댓글 등록"
                      onClick={() => {}}
                    />
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      height: "100px",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      backgroundColor: "#222",
                    }}
                  >
                    <textarea
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "16px",
                        color: "#fff",
                        width: "100%",
                        height: "100%",
                        border: "none",
                        background: "transparent",
                        resize: "none",
                        outline: "none",
                        lineHeight: "1.4",
                      }}
                      placeholder="댓글을 작성해주세요."
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                  </div>
                </form>
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "18px",
                    color: "#fff",
                    padding: "0 20px",
                    marginBottom: "20px",
                  }}
                >
                  댓글 {"5"}개
                </div>

                <div style={{ padding: "0 20px 20px" }}>
                  <div
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-SemiBold",
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    >
                      <img src="#" style={{ marginRight: "20px" }} />
                      {"휴먼지능정보공학전공_맹의현"}
                    </div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "14px",
                        color: "#777",
                      }}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.fontWeight = "600";
                          e.currentTarget.style.textDecoration =
                            "underline #777";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.fontWeight = "300";
                          e.currentTarget.style.textDecoration = "none";
                        }}
                        onClick={() => {}}
                      >
                        수정
                      </span>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.fontWeight = "600";
                          e.currentTarget.style.textDecoration =
                            "underline #777";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.fontWeight = "300";
                          e.currentTarget.style.textDecoration = "none";
                        }}
                        onClick={() => {}}
                      >
                        삭제
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      padding: "10px 25px",
                      borderRadius: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-ExtraLight",
                        fontSize: "16px",
                        color: "#fff",
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        resize: "none",
                        outline: "none",
                        lineHeight: "1.4",
                      }}
                    >
                      {`이 논문은 중요한 주제를 다루고 있으며, 연구 질문이 명확하게 설정되어 있어 학문적 기여도가 높습니다. 저자는 기존 문헌을 잘 정리하고, 연구의 필요성을 잘 설명하였습니다. 또한, 실험 설계와 데이터 수집이 신중하게 이루어진 점도 긍정적으로 평가할 수 있습니다.
그러나 몇 가지 개선점이 눈에 띕니다. 첫째, 연구 방법론에서 사용된 통계 분석 기법에 대한 설명이 부족하여, 결과의 신뢰성에 대한 확신을 가지기 어렵습니다. 특히, 변수 간의 상관관계 분석에서 사용된 방법이 보다 구체적으로 설명될 필요가 있습니다. 둘째, 실험 결과에 대한 해석이 다소 주관적으로 보이며, 대안적 설명 가능성을 충분히 고려하지 않은 점이 아쉽습니다.`}
                    </div>
                  </div>
                </div>

                <div style={{ padding: "0 20px 20px" }}>
                  <div
                    style={{
                      marginBottom: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-SemiBold",
                        fontSize: "16px",
                        color: "#fff",
                      }}
                    >
                      <img src="#" style={{ marginRight: "20px" }} />
                      {"휴먼지능정보공학전공_맹의현"}
                    </div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "14px",
                        color: "#777",
                      }}
                    >
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.fontWeight = "600";
                          e.currentTarget.style.textDecoration =
                            "underline #777";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.fontWeight = "300";
                          e.currentTarget.style.textDecoration = "none";
                        }}
                        onClick={() => {}}
                      >
                        수정
                      </span>
                      &nbsp;&nbsp;|&nbsp;&nbsp;
                      <span
                        style={{
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.fontWeight = "600";
                          e.currentTarget.style.textDecoration =
                            "underline #777";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.fontWeight = "300";
                          e.currentTarget.style.textDecoration = "none";
                        }}
                        onClick={() => {}}
                      >
                        삭제
                      </span>
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      padding: "20px 25px",
                      borderRadius: "20px",
                      backgroundColor: "#222",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-ExtraLight",
                        fontSize: "16px",
                        color: "#fff",
                        width: "100%",
                        border: "none",
                        background: "transparent",
                        resize: "none",
                        outline: "none",
                        lineHeight: "1.4",
                      }}
                    >
                      {`이 논문은 중요한 주제를 다루고 있으며, 연구 질문이 명확하게 설정되어 있어 학문적 기여도가 높습니다. 저자는 기존 문헌을 잘 정리하고, 연구의 필요성을 잘 설명하였습니다. 또한, 실험 설계와 데이터 수집이 신중하게 이루어진 점도 긍정적으로 평가할 수 있습니다.
그러나 몇 가지 개선점이 눈에 띕니다. 첫째, 연구 방법론에서 사용된 통계 분석 기법에 대한 설명이 부족하여, 결과의 신뢰성에 대한 확신을 가지기 어렵습니다. 특히, 변수 간의 상관관계 분석에서 사용된 방법이 보다 구체적으로 설명될 필요가 있습니다. 둘째, 실험 결과에 대한 해석이 다소 주관적으로 보이며, 대안적 설명 가능성을 충분히 고려하지 않은 점이 아쉽습니다.`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
