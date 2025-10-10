import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DDayCounter = () => {
  const [timeLeft, setTimeLeft] = useState("00일 00:00:00");

  useEffect(() => {
    const targetDate = new Date("2025-03-08T00:00:00+09:00").getTime(); // 숫자로 변환
    const interval = setInterval(() => {
      const now = new Date().getTime(); // 숫자로 변환
      const timeDiff = targetDate - now;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeLeft("00일 00:00:00");
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeLeft(
          `${String(days).padStart(1, "0")}일 ${String(hours).padStart(
            2,
            "0"
          )}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0"
          )}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "400px",
        background:
          "linear-gradient(0deg, #111015 0%, rgba(255, 255, 255, 0) 100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ width: "1000px", padding: "0 20px" }}>
        <div
          style={{
            marginBottom: "30px",
            fontFamily: "Suit-Semibold",
            fontSize: "clamp(24px, 4vw, 30px)",
            color: "#fff",
          }}
        >
          Home Page Opening Left
        </div>
        <div
          style={{
            fontFamily: "Suit-Semibold",
            fontSize: "clamp(45px, 7vw, 60px)",
            color: "#2cc295",
          }}
        >
          {timeLeft}
        </div>
      </div>
      <motion.div
        animate={{
          y: [0, 10, 0], // 위아래 움직임
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity, // 무한 반복
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          bottom: "30px",
          width: "100px",
        }}
      >
        <div
          style={{
            fontFamily: "Suit-Regular",
            fontSize: "18px",
            color: "#fff",
            marginBottom: "10px",
          }}
        >
          동아리 안내
        </div>
        <img
          src="../img/icon/scroll.png"
          alt="scroll"
          style={{ width: "30px" }}
        />
      </motion.div>
    </div>
  );
};

export default DDayCounter;
