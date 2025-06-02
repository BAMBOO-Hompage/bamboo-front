import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import PDFPreviewComponent from "../../components/pdfPreview.tsx";
import dompurify from "dompurify";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetPaperAPI from "../../api/library-posts/getPaperAPI.tsx";
import DeletePapersAPI from "../../api/library-posts/deletePapersAPI.tsx";
import PostPaperCommentsAPI from "../../api/library-posts/postPaperCommentsAPI.tsx";
import PostPaperRepliesAPI from "../../api/library-posts/postPaperRepliesAPI.tsx";
import GetPaperCommentsAPI from "../../api/library-posts/getPaperCommentsAPI.tsx";
import DeletePaperCommentsAPI from "../../api/library-posts/deletePaperCommentsAPI.tsx";
import PutPaperCommentsAPI from "../../api/library-posts/putPaperCommentsAPI.tsx";

import "../../App.css";
// import "../../style/Post.css";`

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
type Paper = {
  libraryPostId: number;
  writerId: number;
  writerName: string;
  paperName: string;
  year: string;
  topic: string;
  content: string;
  link: string;
  fileUrl: string;
  tagNames: string[];
  commentCount: number;
};

const maxVisiblePages = 5;

export default function AlexandriaPost() {
  const sanitizer = dompurify.sanitize;

  const [searchParams, setSearchParams] = useSearchParams();
  // const currentPage = parseInt(searchParams.get("commentPage") || "1", 10);

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
  const [paperData, setPaperData] = useState<Paper>({
    libraryPostId: 0,
    writerId: 0,
    writerName: "",
    paperName: "",
    year: "",
    topic: "",
    content: "",
    link: "",
    fileUrl: "",
    tagNames: [],
    commentCount: 0,
  });
  const [comment, setComment] = useState("");
  const [openReply, setOpenReply] = useState(0);
  const [reply, setReply] = useState("");
  const [openCommentEdit, setOpenCommentEdit] = useState(0);
  const [commentEdit, setCommentEdit] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [paperCommentsToDisplay, setPaperCommentsToDisplay] = useState([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) {
      page = 1;
      alert("첫 페이지 입니다.");
      return;
    }
    if (page > totalPages) {
      page = totalPages;
      alert("마지막 페이지 입니다.");
      return;
    }
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paperResult = await GetPaperAPI(searchParams.get("id"));
        setPaperData(paperResult);
        const paperCommentsResult = await GetPaperCommentsAPI(
          searchParams.get("id"),
          currentPage
        );
        setPaperCommentsToDisplay(paperCommentsResult.content);
        setTotalPages(paperCommentsResult.totalPages);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [currentPage]);

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
      if (!data.profileImageUrl) {
        setPreviewImage("../img/icon/base_profile.png");
      } else {
        setPreviewImage(data.profileImageUrl);
      }
    });
  }, []);

  const postComments = async () => {
    try {
      await PostPaperCommentsAPI(paperData.libraryPostId, comment);
      const paperCommentsResult = await GetPaperCommentsAPI(
        searchParams.get("id"),
        currentPage
      );
      setTotalPages(paperCommentsResult.totalPages);
      const newPaperCommentsResult = await GetPaperCommentsAPI(
        searchParams.get("id"),
        paperCommentsResult.totalPages
      );
      setCurrentPage(paperCommentsResult.totalPages);
      setPaperCommentsToDisplay(newPaperCommentsResult.content);
      setComment("");
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };
  const postReplies = async (parentId) => {
    try {
      await PostPaperRepliesAPI(paperData.libraryPostId, parentId, reply);
      const paperCommentsResult = await GetPaperCommentsAPI(
        searchParams.get("id"),
        currentPage
      );
      setPaperCommentsToDisplay(paperCommentsResult.content);
      setOpenReply(0);
      setReply("");
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };
  const putComments = async (commentId) => {
    try {
      await PutPaperCommentsAPI(
        paperData.libraryPostId,
        commentId,
        commentEdit
      );
      const paperCommentsResult = await GetPaperCommentsAPI(
        searchParams.get("id"),
        currentPage
      );
      setPaperCommentsToDisplay(paperCommentsResult.content);
      setComment("");
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <Nav type="dataCenter" />
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
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                  marginBottom: "8px",
                }}
              >
                알렉산드리아 도서관
              </div>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                알렉산드리아 도서관은 이집트 알렉산드리아에 있었던 고대에 가장
                크고 영향력 있는 도서관으로,
                <br />
                세상의 모든 지식을 수집한다는 의미를 가지고 있습니다.
              </div>
            </div>

            <div
              style={{
                width: "100%",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {checkAuth === 2 || myData.memberId === paperData.writerId ? (
                <Button
                  type="destructive"
                  size="xsmall"
                  title="삭제"
                  onClick={() => {
                    const deleteConfirm =
                      window.confirm("게시물을 삭제하시겠습니까?");
                    if (deleteConfirm) {
                      DeletePapersAPI(paperData.libraryPostId);
                    }
                  }}
                />
              ) : (
                <div></div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  gap: "10px",
                }}
              >
                <Button
                  type="destructive"
                  size="xsmall"
                  title="목록"
                  onClick={() => {
                    window.history.back();
                  }}
                />
                {myData.memberId === paperData.writerId ? (
                  <Button
                    type="primary"
                    size="xsmall"
                    title="수정"
                    onClick={() => {
                      window.location.href = `/alexandriaEdit?id=${paperData.libraryPostId}`;
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                minHeight: "960px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "20px",
                    fontFamily: "Pretendard-Bold",
                    fontSize: "clamp(22px, 3.3vw, 28px)",
                    color: "#fff",
                  }}
                >
                  {paperData.paperName}
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;논문
                  </div>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={paperData.link}
                    style={{
                      display: "block",
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                  >
                    {paperData.link}
                  </a>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;연도
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.year}
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;주제
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.topic}
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;태그
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.tagNames.map((tag) => `#${tag} `)}
                  </div>
                </div>
                <div
                  style={{
                    maxWidth: "960px",
                    minHeight: "40px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 18px)",
                  }}
                >
                  <div style={{ width: "140px", color: "#aaa" }}>
                    ·&emsp;발표자
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "850px",
                      fontFamily: "Pretendard-Light",
                      color: "#fff",
                    }}
                  >
                    {paperData.writerName}
                  </div>
                </div>

                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#444",
                    height: "2px",
                  }}
                />
                {paperData?.fileUrl && (
                  <>
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        paddingTop: "20px",
                        borderRadius: "20px",
                        marginBottom: "10px",
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color: "#fff",
                      }}
                    >
                      <div
                        style={{
                          marginBottom: "20px",
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
                          첨부 파일
                        </div>
                        <div>
                          <div>
                            <a
                              href={paperData?.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "#fff",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                              }}
                            >
                              {paperData?.fileUrl}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div style={{ width: "100%", margin: "0 auto" }}>
                        <PDFPreviewComponent
                          pdfUrl={paperData?.fileUrl}
                          width={960}
                        />
                      </div>
                    </div>
                  </>
                )}
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    minHeight: "500px",
                    borderRadius: "30px",
                    border: "none",
                    padding: "20px 0",
                    paddingBottom: "100px",
                  }}
                >
                  <div
                    className="container"
                    dangerouslySetInnerHTML={{
                      __html: sanitizer(`${paperData.content}`),
                    }}
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "clamp(14px, 2vw, 18px)",
                      color: "#fff",
                      lineHeight: "1.4",
                    }}
                  />
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    backgroundColor: "#444",
                    height: "2px",
                  }}
                />

                {paperCommentsToDisplay.length > 0 ? (
                  <>
                    <div
                      style={{
                        fontFamily: "Pretendard-Bold",
                        fontSize: "18px",
                        color: "#fff",
                        marginTop: "40px",
                        marginBottom: "20px",
                      }}
                    >
                      댓글 {paperData.commentCount}개
                    </div>
                    {paperCommentsToDisplay.map((paperComment) => (
                      <div
                        key={paperComment.commentId}
                        style={{ padding: "15px 0 0" }}
                      >
                        {paperComment.commentId === openCommentEdit ? (
                          <form>
                            <div
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Pretendard-Bold",
                                  fontSize: "16px",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={previewImage}
                                  alt="profile"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                  }}
                                />
                                {myData.major}_{myData.name}
                              </div>
                              <div
                                style={{
                                  display: commentEdit.trim() ? "" : "none",
                                }}
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  title="댓글 등록"
                                  onClick={() => {
                                    if (commentEdit) {
                                      putComments(paperComment.commentId);
                                      setOpenCommentEdit(0);
                                    } else {
                                      alert("내용을 작성해주세요.");
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "100%",
                                height: "120px",
                                padding: "10px 15px",
                                borderRadius: "20px",
                                backgroundColor: "#222",
                              }}
                            >
                              <textarea
                                style={{
                                  fontFamily: "Pretendard-Light",
                                  fontSize: "clamp(14px, 2vw, 16px)",
                                  color: "#fff",
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  background: "transparent",
                                  resize: "none",
                                  outline: "none",
                                  lineHeight: "1.4",
                                }}
                                placeholder="답글을 작성해주세요."
                                value={commentEdit}
                                onChange={(e) => {
                                  setCommentEdit(e.target.value);
                                }}
                              />
                            </div>
                          </form>
                        ) : (
                          <>
                            <div
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Pretendard-SemiBold",
                                  fontSize: "16px",
                                  color: "#fff",
                                  display: "flex",
                                  justifyContent: "right",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={
                                    paperComment.writerImageUrl
                                      ? paperComment.writerImageUrl
                                      : "../img/icon/base_profile.png"
                                  }
                                  alt="profile"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div>
                                  {paperComment.writerMajor}_
                                  {paperComment.writerName}
                                </div>
                              </div>
                              <div
                                style={{
                                  fontFamily: "Pretendard-Light",
                                  fontSize: "14px",
                                  color: "#777",
                                }}
                              >
                                {checkAuth >= 1 ? (
                                  <span
                                    style={{
                                      cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.fontWeight = "600";
                                      e.currentTarget.style.textDecoration =
                                        "underline #777";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.fontWeight = "300";
                                      e.currentTarget.style.textDecoration =
                                        "none";
                                    }}
                                    onClick={() => {
                                      if (
                                        paperComment.commentId === openReply
                                      ) {
                                        setOpenReply(0);
                                      } else {
                                        setOpenReply(paperComment.commentId);
                                      }
                                    }}
                                  >
                                    답글 달기
                                  </span>
                                ) : (
                                  <></>
                                )}
                                {myData.memberId === paperComment.memberId ? (
                                  <>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.fontWeight =
                                          "600";
                                        e.currentTarget.style.textDecoration =
                                          "underline #777";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.fontWeight =
                                          "300";
                                        e.currentTarget.style.textDecoration =
                                          "none";
                                      }}
                                      onClick={() => {
                                        setCommentEdit(paperComment.content);
                                        setOpenCommentEdit(
                                          paperComment.commentId
                                        );
                                      }}
                                    >
                                      수정
                                    </span>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {checkAuth === 2 ||
                                myData.memberId === paperComment.memberId ? (
                                  <>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <span
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.fontWeight =
                                          "600";
                                        e.currentTarget.style.textDecoration =
                                          "underline #777";
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.fontWeight =
                                          "300";
                                        e.currentTarget.style.textDecoration =
                                          "none";
                                      }}
                                      onClick={() => {
                                        const deleteConfirm =
                                          window.confirm(
                                            "댓글을 삭제하시겠습니까?"
                                          );
                                        if (deleteConfirm) {
                                          DeletePaperCommentsAPI(
                                            paperData.libraryPostId,
                                            paperComment.commentId
                                          );
                                        }
                                      }}
                                    >
                                      삭제
                                    </span>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "100%",
                                padding: "0 30px",
                                borderRadius: "20px",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Pretendard-ExtraLight",
                                  fontSize: "clamp(14px, 2vw, 16px)",
                                  color: "#fff",
                                  width: "100%",
                                  border: "none",
                                  background: "transparent",
                                  resize: "none",
                                  outline: "none",
                                  lineHeight: "1.4",
                                  whiteSpace: "pre-wrap",
                                  wordBreak: "break-word",
                                }}
                              >
                                {paperComment.content}
                              </div>
                            </div>
                          </>
                        )}
                        {paperComment.commentId === openReply ? (
                          <form
                            style={{ padding: "15px 0 0", marginLeft: "50px" }}
                          >
                            <div
                              style={{
                                marginBottom: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div
                                style={{
                                  fontFamily: "Pretendard-Bold",
                                  fontSize: "16px",
                                  color: "#fff",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <img
                                  src={previewImage}
                                  alt="profile"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                  }}
                                />
                                {myData.major}_{myData.name}
                              </div>
                              <div
                                style={{
                                  display: reply.trim() ? "" : "none",
                                }}
                              >
                                <Button
                                  type="primary"
                                  size="small"
                                  title="댓글 등록"
                                  onClick={() => {
                                    if (reply) {
                                      postReplies(paperComment.commentId);
                                    } else {
                                      alert("내용을 작성해주세요.");
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              style={{
                                boxSizing: "border-box",
                                width: "100%",
                                height: "120px",
                                padding: "10px 15px",
                                borderRadius: "20px",
                                backgroundColor: "#222",
                              }}
                            >
                              <textarea
                                style={{
                                  fontFamily: "Pretendard-Light",
                                  fontSize: "clamp(14px, 2vw, 16px)",
                                  color: "#fff",
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  background: "transparent",
                                  resize: "none",
                                  outline: "none",
                                  lineHeight: "1.4",
                                }}
                                placeholder="답글을 작성해주세요."
                                value={reply}
                                onChange={(e) => {
                                  setReply(e.target.value);
                                }}
                              />
                            </div>
                          </form>
                        ) : (
                          <></>
                        )}
                        {paperComment.children.length > 0 ? (
                          <>
                            {paperComment.children.map((paperReply) => (
                              <div
                                key={paperReply.commentId}
                                style={{
                                  padding: "15px 0 0",
                                  marginLeft: "50px",
                                }}
                              >
                                {paperReply.commentId === openCommentEdit ? (
                                  <form>
                                    <div
                                      style={{
                                        marginBottom: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: "Pretendard-Bold",
                                          fontSize: "16px",
                                          color: "#fff",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          src={previewImage}
                                          alt="profile"
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                            objectFit: "cover",
                                          }}
                                        />
                                        {myData.major}_{myData.name}
                                      </div>
                                      <div
                                        style={{
                                          display: commentEdit.trim()
                                            ? ""
                                            : "none",
                                        }}
                                      >
                                        <Button
                                          type="primary"
                                          size="small"
                                          title="댓글 등록"
                                          onClick={() => {
                                            if (commentEdit) {
                                              putComments(paperReply.commentId);
                                              setOpenCommentEdit(0);
                                            } else {
                                              alert("내용을 작성해주세요.");
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        boxSizing: "border-box",
                                        width: "100%",
                                        height: "120px",
                                        padding: "10px 15px",
                                        borderRadius: "20px",
                                        backgroundColor: "#222",
                                      }}
                                    >
                                      <textarea
                                        style={{
                                          fontFamily: "Pretendard-Light",
                                          fontSize: "clamp(14px, 2vw, 16px)",
                                          color: "#fff",
                                          width: "100%",
                                          height: "100%",
                                          border: "none",
                                          background: "transparent",
                                          resize: "none",
                                          outline: "none",
                                          lineHeight: "1.4",
                                        }}
                                        placeholder="답글을 작성해주세요."
                                        value={commentEdit}
                                        onChange={(e) => {
                                          setCommentEdit(e.target.value);
                                        }}
                                      />
                                    </div>
                                  </form>
                                ) : (
                                  <>
                                    <div
                                      style={{
                                        marginBottom: "10px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: "Pretendard-SemiBold",
                                          fontSize: "16px",
                                          color: "#fff",
                                          display: "flex",
                                          justifyContent: "right",
                                          alignItems: "center",
                                        }}
                                      >
                                        <img
                                          // src={
                                          //   paperReply.member.profileImageUrl
                                          //     ? paperReply.member
                                          //         .profileImageUrl
                                          //     : "../img/icon/base_profile.png"
                                          // }
                                          src="../img/icon/base_profile.png"
                                          alt="profile"
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            marginRight: "10px",
                                            objectFit: "cover",
                                          }}
                                        />
                                        <div>
                                          {paperReply.writerMajor}_
                                          {paperReply.writerName}
                                        </div>
                                      </div>
                                      <div
                                        style={{
                                          fontFamily: "Pretendard-Light",
                                          fontSize: "14px",
                                          color: "#777",
                                        }}
                                      >
                                        {myData.memberId ===
                                        paperReply.memberId ? (
                                          <>
                                            <span
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.fontWeight =
                                                  "600";
                                                e.currentTarget.style.textDecoration =
                                                  "underline #777";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.fontWeight =
                                                  "300";
                                                e.currentTarget.style.textDecoration =
                                                  "none";
                                              }}
                                              onClick={() => {
                                                setCommentEdit(
                                                  paperReply.content
                                                );
                                                setOpenCommentEdit(
                                                  paperReply.commentId
                                                );
                                              }}
                                            >
                                              수정
                                            </span>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        {checkAuth === 2 ||
                                        myData.memberId ===
                                          paperReply.memberId ? (
                                          <>
                                            &nbsp;&nbsp;|&nbsp;&nbsp;
                                            <span
                                              style={{
                                                cursor: "pointer",
                                              }}
                                              onMouseEnter={(e) => {
                                                e.currentTarget.style.fontWeight =
                                                  "600";
                                                e.currentTarget.style.textDecoration =
                                                  "underline #777";
                                              }}
                                              onMouseLeave={(e) => {
                                                e.currentTarget.style.fontWeight =
                                                  "300";
                                                e.currentTarget.style.textDecoration =
                                                  "none";
                                              }}
                                              onClick={() => {
                                                const deleteConfirm =
                                                  window.confirm(
                                                    "댓글을 삭제하시겠습니까?"
                                                  );
                                                if (deleteConfirm) {
                                                  DeletePaperCommentsAPI(
                                                    paperData.libraryPostId,
                                                    paperReply.commentId
                                                  );
                                                }
                                              }}
                                            >
                                              삭제
                                            </span>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        boxSizing: "border-box",
                                        width: "100%",
                                        padding: "0 30px",
                                        borderRadius: "20px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          fontFamily: "Pretendard-ExtraLight",
                                          fontSize: "clamp(14px, 2vw, 16px)",
                                          color: "#fff",
                                          width: "100%",
                                          border: "none",
                                          background: "transparent",
                                          resize: "none",
                                          outline: "none",
                                          lineHeight: "1.4",
                                        }}
                                      >
                                        <span style={{ color: "#2cc295" }}>
                                          @{paperComment.writerName}
                                        </span>{" "}
                                        {paperReply.content}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <div style={{ paddingBottom: "30px" }}></div>
                )}

                {paperCommentsToDisplay.length > 0 ? (
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "1000px",
                      marginTop: "40px",
                      marginBottom: "40px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="bottom_btn"
                      style={{}}
                      onClick={() => changePage(1)}
                    >
                      <img
                        src="../img/btn/pageStart.png"
                        alt="pageStart"
                        style={{
                          height: "12px",
                        }}
                      />
                    </button>
                    <button
                      className="bottom_btn"
                      style={{}}
                      onClick={() => changePage(currentPage - 1)}
                    >
                      <img
                        src="../img/btn/pagePrev.png"
                        alt="pagePrev"
                        style={{
                          height: "12px",
                        }}
                      />
                    </button>
                    {Array.from(
                      { length: endPage - startPage + 1 },
                      (_, i) => startPage + i
                    ).map((page) => (
                      <button
                        key={page}
                        className="bottom_tabs"
                        onClick={() => changePage(page)}
                        style={
                          page === currentPage
                            ? {
                                textShadow: "0 0 0.1em, 0 0 0.1em",
                                color: "#2CC295",
                              }
                            : {}
                        }
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="bottom_btn"
                      style={{}}
                      onClick={() => changePage(currentPage + 1)}
                    >
                      <img
                        src="../img/btn/pageNext.png"
                        alt="pageNext"
                        style={{
                          height: "12px",
                        }}
                      />
                    </button>
                    <button
                      className="bottom_btn"
                      style={{}}
                      onClick={() => changePage(totalPages)}
                    >
                      <img
                        src="../img/btn/pageEnd.png"
                        alt="pageNext"
                        style={{
                          height: "12px",
                        }}
                      />
                    </button>
                  </div>
                ) : (
                  <></>
                )}

                {checkAuth >= 1 ? (
                  <form
                    style={{
                      paddingBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        marginBottom: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Pretendard-Bold",
                          fontSize: "16px",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={previewImage}
                          alt="profile"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginRight: "10px",
                            objectFit: "cover",
                          }}
                        />
                        {myData.major}_{myData.name}
                      </div>
                      <div style={{ display: comment.trim() ? "" : "none" }}>
                        <Button
                          type="primary"
                          size="small"
                          title="댓글 등록"
                          onClick={() => {
                            if (comment) {
                              postComments();
                            } else {
                              alert("내용을 작성해주세요.");
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "120px",
                        padding: "10px 15px",
                        borderRadius: "20px",
                        backgroundColor: "#222",
                      }}
                    >
                      <textarea
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: "clamp(14px, 2vw, 16px)",
                          color: "#fff",
                          width: "100%",
                          height: "100%",
                          border: "none",
                          background: "transparent",
                          resize: "none",
                          outline: "none",
                          lineHeight: "1.4",
                        }}
                        placeholder="댓글을 작성해주세요."
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                ) : (
                  <div
                    style={{
                      paddingBottom: "40px",
                    }}
                  >
                    <div
                      style={{
                        boxSizing: "border-box",
                        width: "100%",
                        height: "120px",
                        padding: "10px 15px",
                        borderRadius: "20px",
                        backgroundColor: "#222",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: "clamp(14px, 2vw, 16px)",
                          color: "#777",
                          width: "100%",
                          height: "100%",
                          border: "none",
                          background: "transparent",
                          resize: "none",
                          outline: "none",
                          lineHeight: "1.4",
                        }}
                      >
                        일반회원 이상만 작성 가능합니다.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
