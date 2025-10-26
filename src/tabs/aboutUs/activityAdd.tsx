import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import moment from "moment";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import PostActivitiesAPI from "../../api/main-activities/postActivitiesAPI.tsx";
import "../../App.css";

export default function ActivityAdd() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);

  // 중복 제출 방지
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [images, setImages] = useState<File[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);

  const handleAddImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageLists = event.target.files;
    if (!imageLists || imageLists.length === 0) return;

    let fileLists: File[] = [...images];
    let fileNameLists: string[] = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      fileLists.push(imageLists[i]);
      fileNameLists.push(imageLists[i].name);
    }

    if (fileNameLists.length > 10) {
      fileLists = fileLists.slice(0, 10);
      fileNameLists = fileNameLists.slice(0, 10);
    }

    setImages(fileLists);
    setShowImages(fileNameLists);

    // 같은 파일 다시 선택 가능하도록 리셋
    event.target.value = "";
  };

  const handleDeleteImage = (id: number) => {
    setImages(images.filter((_, index) => index !== id));
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  const onValid = async (e: any) => {
    // ✅ 중복 제출 가드
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const MAX_FILE_SIZE_MB = 10;
      const year = moment(e.StartDate).format("YYYY");

      const oversizedFile = images.find(
        (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024
      );
      if (oversizedFile) {
        alert(
          `'${oversizedFile.name}' 파일은 10MB를 초과하여 업로드할 수 없습니다.`
        );
        return;
      }

      const formData = new FormData();
      formData.append("title", e.Title);
      formData.append("startDate", e.StartDate);
      formData.append("endDate", e.EndDate);
      formData.append("year", year);
      images.forEach((file) => {
        formData.append("images", file);
      });

      await PostActivitiesAPI(formData);
    } finally {
      // ✅ 항상 해제 (추가 alert 없음)
      setIsSubmitting(false);
    }
  };

  const onInvalid = (e: unknown) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
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
              padding: "0 20px",
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
                  fontFamily: "Suit-Regular",
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
                  fontFamily: "Suit-Regular",
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
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontFamily: "Suit-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                활동 사진 업로드
              </div>

              <form style={{ width: "100%", marginTop: "40px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
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
                      fontFamily: "Suit-Light",
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
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>기간</div>
                  <div
                    style={{
                      position: "relative",
                      width: "620px",
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
                        fontFamily: "Suit-Light",
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
                        fontFamily: "Suit-Light",
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
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
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
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      multiple
                      accept="image/*"
                      {...register("Image")}
                      onChange={handleAddImages}
                      onClick={(e) => {
                        (e.target as HTMLInputElement).value = "";
                      }}
                    />
                    <img
                      src="../../img/btn/search_enabled.png"
                      alt="search"
                      style={{ width: "25px" }}
                    />
                    &emsp;사진 선택 (최대 10장)
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
                        height: "220px",
                        padding: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    >
                      {showImages.map((image, id) => {
                        const sizeMB = (images[id]?.size || 0) / (1024 * 1024);
                        return (
                          <div
                            key={id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Suit-Light",
                              fontSize: "14px",
                              marginBottom: "10px",
                              color: "#ccc",
                            }}
                          >
                            <img
                              src="../../img/btn/delete_disabled.png"
                              alt="delete"
                              style={{ width: "16px", cursor: "pointer" }}
                              onClick={() => handleDeleteImage(id)}
                              onMouseEnter={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "../../img/btn/delete_enabled.png";
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "../../img/btn/delete_disabled.png";
                              }}
                            />
                            &emsp;
                            <span style={{ color: "#fff" }}>{image}</span>
                            &nbsp;
                            <span style={{ color: "#aaa", fontSize: "13px" }}>
                              ({sizeMB.toFixed(2)} MB)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      style={{
                        width: "620px",
                        height: "220px",
                        padding: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    />
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
                    type={isSubmitting ? "disabled" : "primary"} // 중복 제출 방지
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
