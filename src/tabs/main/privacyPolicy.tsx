import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/button.tsx";

import PrivacyPolicyData from "../../mockup_data/privacyPolicy_data.tsx";

import "../../App.css";

export default function Signup() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <div
        style={{
          textAlign: "left",
          position: "fixed",
          top: "13px",
          left: "70px",
          width: "100%",
          zIndex: "2",
        }}
      >
        <Link to="/">
          <img
            src="../img/nav_logo.png"
            alt="nav_logo"
            style={{ width: "100px", height: "30px" }}
          />
        </Link>
      </div>

      <div style={{ maxWidth: "850px", margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            marginTop: "15vh",
            marginBottom: "25px",
            fontFamily: "Pretendard-Bold",
            fontSize: "30px",
            color: "#2cc295",
          }}
        >
          개인정보 처리방침
        </div>
        <div
          style={{
            marginBottom: "20px",
            fontFamily: "Pretendard-Light",
            fontSize: "16px",
            color: "#fff",
            lineHeight: "1.6",
          }}
        >
          "BAMBOO"는 회원 관리 및 동아리의 원활한 활동을 위해 최소한의
          개인정보(이름, 학번, 학과, 이메일, 전화번호)를 수집·이용합니다.
          <br />
          자세한 내용은 아래를 확인해주세요.
        </div>

        {PrivacyPolicyData().map((section, index) => (
          <div
            key={index}
            style={{
              marginBottom: "10px",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "#171717",
                padding: "22px 40px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                borderBottomLeftRadius: expandedSections[index] ? "0" : "15px",
                borderBottomRightRadius: expandedSections[index] ? "0" : "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleSection(index)}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                {`${index + 1}. ${section.title}`}
              </div>
              <div
                style={{
                  transition: "transform 0.3s ease",
                  transform: expandedSections[index]
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <img
                  src="../img/btn/upDown_enabled.png"
                  alt="upDown"
                  style={{ width: "20px", opacity: "0.8" }}
                />
              </div>
            </div>

            <div
              style={{
                maxHeight: expandedSections[index] ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 1s ease",
                backgroundColor: "#171717",
                padding: expandedSections[index] ? "20px 40px 30px" : "0 40px",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
                fontFamily: "Pretendard-Light",
                fontSize: "16px",
                color: "#fff",
                lineHeight: "1.5",
                textAlign: "left",
              }}
            >
              {expandedSections[index] && section.content}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          marginTop: "30px",
          marginBottom: "40px",
          padding: "0 40px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          type="primary"
          size="large"
          title="개인정보 처리방침에 동의합니다."
          onClick={() => {
            window.location.href = "/signUp";
          }}
        />
      </div>
    </div>
  );
}
