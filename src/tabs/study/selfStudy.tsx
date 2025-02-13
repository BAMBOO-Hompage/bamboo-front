import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
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
              position: "relative",
              maxWidth: "1000px",
              minHeight: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
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
                height="1000px" // 높이를 고정
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                style={{
                  borderRadius: "30px",
                }}
              >
                <defs>
                  <filter
                    id="blurFilter"
                    x="-250%"
                    y="-250%"
                    width="500%"
                    height="500%"
                  >
                    <feGaussianBlur stdDeviation="120" />
                  </filter>

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
                      y="200"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="200" width="20" height="190" />
                    <rect
                      x="105"
                      y="200"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="200"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="200"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="200"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="200"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="200" width="20" height="190" />

                    <rect
                      x="0"
                      y="400"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="400" width="20" height="190" />
                    <rect
                      x="105"
                      y="400"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="400"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="400"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="400"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="400"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="400" width="20" height="190" />

                    <rect
                      x="0"
                      y="600"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="600" width="20" height="190" />
                    <rect
                      x="105"
                      y="600"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="600"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="600"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="600"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="600"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="600" width="20" height="190" />

                    <rect
                      x="0"
                      y="800"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="0" y="800" width="20" height="190" />
                    <rect
                      x="105"
                      y="800"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="305"
                      y="800"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="505"
                      y="800"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="705"
                      y="800"
                      width="190"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect
                      x="905"
                      y="800"
                      width="95"
                      height="190"
                      rx="20"
                      ry="20"
                    />
                    <rect x="980" y="800" width="20" height="190" />
                  </mask>
                </defs>
                <circle
                  cx="150"
                  cy="220"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="150"
                  cy="720"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="650"
                  cy="600"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="650"
                  cy="750"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="650"
                  cy="900"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="330"
                  cy="950"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="550"
                  cy="50"
                  r="70"
                  fill="#2CC295"
                  filter="url(#blurFilter)"
                />

                <circle
                  cx="440"
                  cy="280"
                  r="90"
                  fill="#297FB8"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="850"
                  cy="150"
                  r="70"
                  fill="#297FB8"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="200"
                  cy="850"
                  r="70"
                  fill="#297FB8"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="300"
                  cy="550"
                  r="60"
                  fill="#297FB8"
                  filter="url(#blurFilter)"
                />
                <circle
                  cx="800"
                  cy="500"
                  r="100"
                  fill="#297FB8"
                  filter="url(#blurFilter)"
                />

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
                    transform="scale(1)"
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
                      fontSize="20px"
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
