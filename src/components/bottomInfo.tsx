import React from "react";
import "../App.css";

export default function BottomInfo() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "190px",
        padding: "30px 0",
        backgroundColor: "#2CC295",
        textAlign: "left",
        zIndex: "99",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontFamily: "Suit-Light",
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
          maxWidth: "1200px",
          height: "1px",
          border: "none",
          backgroundColor: "#fff",
        }}
      />
      <div
        className="bottom_info"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px 20px 0",
        }}
      >
        <div
          style={{
            fontFamily: "Suit-Semibold",
            fontSize: "18px",
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Made by BAMBOO
          <br />
          <span
            style={{
              fontFamily: "Suit-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Ver2.0 Created by 김진석(FS), 김정찬(FS) in 2026
          </span>
          <br />
          <span
            style={{
              fontFamily: "Suit-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Ver1.1 Created by 김진석(PM), 김재관(BE), 맹의현(FE), 장희정(FE) in
            2025
          </span>
          <br />
          <span
            style={{
              fontFamily: "Suit-Regular",
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
              fontFamily: "Suit-Regular",
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Started at 상명대학교 휴먼지능정보공학전공
            <br />
            서울시 종로구 홍지문2길 20 상명대학교 휴먼AI공학전공(제1공학관
            G101-2호)
            <br />
            smubamboo2025@gmail.com
          </span>
        </div>
        <div
          style={{
            fontFamily: "Suit-Semibold",
            fontSize: "18px",
            color: "#fff",
          }}
        >
          관리자 1
          <br />
          <span
            style={{
              fontFamily: "Suit-Regular",
              fontSize: "14px",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            김진석 (카톡 ID: jinseok_02)
          </span>
          <br />
          <br />
          관리자 2
          <br />
          <span
            style={{
              fontFamily: "Suit-Regular",
              fontSize: "14px",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            김정찬
          </span>
        </div>
      </div>
    </div>
  );
}
