import React from "react";
import Button from "../components/button.tsx";

const MobileBlocker = () => {
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
          fontFamily: "Suit-Semibold",
          fontSize: "clamp(24px, 3.8vw, 30px)",
          marginBottom: "20px",
        }}
      >
        페이지에 접근할 수 없습니다.
      </div>
      <div
        style={{
          fontFamily: "Suit-Semibold",
          fontSize: "clamp(18px, 2.6vw, 22px)",
          color: "#777",
          lineHeight: "1.8",
          marginBottom: "30px",
        }}
      >
        PC로 이용 부탁드립니다.
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
};

export default MobileBlocker;
