import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/button.tsx";
import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";
import "../App.css";

export default function ApplyStudy() {
  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [keywords, setKeywords] = useState<string[]>([]);

  const onSubmit = (data: { Title: string }) => {
    if (data.Title.trim()) {
      setKeywords([...keywords, data.Title.trim()]);
      reset(); // 입력 필드 초기화
    }
  };

  const removeKeyword = (index: number) => {
    setKeywords(keywords.filter((_, i) => i !== index));
  };

  const onValid = (e) => {
    console.log("onValid");
    onSubmit(e);
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="myPage" />
      <div className="background">
        <div style={{ height: "200vh", display: "flex", padding: "100px 0" }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              y: { duration: 0.5 },
            }}
            style={{
              boxSizing: "border-box",
              position: "relative",
              width: "400px",
              borderRight: "1px solid #444",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "150px",
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#fff",
                position: "absolute",
                left: "210px",
              }}
            >
              마이 페이지
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                }}
              >
                <div className="post_tabs" onClick={() => {}}>
                  키워드 등록
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{
              ease: "easeInOut",
              duration: 0.5,
              y: { duration: 0.5 },
            }}
            style={{
              boxSizing: "border-box",
              position: "relative",
              width: "1120px",
              height: "100%",
              textAlign: "left",
            }}
          >
            <div style={{ width: "810px", position: "absolute", left: "60px" }}>
              <div
                style={{
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                키워드 등록
              </div>

              <form style={{ marginTop: "50px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  <input
                    id="title"
                    type="text"
                    placeholder="키워드를 입력해주세요."
                    {...register("Title", {
                      required: "키워드를 입력해주세요.",
                    })}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSubmit(onValid, onInvalid)();
                      }
                    }}
                    style={{
                      width: "40%",
                      height: "30px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                      marginRight: "50px",
                    }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    title="등록"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
                <input type="text" style={{ display: "none" }} />
              </form>
              {/* 키워드 표시 영역 */}
              <div style={{ marginTop: "50px" }}>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    maxWidth: "810px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#222",
                      padding: "6px 15px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ color: "#fff" }}>머신러닝</span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        cursor: "pointer",
                        padding: "0",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#222",
                      padding: "6px 15px",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <span style={{ color: "#fff" }}>백엔드</span>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#666",
                        cursor: "pointer",
                        padding: "0",
                        fontSize: "16px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ×
                    </button>
                  </div>
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#222",
                        padding: "6px 15px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <span style={{ color: "#fff" }}>{keyword}</span>
                      <button
                        onClick={() => removeKeyword(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#666",
                          cursor: "pointer",
                          padding: "0",
                          fontSize: "16px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
