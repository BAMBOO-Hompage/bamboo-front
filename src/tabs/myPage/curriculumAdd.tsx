import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import SelectDeactivateAPI from "../../api/members/selectDeactivateAPI.tsx";
import GetMembersAPI from "../../api/members/getMembersAPI.tsx";
import PatchRoleAPI from "../../api/members/patchRoleAPI.tsx";

import SubjectData from "../../mockup_data/subject_data.tsx";

import "../../App.css";

const subject_data = SubjectData();
const cohort_data = {
  cohortId: 0,
  batch: 0,
  year: 0,
  isFirstSemester: true,
  isActive: true,
  subjects: SubjectData(),
};

export default function CreateCurriculum() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [subject, setSubject] = useState("");
  const [curriculumList, setCurriculumList] = useState<string[]>([]);

  // 커리큘럼 추가
  const addCurriculum = () => {
    if (subject.trim() !== "") {
      setCurriculumList([...curriculumList, subject]);
      setSubject("");
    }
  };

  // 저장 (추후 API 호출 가능)
  const saveCurriculum = () => {
    alert("저장된 커리큘럼:" + curriculumList);
  };

  return (
    <div>
      <div>커리큘럼 추가</div>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="과목 입력"
      />
      <button onClick={addCurriculum}>커리큘럼 추가</button>
      <button onClick={saveCurriculum}>저장</button>
      <button onClick={closePopup}>닫기</button>

      <ul>
        {curriculumList.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    // <div>
    //   <Nav type="myPage" />
    //   <div className="background">
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       whileInView={{ opacity: 1 }}
    //       viewport={{ once: false }}
    //       transition={{
    //         ease: "easeInOut",
    //         duration: 1,
    //       }}
    //       style={{
    //         width: "100%",
    //       }}
    //     >
    //       <div
    //         style={{
    //           position: "relative",
    //           maxWidth: "1000px",
    //           padding: "0 20px",
    //           minHeight: "600px",
    //           margin: "0 auto",
    //           marginTop: "100px",
    //           marginBottom: "150px",
    //           display: "flex",
    //         }}
    //       >
    //         <motion.div
    //           initial={{ opacity: 0, y: 50 }}
    //           whileInView={{ opacity: 1, y: 0 }}
    //           viewport={{ once: false }}
    //           transition={{
    //             ease: "easeInOut",
    //             duration: 0.5,
    //             y: { duration: 0.5 },
    //           }}
    //           style={{
    //             position: "relative",
    //             maxWidth: "820px",
    //             minHeight: "100%",
    //             textAlign: "left",
    //             paddingLeft: "50px",
    //           }}
    //         >
    //           <div
    //             style={{
    //               width: "100%",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 fontFamily: "Pretendard-Bold",
    //                 fontSize: "30px",
    //                 color: "#fff",
    //               }}
    //             >
    //               커리큘럼 관리
    //               <span
    //                 style={{
    //                   fontFamily: "Pretendard-Light",
    //                   fontSize: "12px",
    //                   color: "#FF5005",
    //                 }}
    //               >
    //                 test 기간동안만 개방합니다. (활동 종료 제한)
    //               </span>
    //             </div>
    //           </div>

    //           <div
    //             style={{
    //               width: "100%",
    //               marginTop: "40px",
    //             }}
    //           >
    //             <div
    //               style={{
    //                 width: "100%",
    //                 marginBottom: "30px",
    //                 fontFamily: "Pretendard-SemiBold",
    //                 fontSize: "22px",
    //                 color: "#2CC295",
    //               }}
    //             >
    //               {`6`}기 커리큘럼
    //             </div>

    //             {subject_data.map((subject, index) => (
    //               <div key={index} style={{ marginBottom: "30px" }}>
    //                 <div
    //                   style={{
    //                     width: "100%",
    //                     marginBottom: "20px",
    //                     fontFamily: "Pretendard-SemiBold",
    //                     fontSize: "22px",
    //                     color: "#fff",
    //                   }}
    //                 >
    //                   <img
    //                     src="../img/icon/leaf_list.png"
    //                     alt="leaf_list"
    //                     style={{ width: "9px" }}
    //                   />
    //                   &emsp;{subject.name}
    //                 </div>
    //                 {subject.weeklyContents.map((curriculum, weekIndex) => (
    //                   <div
    //                     key={weekIndex}
    //                     style={{
    //                       marginBottom: "10px",
    //                       fontFamily: "Pretendard-Light",
    //                       fontSize: "16px",
    //                       color: "#fff",
    //                       display: "flex",
    //                     }}
    //                   >
    //                     <div style={{ width: "60px" }}>
    //                       {curriculum.week}주차
    //                     </div>
    //                     <div>{curriculum.content}</div>
    //                   </div>
    //                 ))}
    //               </div>
    //             ))}

    //             {isEndActive && (
    //               <div
    //                 style={{
    //                   width: "100%",
    //                   marginTop: "100px",
    //                   display: "flex",
    //                   justifyContent: "right",
    //                 }}
    //               >
    //                 <div
    //                   style={{
    //                     fontFamily: "Pretendard-SemiBold",
    //                     fontSize: "20px",
    //                     width: "280px",

    //                     padding: "12px",
    //                     backgroundColor: "#111015",
    //                     borderRadius: "25px",
    //                     boxShadow:
    //                       "-10px -10px 30px #242424, 15px 15px 30px #000",
    //                     color: "#FF5005",
    //                     cursor: "pointer",
    //                     transition: "all 0.3s ease",
    //                     textAlign: "center",
    //                   }}
    //                   onMouseEnter={(e) => {
    //                     (e.target as HTMLDivElement).style.transform =
    //                       "scale(1.05)"; // 살짝 확대
    //                     (e.target as HTMLDivElement).style.boxShadow =
    //                       "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
    //                   }}
    //                   onMouseLeave={(e) => {
    //                     (e.target as HTMLDivElement).style.transform =
    //                       "scale(1)";
    //                     (e.target as HTMLDivElement).style.boxShadow =
    //                       "-10px -10px 30px #242424, 15px 15px 30px #000";
    //                   }}
    //                   onClick={() => {
    //                     setIsPopupOpen(!isPopupOpen);
    //                   }}
    //                 >
    //                   활동 종료
    //                 </div>
    //               </div>
    //             )}
    //             {/* 팝업 컴포넌트 */}
    //             {isPopupOpen && (
    //               <form
    //                 style={{
    //                   position: "fixed",
    //                   top: "50%",
    //                   left: "50%",
    //                   transform: "translate(-50%, -50%)",
    //                   width: "80%",
    //                   maxWidth: "380px",
    //                   backgroundColor: "#111015",
    //                   padding: "30px 30px 20px",
    //                   boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    //                   borderRadius: "10px",
    //                   textAlign: "left",
    //                   zIndex: 1000,
    //                 }}
    //               >
    //                 <div
    //                   style={{
    //                     fontFamily: "Pretendard-Regular",
    //                     fontSize: "16px",
    //                     color: "#fff",
    //                     marginBottom: "10px",
    //                     lineHeight: "1.5",
    //                   }}
    //                 >
    //                   <span style={{ color: "#FF5005" }}>
    //                     "{`6`}기 활동 종료"
    //                   </span>
    //                   를 입력하고 활동 종료 버튼을 눌러주세요.
    //                   <br />
    //                 </div>
    //                 <div
    //                   style={{
    //                     width: "100%",
    //                     height: "40px",
    //                     backgroundColor: "#111015",
    //                     boxShadow:
    //                       "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
    //                     borderRadius: "20px",
    //                     marginBottom: "20px",
    //                   }}
    //                 >
    //                   <input
    //                     id="confirmEnd"
    //                     type="text"
    //                     placeholder="활동 종료를 확인해주세요."
    //                     autoComplete="off"
    //                     value={confirmationText}
    //                     {...register("Title", {
    //                       required: "활동 종료를 확인해주세요.",
    //                       onChange: (e) => setConfirmationText(e.target.value),
    //                     })}
    //                     style={{
    //                       width: "100%",
    //                       maxWidth: "340px",
    //                       height: "40px",
    //                       margin: "0 20px",
    //                       borderRadius: "10px",
    //                       fontFamily: "Pretendard-Light",
    //                       fontSize: "18px",
    //                     }}
    //                   />
    //                 </div>
    //                 <div
    //                   style={{
    //                     width: "250px",
    //                     margin: "0 auto",
    //                     display: "flex",
    //                     gap: "10px",
    //                   }}
    //                 >
    //                   <Button
    //                     type="destructive"
    //                     size="small"
    //                     title="취소"
    //                     onClick={() => {
    //                       const deleteEnd =
    //                         window.confirm("활동 종료를 취소하시겠습니까?");
    //                       if (deleteEnd) {
    //                         setConfirmationText("");
    //                         setIsPopupOpen(!isPopupOpen);
    //                       }
    //                     }}
    //                   />
    //                   <Button
    //                     type="primary"
    //                     size="small"
    //                     title="활동 종료"
    //                     onClick={() => {
    //                       handleEnd();
    //                     }}
    //                   />
    //                 </div>
    //               </form>
    //             )}
    //             {/* 팝업 배경 */}
    //             {isPopupOpen && (
    //               <div
    //                 onClick={() => {
    //                   setIsPopupOpen(!isPopupOpen);
    //                 }}
    //                 style={{
    //                   position: "fixed",
    //                   top: 0,
    //                   left: 0,
    //                   padding: "0 20px",
    //                   width: "100%",
    //                   height: "100%",
    //                   backgroundColor: "rgba(0, 0, 0, 0.5)",
    //                   zIndex: 999,
    //                 }}
    //               />
    //             )}
    //           </div>
    //         </motion.div>
    //       </div>
    //     </motion.div>
    //   </div>
    //   <BottomInfo />
    // </div>
  );
}
