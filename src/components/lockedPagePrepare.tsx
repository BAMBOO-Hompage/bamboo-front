import React from "react";

import Button from "../components/button.tsx";

import "../App.css";

export default function LockedPageAuth() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "150px 40px 120px",
      }}
    >
      <img
        src="../img/icon/locked.png"
        alt="locked"
        style={{ maxWidth: "130px", marginBottom: "40px" }}
      />
      <br />
      <div
        style={{
          fontFamily: "Pretendard-Bold",
          fontSize: "clamp(24px, 4vw, 30px)",
          marginBottom: "20px",
        }}
      >
        페이지에 접근할 수 없습니다.
      </div>
      <div
        style={{
          fontFamily: "Pretendard-SemiBold",
          fontSize: "22px",
          color: "#777",
          lineHeight: "1.8",
          marginBottom: "30px",
        }}
      >
        페이지 준비 중...
      </div>
      <div style={{ maxWidth: "200px", margin: "0 auto" }}>
        <Button
          type="primary"
          size="medium"
          title="홈 화면으로"
          onClick={() => {
            window.location.href = "/";
          }}
        />
      </div>
    </div>
  );
}
