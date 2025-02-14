import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import StudyCard from "../../components/studyCard.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

const study_data = {
  studyId: 1,
  subjectName: "PY",
  cohort: 6,
  isBook: true,
  section: 1,
  studyMaster: "202010770",
  studyMembers: ["202110856", "202010766"],
};

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
                color: "#2cc295",
                textShadow: "0 0 0.1em, 0 0 0.1em",
                textAlign: "left",
              }}
            >
              {study_data.subjectName + "_" + study_data.section}
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
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
