import React from "react";
import "../App.css";

export default function BottomInfo() {
  return (
    <div
      style={{
        width: "100vw",
        minHeight: "190px",
        padding: "30px 0",
        backgroundColor: "#2CC295",
        textAlign: "left",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-Light",
            fontSize: "14px",
            color: "#fff",
          }}
        >
          Copyright ⓒ BAMBOO. All Rights Reserved.
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
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
            윤현수(Design) in 2025
          </span>
          <br />
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Started at 상명대학교 휴먼지능정보공학전공
            <br />
            서울시 종로구 홍지문2길 20 상명대학교 휴먼지능정보공학전공(제1공학관
            G101-2호)
            <br />
            smubamboo2025@gmail.com
          </span>
        </div>
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "18px",
            color: "#fff",
            paddingLeft: "20px",
          }}
        >
          {" "}
          6기 회장
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            김진석 010-2628-2898
          </span>
          <br />
          <br />
          6기 부회장
          <br />
          <span
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "14px",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            유세리 010-5058-4640
          </span>
        </div>
      </div>
    </div>
  );
}
