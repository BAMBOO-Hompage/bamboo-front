import React from "react";
import "../App.css";

export default function BottomInfo() {
  return (
    <div
      style={{
        width: "100vw",
        height: "250px",
        backgroundColor: "#2CC295",
        textAlign: "left",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 40px 0 ",
          border: "1px solid #fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-Light",
            fontSize: "16px",
            color: "#fff",
          }}
        >
          Copyright ⓒ BAMBOO All Rights Reserved.
        </div>
        <div></div>
      </div>
      <hr
        style={{
          width: "1200px",
          height: "1px",
          border: "none",
          backgroundColor: "#fff",
        }}
      />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 40px 0",
          border: "1px solid #fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          Made by BAMBOO
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Ver1.0 Created by 김진석(PM), 김재관(BE), 김희재(BE), 맹의현(FE),
            윤현수(Design)
          </span>
        </div>
        <div></div>
      </div>
    </div>
  );
}
