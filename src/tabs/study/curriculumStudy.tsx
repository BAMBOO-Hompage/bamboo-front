import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import StudyCard from "../../components/studyCard.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

export default function CurriculumStudy() {
  const [cStudyList, setCStudyList] = useState("전체");
  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <div
          style={{
            padding: "200px 0 300px",
            fontFamily: "Pretendard-Bold",
            fontSize: "40px",
          }}
        >
          Coming Soon...
        </div>

        <BottomInfo />
      </div>
    </div>
    // <div>
    //   <Nav type="study" />
    //   <div className="background">
    //     <div style={{ height: "200vh", display: "flex", padding: "100px 0" }}>
    //       <motion.div
    //         initial={{ opacity: 0, y: 50 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         viewport={{ once: false }}
    //         transition={{
    //           ease: "easeInOut",
    //           duration: 0.5,
    //           y: { duration: 0.5 },
    //         }}
    //         style={{
    //           boxSizing: "border-box",
    //           position: "relative",
    //           width: "400px",
    //           borderRight: "1px solid #444",
    //           textAlign: "left",
    //         }}
    //       >
    //         <div
    //           style={{
    //             width: "110px",
    //             fontFamily: "Pretendard-Bold",
    //             fontSize: "30px",
    //             color: "#fff",
    //             position: "absolute",
    //             right: "50px",
    //           }}
    //         >
    //           커리큘럼 스터디
    //           <div
    //             style={{
    //               marginTop: "40px",
    //               fontFamily: "Pretendard-Regular",
    //               fontSize: "16px",
    //             }}
    //           >
    //             <div
    //               className="post_tabs"
    //               style={cStudyList === "전체" ? { color: "#2CC295" } : {}}
    //               onClick={() => {
    //                 setCStudyList("전체");
    //               }}
    //             >
    //               전체
    //             </div>
    //             <div
    //               className="post_tabs"
    //               style={cStudyList === "PY" ? { color: "#2CC295" } : {}}
    //               onClick={() => {
    //                 setCStudyList("PY");
    //               }}
    //             >
    //               PY
    //             </div>
    //             <div
    //               className="post_tabs"
    //               style={cStudyList === "DA" ? { color: "#2CC295" } : {}}
    //               onClick={() => {
    //                 setCStudyList("DA");
    //               }}
    //             >
    //               DA
    //             </div>
    //             <div
    //               className="post_tabs"
    //               style={cStudyList === "ML" ? { color: "#2CC295" } : {}}
    //               onClick={() => {
    //                 setCStudyList("ML");
    //               }}
    //             >
    //               ML
    //             </div>
    //             <div
    //               className="post_tabs"
    //               style={cStudyList === "DL" ? { color: "#2CC295" } : {}}
    //               onClick={() => {
    //                 setCStudyList("DL");
    //               }}
    //             >
    //               DL
    //             </div>
    //           </div>
    //         </div>
    //       </motion.div>

    //       <motion.div
    //         initial={{ opacity: 0, y: 50 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         viewport={{ once: false }}
    //         transition={{
    //           ease: "easeInOut",
    //           duration: 0.5,
    //           y: { duration: 0.5 },
    //         }}
    //         style={{
    //           position: "relative",
    //           width: "1120px",
    //           height: "100%",
    //           textAlign: "left",
    //         }}
    //       >
    //         <div style={{ width: "810px", position: "absolute", left: "60px" }}>
    //           <div
    //             style={{
    //               width: "100%",
    //               fontFamily: "Pretendard-Bold",
    //               fontSize: "30px",
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             PY
    //           </div>
    //           <div
    //             style={{ display: "flex", gap: "15px", margin: "10px 0 30px" }}
    //           >
    //             <StudyCard
    //               img="../../img/Study/PY.jpg"
    //               title="PY1"
    //               tags={["Python"]}
    //               date="매주 수요일"
    //               authors={["김민우"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //             <StudyCard
    //               img="../../img/Study/PY.jpg"
    //               title="PY2"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["김지수", "김민수"]}
    //               link="https://www.notion.so/PY_2-c7bbe6f930e44fa8a88af67bfc74d4ce"
    //             />
    //             <StudyCard
    //               img="../../img/Study/PY.jpg"
    //               title="PY3"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["이용준", "고대환"]}
    //               link="https://www.notion.so/PY_4-fbe42c5f7c7c4fb0bbf36c773500c51c"
    //             />
    //           </div>

    //           <div
    //             style={{
    //               width: "100%",
    //               fontFamily: "Pretendard-Bold",
    //               fontSize: "30px",
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             DA
    //           </div>
    //           <div
    //             style={{ display: "flex", gap: "15px", margin: "10px 0 30px" }}
    //           >
    //             <StudyCard
    //               img="../../img/Study/DA.jpg"
    //               title="DA1"
    //               tags={["Python"]}
    //               date="매주 수요일"
    //               authors={["김나현, 신은빈"]}
    //               link="https://www.notion.so/DA_1-1-e4a63eb42a2a40ed9b7da1037e0bf3a7"
    //             />
    //             <StudyCard
    //               img="../../img/Study/DA.jpg"
    //               title="DA2"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["김진석", "이창민"]}
    //               link="https://www.notion.so/DA_2-545f78b442fa4f66b79d940ecd6a1cc5"
    //             />
    //             <StudyCard
    //               img="../../img/Study/DA.jpg"
    //               title="DA3"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["이용준", "고대환"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //           </div>

    //           <div
    //             style={{
    //               width: "100%",
    //               fontFamily: "Pretendard-Bold",
    //               fontSize: "30px",
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             ML
    //           </div>
    //           <div
    //             style={{ display: "flex", gap: "15px", margin: "10px 0 30px" }}
    //           >
    //             <StudyCard
    //               img="../../img/Study/ML.jpg"
    //               title="ML1"
    //               tags={["Python"]}
    //               date="매주 수요일"
    //               authors={["김민우"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //             <StudyCard
    //               img="../../img/Study/ML.jpg"
    //               title="ML2"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["김지수", "김민수"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //             <StudyCard
    //               img="../../img/Study/ML.jpg"
    //               title="ML3"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["이용준", "고대환"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //           </div>

    //           <div
    //             style={{
    //               width: "100%",
    //               fontFamily: "Pretendard-Bold",
    //               fontSize: "30px",
    //               color: "#fff",
    //               display: "flex",
    //               justifyContent: "space-between",
    //               alignItems: "center",
    //             }}
    //           >
    //             DL
    //           </div>
    //           <div
    //             style={{ display: "flex", gap: "15px", margin: "10px 0 30px" }}
    //           >
    //             <StudyCard
    //               img="../../img/Study/DL.jpg"
    //               title="DL1"
    //               tags={["Python"]}
    //               date="매주 수요일"
    //               authors={["김민우"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //             <StudyCard
    //               img="../../img/Study/DL.jpg"
    //               title="DL2"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["김지수", "김민수"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //             <StudyCard
    //               img="../../img/Study/DL.jpg"
    //               title="DL3"
    //               tags={["Python"]}
    //               date="2024년 2월 28일"
    //               authors={["이용준", "고대환"]}
    //               link="https://www.notion.so/PY_1-a471f9fd662a49039a87ee9d0c8a80d3"
    //             />
    //           </div>
    //         </div>
    //       </motion.div>
    //     </div>

    //     <BottomInfo />
    //   </div>
    // </div>
  );
}
