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
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
