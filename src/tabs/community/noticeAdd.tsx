import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import MDEditor from "@uiw/react-md-editor";
import "react-markdown-editor-lite/lib/index.css";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

export default function PostAdd() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [content, setContent] = useState<string>("");
  const [showImages, setShowImages] = useState<string[]>([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files; // 선택한 파일들
    let fileNameLists: string[] = [...showImages]; // 기존 저장된 파일명들

    for (let i = 0; i < imageLists.length; i++) {
      const currentFileName: string = imageLists[i].name; // 파일명 가져오기
      fileNameLists.push(currentFileName);
    }

    if (fileNameLists.length > 4) {
      fileNameLists = fileNameLists.slice(0, 4); // 최대 10개 제한
    }

    setShowImages(fileNameLists); // 파일명 리스트 저장
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
    window.location.href = "/notice";
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
            height: "1250px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "1100px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                공지사항
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => {
                    const deleteAdd =
                      window.confirm("작성을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.location.href = "/notice";
                    }
                  }}
                >
                  작성 취소
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
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                공지 작성
              </div>

              <form style={{ width: "100%", marginTop: "40px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>분류</div>
                  <div
                    style={{
                      width: "620px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      defaultValue={String(localStorage.getItem("postList"))}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        border: "none",
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color: "#2CC295",
                        cursor: "pointer",
                      }}
                      {...register("Category", {
                        required: "카테고리를 선택해주세요.",
                        validate: (value) =>
                          value !== "전체" || "카테고리를 선택해주세요.",
                      })}
                    >
                      <option
                        disabled
                        value="전체"
                        style={{ background: "#111015", color: "#ddd" }}
                      >
                        카테고리 선택
                      </option>
                      <option
                        value="대회 및 세미나"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        대회 및 세미나
                      </option>
                      <option
                        value="동아리 공지"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        동아리 공지
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
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
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                >
                  <div>내용</div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
                      height: "500px",
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      padding: "20px",
                    }}
                  >
                    <div data-color-mode="dark">
                      <MDEditor
                        height={460}
                        value={content}
                        onChange={(text) => {
                          setContent(text || "");
                        }}
                        className="custom-md-editor"
                        preview={"edit"}
                        style={{
                          resize: "none",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>

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
                  <div>사진 첨부</div>
                  <label
                    htmlFor="fileInput"
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      border: "none",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onChange={handleAddImages}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{
                        display: "none",
                      }}
                      multiple
                      {...register("Image", {})}
                    />
                    <img
                      src="../../img/btn/search_enabled.png"
                      style={{ width: "25px" }}
                    />
                    &emsp;사진 선택 (최대 4장)
                  </label>
                  <input type="text" style={{ display: "none" }} />
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  {showImages.length !== 0 ? (
                    <div
                      style={{
                        width: "620px",
                        height: "110px",
                        padding: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    >
                      {showImages.map((image, id) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Pretendard-Light",
                            fontSize: "14px",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src="../../img/btn/delete_disabled.png"
                            style={{ width: "16px", cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteImage(id);
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_enabled.png";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_disabled.png";
                            }}
                          />
                          &emsp;{image}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
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
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
