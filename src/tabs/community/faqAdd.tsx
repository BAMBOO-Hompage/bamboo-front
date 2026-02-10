import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import PostFaqAPI from "../../api/faqs/postFaqAPI.tsx";
import "../../App.css";

export default function FaqAdd() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("Question");
  }, [setFocus]);

  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState<string>("카테고리 선택");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onValid = async (e) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await PostFaqAPI(
        e.Question,
        e.Answer,
        e.Category,
        parseInt(e.DisplayOrder)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="community" />
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
            minHeight: "900px",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              minHeight: "800px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            {/* 사이드바 */}
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Suit-Regular",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                FAQ
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Suit-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => {
                    const deleteAdd = window.confirm("작성을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.history.back();
                    }
                  }}
                >
                  작성 취소
                </div>
              </div>
            </div>

            {/* 메인 콘텐츠 */}
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
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontFamily: "Suit-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                FAQ 작성
              </div>

              <form style={{ width: "100%", marginTop: "40px" }}>
                {/* 카테고리 */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>카테고리</div>
                  <div
                    style={{
                      width: "620px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      defaultValue=""
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        border: "none",
                        fontFamily: "Suit-Light",
                        fontSize: "18px",
                        color: selectedCategory === "카테고리 선택" ? "#777" : "#2CC295",
                        cursor: "pointer",
                      }}
                      {...register("Category", {
                        required: "카테고리를 선택해주세요.",
                        validate: (value) => value !== "" || "카테고리를 선택해주세요.",
                        onChange: handleCategoryChange,
                      })}
                    >
                      <option
                        disabled
                        value=""
                        style={{ background: "#111015", color: "#ddd" }}
                      >
                        카테고리 선택
                      </option>
                      <option
                        value="가입"
                        style={{ background: "#111015", color: "#2CC295" }}
                      >
                        가입
                      </option>
                      <option
                        value="스터디"
                        style={{ background: "#111015", color: "#2CC295" }}
                      >
                        스터디
                      </option>
                      <option
                        value="활동"
                        style={{ background: "#111015", color: "#2CC295" }}
                      >
                        활동
                      </option>
                      <option
                        value="기타"
                        style={{ background: "#111015", color: "#2CC295" }}
                      >
                        기타
                      </option>
                    </select>
                  </div>
                </div>

                {/* 표시 순서 */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>표시 순서</div>
                  <input
                    type="number"
                    min="1"
                    placeholder="숫자가 작을수록 위에 표시됩니다"
                    {...register("DisplayOrder", {
                      required: "표시 순서를 입력해주세요.",
                      min: { value: 1, message: "1 이상의 숫자를 입력해주세요." },
                    })}
                    style={{
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </div>

                {/* 질문 */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>질문</div>
                  <input
                    type="text"
                    placeholder="질문을 입력해주세요."
                    {...register("Question", {
                      required: "질문을 입력해주세요.",
                    })}
                    style={{
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </div>

                {/* 답변 */}
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div style={{ marginTop: "10px" }}>답변</div>
                  <textarea
                    placeholder="답변을 입력해주세요."
                    {...register("Answer", {
                      required: "답변을 입력해주세요.",
                    })}
                    style={{
                      width: "660px",
                      height: "200px",
                      padding: "20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      border: "none",
                      color: "#fff",
                      resize: "vertical",
                      lineHeight: "1.6",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                    marginTop: "40px",
                  }}
                >
                  <Button
                    type={isSubmitting ? "disabled" : "primary"}
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
