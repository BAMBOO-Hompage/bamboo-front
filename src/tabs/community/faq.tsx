import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetFaqsAPI from "../../api/faqs/getFaqsAPI.tsx";
import DeleteFaqAPI from "../../api/faqs/deleteFaqAPI.tsx";

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

export default function Faq() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "전체";

  const [checkAuth, setCheckAuth] = useState<number>(0);
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [categories, setCategories] = useState<string[]>(["전체"]);

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_MEMBER") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        // 카테고리가 "전체"면 전체 조회, 아니면 카테고리별 조회
        const result = await GetFaqsAPI(
          categoryParam === "전체" ? undefined : categoryParam
        );
        if (result) {
          setFaqs(result);
          
          // 카테고리 목록 추출 (전체 조회일 때만)
          if (categoryParam === "전체") {
            const uniqueCategories = [
              "전체",
              ...Array.from(new Set(result.map((faq: Faq) => faq.category))),
            ];
            setCategories(uniqueCategories as string[]);
          }
        }
      } catch (error) {
        console.error("FAQ 조회 실패:", error);
      }
    };
    fetchFaqs();
  }, [categoryParam]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("이 FAQ를 삭제하시겠습니까?")) {
      DeleteFaqAPI(id);
    }
  };

  return (
    <div>
      <Nav type="community" />
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
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              minHeight: "1000px",
              padding: "0 20px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            {/* 사이드바 */}
            <div
              style={{
                boxSizing: "border-box",
                width: "clamp(120px, 20vw, 180px)",
                minHeight: "100%",
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
                {categories.map((category) => (
                  <div
                    key={category}
                    className="side_tabs"
                    style={
                      categoryParam === category
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSearchParams({ category });
                      setExpandedId(null);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {category}
                  </div>
                ))}
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
              key={categoryParam}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "clamp(20px, 4vw, 50px)",
              }}
            >
              {/* 헤더 */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Suit-Semibold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  {categoryParam === "전체" ? "자주 묻는 질문" : categoryParam}
                </div>
                {checkAuth === 2 ? (
                  <Link
                    to="/faqAdd"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      color: "#777",
                      textDecoration: "none",
                    }}
                  >
                    FAQ 작성&emsp;
                    <img
                      src="/img/btn/edit_enabled.png"
                      alt="edit"
                      style={{
                        width: "30px",
                        cursor: "pointer",
                        opacity: "0.8",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = "0.8";
                      }}
                    />
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {/* FAQ 리스트 */}
              <div style={{ margin: "40px 0 50px" }}>
                {faqs.length > 0 ? (
                  faqs.map((faq) => (
                    <div
                      key={faq.faqId}
                      style={{
                        marginBottom: "15px",
                        backgroundColor: "#222",
                        border: expandedId === faq.faqId 
                          ? "0.5px solid #2CC295" 
                          : "0.5px solid #343434",
                        borderRadius: "20px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {/* 질문 헤더 */}
                      <div
                        style={{
                          padding: "20px 25px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        onClick={() => toggleExpand(faq.faqId)}
                        onMouseEnter={(e) => {
                          if (expandedId !== faq.faqId) {
                            (e.currentTarget.parentElement as HTMLElement).style.border = "0.5px solid #777";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (expandedId !== faq.faqId) {
                            (e.currentTarget.parentElement as HTMLElement).style.border = "0.5px solid #343434";
                          }
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              marginBottom: "5px",
                              fontFamily: "Suit-Regular",
                              fontSize: "14px",
                              color: "#2CC295",
                            }}
                          >
                            {faq.category}
                          </div>
                          <div
                            style={{
                              fontFamily: "Suit-Semibold",
                              fontSize: "18px",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span style={{ marginRight: "10px", color: "#2CC295" }}>Q.</span>
                            {faq.question}
                          </div>
                        </div>
                        <div
                          style={{
                            transition: "transform 0.3s ease",
                            transform: expandedId === faq.faqId 
                              ? "rotate(180deg)" 
                              : "rotate(0deg)",
                            marginLeft: "15px",
                          }}
                        >
                          <img
                            src="/img/btn/upDown_enabled.png"
                            alt="toggle"
                            style={{ width: "20px", opacity: "0.8" }}
                          />
                        </div>
                      </div>

                      {/* 답변 내용 */}
                      <AnimatePresence>
                        {expandedId === faq.faqId && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                padding: "0 25px 20px",
                                borderTop: "1px solid #333",
                              }}
                            >
                              <div
                                style={{
                                  marginTop: "20px",
                                  fontFamily: "Suit-Light",
                                  fontSize: "16px",
                                  color: "#ccc",
                                  lineHeight: "1.6",
                                  display: "flex",
                                }}
                              >
                                <span style={{ marginRight: "10px", color: "#2CC295", fontFamily: "Suit-Semibold" }}>A.</span>
                                <div style={{ whiteSpace: "pre-wrap" }}>{faq.answer}</div>
                              </div>

                              {/* 관리자 버튼 */}
                              {checkAuth === 2 && (
                                <div
                                  style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                  }}
                                >
                                  <Link
                                    to={`/faqEdit?id=${faq.faqId}`}
                                    style={{
                                      padding: "8px 16px",
                                      backgroundColor: "#333",
                                      borderRadius: "10px",
                                      fontFamily: "Suit-Regular",
                                      fontSize: "14px",
                                      color: "#fff",
                                      textDecoration: "none",
                                      transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = "#444";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = "#333";
                                    }}
                                  >
                                    수정
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(faq.faqId)}
                                    style={{
                                      padding: "8px 16px",
                                      backgroundColor: "#8B0000",
                                      border: "none",
                                      borderRadius: "10px",
                                      fontFamily: "Suit-Regular",
                                      fontSize: "14px",
                                      color: "#fff",
                                      cursor: "pointer",
                                      transition: "all 0.3s ease",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.backgroundColor = "#A00000";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.backgroundColor = "#8B0000";
                                    }}
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      color: "#fff",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      textAlign: "center",
                      padding: "50px 40px",
                    }}
                  >
                    등록된 FAQ가 없습니다.
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
