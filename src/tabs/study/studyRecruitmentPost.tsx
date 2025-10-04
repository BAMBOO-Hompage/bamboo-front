// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import Nav from "../../components/nav.tsx";
// import BottomInfo from "../../components/bottomInfo.tsx";

// export default function StudyRecruitmentPost() {
//   const [searchParams] = useSearchParams();
//   const id = searchParams.get("id");

//   return (
//     <div>
//       <Nav type="study" />
//       <div className="background" style={{ padding: "100px 20px" }}>
//         <h1 style={{ color: "#fff" }}>스터디 모집 상세 페이지</h1>
//         <p style={{ color: "#aaa" }}>글 ID: {id}</p>
//         {/* 상세 내용 들어갈 자리 */}
//       </div>
//       <BottomInfo />
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetstudyRecruitmentAPI from "../../api/study/GetstudyRecruitmentAPI.tsx";

import "../../App.css";
import styles from "../../style/Post.module.css";

type LocalDate = [number, number, number];
type LocalDateTime = [number, number, number, number, number, number, number?];

type studyRecruitment = {
  id: number;
  writerId: number;
  writerName: string;
  title: string;
  content: string;
  // maxMembers: number;
  //
  createdAt: LocalDateTime;
  updatedAt: LocalDateTime;
};

export default function StudyRecruitmentPost() {
  const sanitizer = dompurify.sanitize;

  const [searchParams, setSearchParams] = useSearchParams();

  const [checkAuth, setCheckAuth] = useState<number>(0);
  const [postData, setPostData] = useState<studyRecruitment>({
    id: 0,
    writerId: 0,
    writerName: "",
    title: "",
    content: "",
    // maxMembers: 0,
    // deadline: [0, 0, 0],
    createdAt: [0, 0, 0, 0, 0, 0],
    updatedAt: [0, 0, 0, 0, 0, 0],
    files: [],
  });

  // 상세 데이터 로드
  useEffect(() => {
    const idParam = searchParams.get("id");
    if (!idParam) return;
    (async () => {
      try {
        const res = await GetStudyRecruitmentAPI(Number(idParam));
        // 서버 응답이 { code, message, result, success } 구조라면:
        const data = res?.result ?? res;
        setPostData(data as StudyRecruitment);
      } catch (e) {
        console.error("failed to load study recruitment:", e);
      }
    })();
  }, [searchParams]);

  // 권한 확인
  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS")
        setCheckAuth(2);
      else if (data.role === "ROLE_MEMBER") setCheckAuth(1);
      else setCheckAuth(0);
    });
  }, []);

  return (
    <div>
      <Nav type="study" />
      <div id="background" className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ ease: "easeInOut", duration: 1 }}
          style={{ width: "100%" }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              minHeight: "960px",
              margin: "100px auto 150px",
              display: "flex",
            }}
          >
            {/* 좌측 사이드 */}
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                minHeight: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Paperozi-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                스터디 모집
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Paperozi-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => window.history.back()}
                >
                  목록으로
                </div>
              </div>
            </div>

            {/* 본문 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              {/* 상단 우측 액션 */}
              <div
                style={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "Paperozi-Semibold",
                    fontSize: "18px",
                    color: "#2CC295",
                  }}
                >
                  스터디 모집
                </div>

                {checkAuth === 2 ? (
                  <div style={{ height: "30px" }}>
                    <img
                      src="../../img/btn/trash_disabled.png"
                      alt="trash"
                      style={{
                        width: "30px",
                        cursor: "pointer",
                        marginRight: "15px",
                      }}
                      onClick={async () => {
                        const ok = window.confirm("게시물을 삭제하시겠습니까?");
                        if (!ok) return;
                        try {
                          await DeleteStudyRecruitmentAPI(postData.id);
                          alert("삭제되었습니다.");
                          window.history.back();
                        } catch (e) {
                          console.error(e);
                          alert("삭제 중 오류가 발생했습니다.");
                        }
                      }}
                      onMouseOver={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `../../img/btn/trash_enabled.png`;
                      }}
                      onMouseOut={(e) => {
                        (
                          e.target as HTMLImageElement
                        ).src = `../../img/btn/trash_disabled.png`;
                      }}
                    />
                    <img
                      src="../../img/btn/edit_enabled.png"
                      alt="edit"
                      style={{ width: "30px", cursor: "pointer" }}
                      onClick={() => {
                        window.location.href = `/studyRecruitmentEdit?id=${postData.id}`;
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ height: "30px" }} />
                )}
              </div>

              {/* 제목 */}
              <div
                style={{
                  marginBottom: "13px",
                  fontFamily: "Paperozi-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {postData.title}
              </div>

              {/* 메타 정보 */}
              <div
                style={{
                  marginBottom: "50px",
                  fontFamily: "Paperozi-Light",
                  fontSize: "16px",
                  color: "#777",
                }}
              >
                작성자: {postData.writerName}
                &emsp; 모집정원: {postData.maxMembers}명 &emsp; 작성 일자:{" "}
                {fmtDateTime(postData.createdAt)}
              </div>

              {/* 첨부파일(옵셔널) */}
              {postData.files && postData.files.length > 0 && (
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "770px",
                    padding: "20px",
                    backgroundColor: "#222",
                    borderRadius: "20px",
                    marginBottom: "30px",
                    fontFamily: "Paperozi-Light",
                    fontSize: "18px",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "150px",
                      minWidth: "70px",
                      marginRight: "20px",
                    }}
                  >
                    첨부파일
                  </div>
                  <div>
                    {postData.files.map((file, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom:
                            index !== postData.files!.length - 1 ? "10px" : 0,
                        }}
                      >
                        ·&emsp;
                        <a
                          href={file}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#fff",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-word",
                          }}
                        >
                          {file}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 내용 */}
              <div>
                <div
                  className={styles.container}
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(`${postData.content}`),
                  }}
                  style={{
                    fontFamily: "Paperozi-Light",
                    fontSize: "18px",
                    color: "#fff",
                    lineHeight: "1.4",
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
