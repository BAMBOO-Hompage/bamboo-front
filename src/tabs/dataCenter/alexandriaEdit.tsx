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

export default function AlexandriaEdit() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");

  const onValid = (e) => {
    console.log(e.Category + "\n" + e.Title + "\n" + content + "\n", "onValid");
    alert(
      "카테고리 : " +
        e.Category +
        "\n제목 : " +
        e.Title +
        "\n내용 : \n" +
        content +
        "\n사진 : \n"
    );
    window.location.href = "/alexandria";
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

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
            height: "1350px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1300px",
              margin: "100px auto",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "60px",
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
                height: "860px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <form
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="title"
                    className="title"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "100%",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      fontFamily: "Pretendard-Bold",
                      fontSize: "28px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "920px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>
                    ·&emsp;논문 링크<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="link"
                    type="text"
                    placeholder="논문 링크를 입력해주세요."
                    {...register("Link", {
                      required: "논문 링크를 입력해주세요.",
                    })}
                    style={{
                      width: "760px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "920px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>
                    ·&emsp;연도<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="year"
                    type="number"
                    placeholder="논문 작성 연도를 입력해주세요."
                    {...register("Year", {
                      required: "논문 작성 연도를 입력해주세요.",
                    })}
                    style={{
                      width: "760px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "920px",
                    padding: "0 20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>
                    ·&emsp;주제<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="topic"
                    type="text"
                    placeholder="논문 주제를 입력해주세요."
                    {...register("Topic", {
                      required: "논문 주제를 입력해주세요.",
                    })}
                    style={{
                      width: "760px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "920px",
                    padding: "0 20px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>·&emsp;태그</div>
                  <input
                    id="tag"
                    type="text"
                    placeholder="태그를 추가해보세요.  ex) #zero_shot"
                    {...register("Tag", {
                      required: "태그를 추가해보세요.",
                    })}
                    style={{
                      width: "760px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    height: "500px",
                    marginBottom: "20px",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                    padding: "20px",
                  }}
                >
                  <div data-color-mode="dark">
                    <MDEditor
                      height={460}
                      value={content}
                      onChange={(text) => {
                        setContent(text || "");
                      }}
                      className="custom-md-editor"
                      preview={"edit"}
                      style={{
                        resize: "none",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    />
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="destructive"
                    size="small"
                    title="취소"
                    onClick={() => {
                      const deleteAdd =
                        window.confirm("작성을 취소하시겠습니까?");
                      if (deleteAdd) {
                        window.location.href = "/alexandria";
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
