import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import MarkdownIt from "markdown-it";
import MDEditor from "@uiw/react-md-editor";
import "react-markdown-editor-lite/lib/index.css";
import ReactMarkdown from "react-markdown";
import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import MarkdownEditor from "../../components/MarkdownPost.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import PostData from "../../mockup_data/post_data.tsx";
import "../../App.css";

export default function PostAdd() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState("");
  const [showImages, setShowImages] = useState([]);

  const data = PostData();

  const postId = localStorage.getItem("postId");
  const currentPost = data.filter((post) => postId == post.id)[0];

  const mdParser = new MarkdownIt();

  const handleEditorChange = (text) => {
    setContent(text);
  };

  const handleAddImages = (event) => {
    console.log("1");
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 4) {
      imageUrlLists = imageUrlLists.slice(0, 4);
    }

    setShowImages(imageUrlLists);
  };

  const onValid = (e) => {
    console.log(
      e.Category + "\n" + e.Title + "\n" + content + "\n" + showImages,
      "onValid"
    );
    alert(
      "카테고리 : " +
        e.Category +
        "\n제목 : " +
        e.Title +
        "\n내용 : \n" +
        content +
        "\n사진 : \n" +
        showImages
    );

    window.location = "/applyStudy2";
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  // X버튼 클릭 시 이미지 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <div>
      <Nav type="study" />
      <div id="background" className="background">
        <div style={{ height: "200vh", display: "flex", padding: "100px 0" }}>
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
              width: "400px",
              borderRight: "1px solid #444",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: "140px",
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#fff",
                position: "absolute",
                right: "50px",
              }}
            >
              스터디 모집
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                }}
              >
                <div
                  className="post_tabs"
                  onClick={() => {
                    const deleteAdd =
                      window.confirm("작성을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.location = "/postBoard";
                    }
                  }}
                >
                  작성 취소
                </div>
              </div>
            </div>
          </motion.div>

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
              width: "1120px",
              heidht: "100%",
              textAlign: "left",
            }}
          >
            <div style={{ width: "810px", position: "absolute", left: "60px" }}>
              <div
                style={{
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                모집글 작성
              </div>

              <form style={{ width: "100%", margin: "35px 0" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  <div>제목</div>
                  <input
                    id="title"
                    type="text"
                    placeholder="제목을 입력해주세요."
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "85%",
                      height: "15px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                    }}
                  />
                  <input type="text" style={{ display: "none" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                  }}
                >
                  <div style={{ paddingTop: "5px" }}>내용</div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "85%",
                      height: "600px",
                      borderRadius: "20px",
                      resize: "none",
                      border: "none",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "15px",
                      color: "#fff",
                      lineHeight: "22px",
                      padding: "20px",
                    }}
                  >
                    <div data-color-mode="dark">
                      <MDEditor
                        height={560}
                        value={content}
                        onChange={(text) => {
                          setContent(text);
                        }}
                        className="custom-md-editor"
                        preview={"edit"}
                        style={{
                          resize: "none",
                          backgroundColor: "transparent",
                          color: "#fff",
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        <BottomInfo />
      </div>
    </div>
  );
}
