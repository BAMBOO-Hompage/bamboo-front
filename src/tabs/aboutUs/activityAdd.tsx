import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import moment from "moment";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import ImageSlider from "../../components/imageSlider.tsx";

import ActivityData from "../../mockup_data/activity_data.tsx";
import "../../App.css";

const activityData = ActivityData();

export default function Activity() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showImages, setShowImages] = useState<string[]>([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files; // 선택한 파일들
    let fileNameLists: string[] = [...showImages]; // 기존 저장된 파일명들

    for (let i = 0; i < imageLists.length; i++) {
      const currentFileName: string = imageLists[i].name; // 파일명 가져오기
      fileNameLists.push(currentFileName);
    }

    if (fileNameLists.length > 10) {
      fileNameLists = fileNameLists.slice(0, 10); // 최대 10개 제한
    }

    setShowImages(fileNameLists); // 파일명 리스트 저장
  };

  const onValid = (e) => {
    console.log(e.Title + "\n" + showImages, "onValid");
    alert("\n제목 : " + e.Title + "\n사진 : \n" + showImages);
    window.location.href = "/activity";
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
      <Nav type="aboutUs" />
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
            height: "1000px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              height: "850px",
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
                주요 활동
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
                      window.location.href = "/activity";
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
                paddingLeft: "40px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  활동 사진 업로드
                </div>
              </div>
              <div
                style={{
                  width: "780px",
                  marginTop: "40px",
                }}
              >
                <form style={{ width: "100%" }}>
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
                        width: "680px",
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
                      alignItems: "center",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "18px",
                    }}
                  >
                    <div>기간</div>
                    <div
                      style={{
                        position: "relative",
                        width: "640px",
                        height: "40px",
                        padding: "0 20px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="date"
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: "18px",
                          width: "130px",
                        }}
                        {...register("StartDate", {
                          required: "시작일을 입력해주세요.",
                        })}
                      />
                      ~
                      <input
                        type="date"
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: "18px",
                          marginLeft: "20px",
                          width: "130px",
                        }}
                        {...register("EndDate", {
                          required: "종료일을 입력해주세요.",
                        })}
                      />
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
                        width: "680px",
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
                      &emsp;사진 선택 (최대 10장)
                    </label>
                    <input type="text" style={{ display: "none" }} />
                  </div>
                  {showImages.length !== 0 ? (
                    <div
                      style={{
                        width: "640px",
                        height: "220px",
                        padding: "20px",
                        marginBottom: "30px",
                        marginLeft: "100px",
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
                          />
                          &emsp;{image}
                          {/* <div
                            style={{
                              fontFamily: "Pretnendard-Light",
                              fontSize: "16px",
                            }}
                          >
                            &emsp;{image}
                          </div> */}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "640px",
                        height: "220px",
                        padding: "20px",
                        marginBottom: "30px",
                        marginLeft: "100px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    ></div>
                  )}

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
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
