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
              style={{
                boxSizing: "border-box",
                width: "100%",
                minHeight: "1000px",
                position: "relative",
              }}
            >
              <svg
                width="100%"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                style={{
                  borderRadius: "20px",
                  aspectRatio: "1 / 1",
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
              </svg>
            </div>

            <div
              style={{
                width: "100%",
                minHeight: "200px",
                borderRadius: "20px",
                backgroundColor: "rgba(17, 16, 21, 0.5)",
                opacity: "0.2",
              }}
            ></div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
