import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import StudyCard from "../../components/studyCard.tsx";
import LockedPageAuth from "../../components/lockedPageAuth.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

const study_data = [
  { id: 1, x: 105, y: 0, width: 190, height: 190, label: "첫 번째 공간" },
  { id: 2, x: 305, y: 0, width: 190, height: 190, label: "두 번째 공간" },
  { id: 3, x: 505, y: 0, width: 190, height: 190, label: "세 번째 공간" },
];

export default function SelfStudy() {
  const [hovered, setHovered] = useState(false);
  const [studyHovered, setStudyHovered] = useState<number | null>(null);

  const [cStudyList, setCStudyList] = useState("전체");

  const handleClick = (id) => {
    alert(`${id} 공간이 클릭되었습니다!`);
  };

  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              width: "100%",
              maxWidth: "1000px",
              minHeight: "1000px",
              borderRadius: "30px",
              position: "absolute",
              top: "176px",
              left: "50%",
              transform: "translate(-50%, 0)",
              overflow: "hidden",
              zIndex: "-1",
            }}
          >
            <div
              style={{
                width: "140px",
                height: "140px",
                position: "absolute",
                left: "90px",
                top: "200px",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "100px",
                position: "absolute",
                left: "80px",
                top: "750px",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "180px",
                position: "absolute",
                left: "650px",
                top: "600px",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "150px",
                left: "620px",
                top: "900px",
                position: "absolute",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "120px",
                height: "120px",
                left: "250px",
                top: "950px",
                position: "absolute",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "150px",
                height: "120px",
                left: "450px",
                top: "50px",
                position: "absolute",
                background: "#2CC295",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "180px",
                height: "140px",
                left: "300px",
                top: "220px",
                position: "absolute",
                background: "#297FB8",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "150px",
                height: "150px",
                left: "800px",
                top: "120px",
                position: "absolute",
                background: "#297FB8",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "100px",
                height: "100px",
                left: "150px",
                top: "850px",
                position: "absolute",
                background: "#297FB8",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "120px",
                height: "120px",
                left: "300px",
                top: "550px",
                position: "absolute",
                background: "#297FB8",
                boxShadow: "300px 300px 300px ",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
            <div
              style={{
                width: "150px",
                height: "200px",
                left: "800px",
                top: "500px",
                position: "absolute",
                background: "#297FB8",
                borderRadius: "50%",
                filter: "blur(120px)",
              }}
            />
          </div>

          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              minHeight: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              padding: "0 40px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "50px",
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#fff",
                textShadow: "0 0 0.1em, 0 0 0.1em",
                textAlign: "center",
              }}
            >
              자율 스터디
            </div>

            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Link
                to="/curriculumStudy"
                style={{
                  textDecoration: "none",
                  fontFamily: "Pretendard-Light",
                  fontSize: "clamp(14px, 1.8vw, 18px)",
                  width: "180px",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 10px 10px 30px #000",
                  color: "#fff",
                  transition: "box-shadow 0.5s ease",
                  animation: hovered
                    ? "shadow-rotate 0.5s linear forwards"
                    : "shadow-reset 0.5s linear forwards",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={hovered ? "rotate-animation" : ""}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                커리큘럼 스터디
                <style>
                  {`
                    @keyframes shadow-rotate {
                      0% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                      25% {
                        box-shadow: inset -20px 0px 30px #242424, inset 20px 0px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                       }
                      75% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      100% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                    }
                        
                    @keyframes shadow-reset {
                      0% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                      25% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                      }
                      75% {
                        box-shadow: inset -20px 0px 30px #242424, inset 0px 20px 30px #000;
                      }
                      100% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                    }
                  `}
                </style>
              </Link>
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "clamp(14px, 1.8vw, 18px)",
                  width: "180px",
                  padding: "10px",
                  backgroundColor: "#2cc295",
                  borderRadius: "20px",
                  color: "#fff",
                  transition: "box-shadow 0.5s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                자율 스터디
              </div>
            </div>
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                marginTop: "50px",
                minHeight: "1000px",
                borderRadius: "30px",
                position: "relative",
              }}
            >
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 1000 1000"
                style={{
                  minHeight: "1000px",
                  borderRadius: "30px",
                }}
              >
                <defs>
                  <mask id="hole-mask">
                    <rect x="0" y="0" width="1000" height="1000" fill="#fff" />

                    <rect x="0" y="0" width="95" height="190" rx="20" ry="20" />
                    <rect x="0" y="0" width="20" height="190" />
                    <rect
                      x="105"
                      y="0"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="0"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="0"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="0"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="0"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="0" width="20" height="190" />

                    <rect
                      x="0"
                      y="205"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="205" width="20" height="190" />
                    <rect
                      x="105"
                      y="205"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="205"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="205"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="205"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="205"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="205" width="20" height="190" />

                    <rect
                      x="0"
                      y="405"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="405" width="20" height="190" />
                    <rect
                      x="105"
                      y="405"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="405"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="405"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="405"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="405"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="405" width="20" height="190" />

                    <rect
                      x="0"
                      y="605"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="605" width="20" height="190" />
                    <rect
                      x="105"
                      y="605"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="605"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="605"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="605"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="605"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="605" width="20" height="190" />

                    <rect
                      x="0"
                      y="805"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="805" width="20" height="190" />
                    <rect
                      x="105"
                      y="805"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="805"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="805"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="805"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="805"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="805" width="20" height="190" />
                  </mask>
                </defs>
                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="1000"
                  fill="#111015"
                  style={{
                    minHeight: "1000px",
                    mask: "url(#hole-mask)",
                  }}
                />

                <text
                  x={95 / 2}
                  y={190 / 2}
                  fontFamily="Pretendard-Bold"
                  fontSize="24"
                  fill="#2cc295"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  PY
                </text>

                {study_data.map((item) => (
                  <g
                    key={item.id}
                    onMouseEnter={() => setStudyHovered(item.id)}
                    onMouseLeave={() => setStudyHovered(null)}
                    onClick={() => handleClick(item.id)}
                  >
                    <rect
                      x={item.x}
                      y={item.y}
                      width={item.width}
                      height={item.height}
                      fill={
                        studyHovered === item.id
                          ? "rgba(255, 255, 255, 0.2)"
                          : "transparent"
                      }
                      stroke={studyHovered === item.id ? "#777" : "none"}
                      strokeWidth="3"
                      rx="20"
                      ry="20"
                      cursor="pointer"
                    />
                    <text
                      x={item.x + 30}
                      y={item.y + 40}
                      fontFamily="Pretendard-Regular"
                      fontSize="20"
                      fill="white"
                      alignmentBaseline="hanging"
                      cursor="pointer"
                    >
                      {`PY_${item.id}`}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
