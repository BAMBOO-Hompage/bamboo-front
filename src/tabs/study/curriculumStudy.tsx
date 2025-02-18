import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import StudyCard from "../../components/studyCard.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import "../../App.css";

const study_data = [
  { id: 1, x: 105, y: 0, width: 190, height: 190, label: "첫 번째 공간" },
  { id: 2, x: 305, y: 0, width: 190, height: 190, label: "두 번째 공간" },
  { id: 3, x: 505, y: 0, width: 190, height: 190, label: "세 번째 공간" },
];

export default function CurriculumStudy() {
  const [hovered, setHovered] = useState(false);
  const [studyHovered, setStudyHovered] = useState<number | null>(null);

  const [cStudyList, setCStudyList] = useState("전체");

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
          <LockedPagePrepare />
          {/* <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "100px",
              padding: "0 20px",
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
              커리큘럼 스터디
            </div>

            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "clamp(14px, 2vw, 18px)",
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
                커리큘럼 스터디
              </div>
              <Link
                to="/selfStudy"
                style={{
                  textDecoration: "none",
                  fontFamily: "Pretendard-Light",
                  fontSize: "clamp(14px, 2vw, 18px)",
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
                자율 스터디
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
            </div>
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                marginTop: "50px",
                position: "relative",
              }}
            >
              <svg
                width="100%"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                style={{
                  aspectRatio: "1 / 1",
                }}
              >
                <defs>
                  <filter
                    id="blurFilter"
                    x="-300%"
                    y="-300%"
                    width="600%"
                    height="600%"
                  >
                    <feGaussianBlur stdDeviation="110" />
                  </filter>

                  <mask id="hole-mask">
                    <rect x="0" y="0" width="1000" height="1000" fill="#fff" />

                    {[...Array(5)].map((_, row) => (
                      <>
                        <rect
                          x="0"
                          y={row * 200}
                          width="95"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect x="0" y={row * 200} width="20" height="190" />
                        <rect
                          x="105"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="305"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="505"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="705"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="905"
                          y={row * 200}
                          width="95"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect x="980" y={row * 200} width="20" height="190" />
                      </>
                    ))}
                  </mask>
                </defs>
                {[
                  { cx: 150, cy: 220, r: 70, fill: "#2CC295" },
                  { cx: 150, cy: 720, r: 70, fill: "#2CC295" },
                  { cx: 650, cy: 600, r: 70, fill: "#2CC295" },
                  { cx: 650, cy: 750, r: 70, fill: "#2CC295" },
                  { cx: 650, cy: 900, r: 70, fill: "#2CC295" },
                  { cx: 330, cy: 950, r: 70, fill: "#2CC295" },
                  { cx: 550, cy: 50, r: 70, fill: "#2CC295" },
                  { cx: 440, cy: 280, r: 90, fill: "#297FB8" },
                  { cx: 850, cy: 150, r: 70, fill: "#297FB8" },
                  { cx: 200, cy: 850, r: 70, fill: "#297FB8" },
                  { cx: 300, cy: 550, r: 60, fill: "#297FB8" },
                  { cx: 800, cy: 500, r: 100, fill: "#297FB8" },
                ].map((circle, index) => (
                  <circle key={index} {...circle} filter="url(#blurFilter)" />
                ))}

                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="1000"
                  fill="#111015"
                  style={{
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
                  <Link
                    to={`/studyPost?id=${item.id}&member=&week=1`}
                    style={{ textDecoration: "none" }}
                  >
                    <g
                      key={item.id}
                      transform="scale(1)"
                      onMouseEnter={() => setStudyHovered(item.id)}
                      onMouseLeave={() => setStudyHovered(null)}
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
                        fontSize="20px"
                        fill="white"
                        alignmentBaseline="hanging"
                        cursor="pointer"
                      >
                        {`PY_${item.id}`}
                      </text>
                    </g>
                  </Link>
                ))}
              </svg>
            </div>
          </div> */}
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
