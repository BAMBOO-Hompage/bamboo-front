import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetPaperAPI from "../../api/library_posts/getPaperAPI.tsx";
import DeletePapersAPI from "../../api/library_posts/deletePapersAPI.tsx";
import MyPageAPI from "../../api/members/myPageAPI.tsx";

import "../../App.css";

type Paper = {
  libraryPostId: number;
  paperName: string;
  link: string;
  year: string;
  speaker: { studentId: string; name: string };
  topic: string;
  tagNames: string[];
  content: string;
};

type MyDataType = {
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
  profileImageUrl: string;
};

export default function AlexandriaPost() {
  const sanitizer = dompurify.sanitize;

  const [searchParams, setSearchParams] = useSearchParams();

  const [paperData, setPaperData] = useState<Paper>({
    libraryPostId: 0,
    paperName: "",
    link: "",
    year: "",
    speaker: { studentId: "", name: "" },
    topic: "",
    tagNames: [],
    content: "",
  });
  const [comment, setComment] = useState("");

  const [myData, setmyData] = useState<MyDataType>({
    studentId: "",
    email: "",
    name: "",
    major: "",
    phone: "",
    role: "",
    profileImageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    GetPaperAPI(searchParams.get("id")).then((data) => {
      setPaperData(data);
    });
  }, [searchParams]);

  useEffect(() => {
    MyPageAPI().then((data) => {
      if (!data.profileImageUrl) {
        data.profileImageUrl = "../img/icon/base_profile.png";
      }
      setmyData(data);
      setPreviewImage(data.profileImageUrl);
    });
  }, []);

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
              maxWidth: "1000px",
              padding: "0 20px",
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
                justifyContent: "space-between",
              }}
            >
              <Button
                type="destructive"
                size="xsmall"
                title="삭제"
                onClick={() => {
                  const deleteConfirm =
                    window.confirm("게시물을 삭제하시겠습니까?");
                  if (deleteConfirm) {
                    DeletePapersAPI(paperData.libraryPostId);
                  }
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: "10px",
                }}
              >
                <Button
                  type="destructive"
                  size="xsmall"
                  title="목록"
                  onClick={() => {
                    window.history.back();
                  }}
                />
                <Button
                  type="primary"
                  size="xsmall"
                  title="수정"
                  onClick={() => {}}
                />
              </div>
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
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "20px",
                    fontFamily: "Pretendard-Bold",
                    fontSize: "clamp(22px, 3.3vw, 28px)",
                    color: "#fff",
                  }}
                >
                  {paperData.paperName}
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;논문
                  </div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={paperData.link}
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {paperData.link}
                  </a>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;연도
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.year}
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;주제
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.topic}
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;태그
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.tagNames.map((tag) => `#${tag} `)}
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
                    padding: "20px 0",
                    paddingBottom: "100px",
                  }}
                >
                  <div
                    className="container"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(`${paperData.content}`),
                    }}
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "clamp(14px, 2vw, 18px)",
                      color: "#fff",
                      lineHeight: "1.4",
                    }}
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
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={previewImage}
                        alt="profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      {myData.major}_{myData.name}
                    </div>
                    <div style={{ display: comment.trim() ? "" : "none" }}>
                      <Button
                        type="primary"
                        size="small"
                        title="댓글 등록"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      height: "120px",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      backgroundColor: "#222",
                    }}
                  >
                    <textarea
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "clamp(14px, 1.8vw, 16px)",
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
                    marginBottom: "20px",
                  }}
                >
                  댓글 {"5"}개
                </div>
                <div style={{ padding: "0 0 20px" }}>
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
                        답글 달기
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
                      padding: "15px 15px",
                      borderRadius: "20px",
                      backgroundColor: "#222",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-ExtraLight",
                        fontSize: "clamp(14px, 1.8vw, 16px)",
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
