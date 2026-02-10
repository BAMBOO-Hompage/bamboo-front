import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetFaqAPI from "../../api/faqs/getFaqAPI.tsx";
import PatchFaqAPI from "../../api/faqs/patchFaqAPI.tsx";
import "../../App.css";

type Faq = {
  faqId: number;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  createdAt: string;
  modifiedAt: string;
};

export default function FaqEdit() {
  const [searchParams] = useSearchParams();
  const faqId = parseInt(searchParams.get("id") || "0", 10);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [faq, setFaq] = useState<Faq | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const result = await GetFaqAPI(faqId);
        if (result) {
          setFaq(result);
          setValue("Question", result.question);
          setValue("Answer", result.answer);
          setValue("Category", result.category);
          setValue("DisplayOrder", result.displayOrder);
          setSelectedCategory(result.category);
        }
      } catch (error) {
        console.error("FAQ 조회 실패:", error);
        alert("FAQ를 불러오는데 실패했습니다.");
        navigate("/faq?category=전체");
      }
    };
    fetchFaq();
  }, [faqId, setValue, navigate]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onValid = async (e) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await PatchFaqAPI(
        faqId,
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

  if (!faq) {
    return (
      <div>
        <Nav type="community" />
        <div className="background">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              color: "#fff",
              fontFamily: "Suit-Light",
              fontSize: "18px",
            }}
          >
            로딩 중...
          </div>
        </div>
      </div>
    );
  }

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
                    const cancelEdit = window.confirm("수정을 취소하시겠습니까?");
                    if (cancelEdit) {
                      window.history.back();
                    }
                  }}
                >
                  수정 취소
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
                FAQ 수정
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
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        border: "none",
                        fontFamily: "Suit-Light",
                        fontSize: "18px",
                        color: "#2CC295",
                        cursor: "pointer",
                      }}
                      {...register("Category", {
                        required: "카테고리를 선택해주세요.",
                        onChange: handleCategoryChange,
                      })}
                    >
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
                    title="수정 완료"
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
