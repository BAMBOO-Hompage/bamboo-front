import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetKnowledgeAPI from "../../api/knowledges/getKnowledgeAPI.tsx";
import DeleteKnowledgesAPI from "../../api/knowledges/deleteKnowledgesAPI.tsx";

import "../../App.css";
import styles from "../../style/Post.module.css";

type MyDataType = {
  memberId: number;
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
  profileImageUrl: string;
};

type Knowledge = {
  knowledgeId: number;
  writerId: number;
  writerName: string;
  title: string;
  content: string;
  type: string;
  views: number;
  images: string[];
  files: string[];
  comments: string[];
  createdAt: number[];
  updatedAt: number[];
};

export default function KnowledgePost() {
  const sanitizer = dompurify.sanitize;

  const [searchParams, setSearchParams] = useSearchParams();

  const [checkAuth, setCheckAuth] = useState<number>(0);
  const [myData, setMyData] = useState<MyDataType>({
    memberId: 0,
    studentId: "",
    email: "",
    name: "",
    major: "",
    phone: "",
    role: "",
    profileImageUrl: "",
  });
  const [postData, setPostData] = useState<Knowledge>({
    knowledgeId: 0,
    writerId: 0,
    writerName: "",
    title: "",
    content: "",
    type: "",
    views: 0,
    images: [],
    files: [],
    comments: [],
    createdAt: [],
    updatedAt: [],
  });

  // ✅ 삭제 중복 제출 방지
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    GetKnowledgeAPI(searchParams.get("id")).then((data) => {
      setPostData(data);
    });
  }, [searchParams]);

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_MEMBER") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
      setMyData(data);
    });
  }, []);

  const handleDelete = async () => {
    // ✅ 중복 클릭 가드
    if (isDeleting) return;

    const confirm = window.confirm("게시물을 삭제하시겠습니까?");
    if (!confirm) return;

    setIsDeleting(true);
    try {
      await DeleteKnowledgesAPI(postData.knowledgeId);
    } finally {
      // API 내부에서 라우팅/알림을 처리하더라도 가드를 해제해서 상태 복구
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <Nav type="community" />
      <div id="background" className="background">
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
              padding: "0 20px",
              minHeight: "960px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              display: "flex",
            }}
          >
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
                  fontFamily: "Suit-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                정보 공유
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Suit-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  목록으로
                </div>
              </div>
            </div>

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
                maxHeight: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
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
                    fontFamily: "Suit-Semibold",
                    fontSize: "18px",
                    color: "#2CC295",
                  }}
                >
                  {postData.type}
                </div>
                {checkAuth === 2 || myData.memberId === postData.writerId ? (
                  <div
                    style={{
                      height: "30px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src="../../img/btn/trash_disabled.png"
                      alt="trash"
                      style={{
                        width: "30px",
                        cursor: isDeleting ? "not-allowed" : "pointer",
                        marginRight: "15px",
                        opacity: isDeleting ? 0.5 : 1,
                        transition: "opacity 0.2s",
                      }}
                      onClick={handleDelete}
                      onMouseOver={(e) => {
                        if (isDeleting) return;
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
                        window.location.href = `/knowledgeEdit?id=${postData.knowledgeId}`;
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ height: "30px" }}></div>
                )}
              </div>
              <div
                style={{
                  marginBottom: "13px",
                  fontFamily: "Suit-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {postData.title}
              </div>
              <div
                style={{
                  marginBottom: "50px",
                  fontFamily: "Suit-Light",
                  fontSize: "16px",
                  color: "#777",
                }}
              >
                작성자: {postData.writerName}
                &emsp; 작성 일자:{" "}
                {postData.createdAt[0] +
                  "/" +
                  postData.createdAt[1] +
                  "/" +
                  postData.createdAt[2] +
                  " " +
                  postData.createdAt[3] +
                  ":" +
                  postData.createdAt[4] +
                  ":" +
                  postData.createdAt[5]}
              </div>
              {postData.files.length !== 0 && (
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    padding: "20px",
                    backgroundColor: "#222",
                    borderRadius: "20px",
                    marginBottom: "30px",
                    fontFamily: "Suit-Light",
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
                            index !== postData.files.length - 1 ? "10px" : "0",
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
              <div>
                <div
                  className={styles.container}
                  dangerouslySetInnerHTML={{
                    __html: sanitizer(`${postData.content}`),
                  }}
                  style={{
                    fontFamily: "Suit-Light",
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
