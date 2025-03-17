import React from "react";

import Button from "../components/button.tsx";

import "../App.css";

export default function LockedPageAuth() {
  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "200px 20px 150px",
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
          fontSize: "30px",
          marginBottom: "20px",
        }}
      >
        페이지에 접근할 수 없습니다.
      </div>
      <div
        style={{
          fontFamily: "Pretendard-Light",
          fontSize: "18px",
          lineHeight: "1.8",
          marginBottom: "30px",
        }}
      >
        현재 페이지는{" "}
        <span style={{ fontFamily: "Pretendard-SemiBold", color: "#2cc295" }}>
          "아기판다<span style={{ fontSize: "18px" }}>🐼</span>"
        </span>{" "}
        이상의 회원들만 접근 가능합니다.
        <br />
        관리자에게 문의해주세요.
        <br />
        <span style={{ fontSize: "12px", color: "#FF5005" }}>
          test 기간동안만 모든 회원의 등급을 "아기판다"로 임의 조정합니다. (매일
          13시)
        </span>
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
