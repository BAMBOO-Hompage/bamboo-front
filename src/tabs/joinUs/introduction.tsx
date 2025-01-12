import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

export default function Introduction() {
  return (
    <div>
      <Nav type="joinUs" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 0.5,
            y: { duration: 0.5 },
          }}
          style={{ height: "200vh", padding: "100px 0" }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              margin: "0 auto",
              fontFamily: "Pretendard-Bold",
              fontSize: "30px",
              color: "#fff",
              textShadow: "0 0 0.1em, 0 0 0.1em",
              textAlign: "left",
            }}
          >
            About Us
          </div>

          <div style={{}}></div>

          <div
            style={{
              position: "relative",
              width: "80%",
              fontFamily: "Pretendard-Bold",
              fontSize: "28px",
              color: "#fff",
              textAlign: "left",
            }}
          ></div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
