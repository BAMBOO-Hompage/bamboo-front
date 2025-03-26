import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import moment from "moment";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetActivityAPI from "../../api/main-activities/getActivityAPI.tsx";
import PatchActivitiesAPI from "../../api/main-activities/patchActivitiesAPI.tsx";

import "../../App.css";

type Activity = {
  mainActivitiesId: number;
  memberName: string;
  title: string;
  startDate: number[];
  endDate: number[];
  year: number;
  views: number;
  images: string[];
};

export default function ActivityEdit() {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [activityData, setActivityData] = useState<Activity>({
    mainActivitiesId: 0,
    memberName: "",
    title: "",
    startDate: [],
    endDate: [],
    year: 0,
    views: 0,
    images: [],
  });
  const [images, setImages] = useState<any[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);
  const [showNewImages, setShowNewImages] = useState<string[]>([]);

  useEffect(() => {
    GetActivityAPI(searchParams.get("id")).then((data) => {
      setActivityData(data);
      setShowImages(data.images || []);
    });
  }, [searchParams]);

  useEffect(() => {
    if (activityData.title) {
      setValue("Title", activityData.title);
    }
    if (activityData.startDate.length === 3) {
      setValue(
        "StartDate",
        new Date(
          activityData.startDate[0],
          activityData.startDate[1] - 1,
          activityData.startDate[2] + 1
        )
          .toISOString()
          .split("T")[0]
      );
    }
    if (activityData.endDate.length === 3) {
      setValue(
        "EndDate",
        new Date(
          activityData.endDate[0],
          activityData.endDate[1] - 1,
          activityData.endDate[2] + 1
        )
          .toISOString()
          .split("T")[0]
      );
    }
  }, [activityData, setValue]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files; // 선택한 파일들
    let fileLists: File[] = [...images];
    let fileNameLists: string[] = [...showNewImages]; // 기존 저장된 파일명들
    const currentImageCount = showImages.length + fileLists.length;

    for (let i = 0; i < imageLists.length; i++) {
      if (currentImageCount + i >= 10) {
        break; // 최대 10장을 초과하면 추가 중단
      }
      const currentFileName = imageLists[i].name; // 파일명 가져오기
      fileLists.push(imageLists[i]);
      fileNameLists.push(currentFileName);
    }

    setImages(fileLists);
    setShowNewImages(fileNameLists);
  };

  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };
  const handleDeleteNewImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
    setShowNewImages(showNewImages.filter((_, index) => index !== id));
  };

  const onValid = async (e) => {
    console.log(
      e.Title + "\n" + e.StartDate + "~" + e.EndDate + "\n" + showImages,
      "onValid"
    );
    const year = moment(e.StartDate).format("YYYY");

    const formData = new FormData();
    formData.append("title", e.Title);
    formData.append("startDate", e.StartDate);
    formData.append("endDate", e.EndDate);
    formData.append("year", year);
    formData.append("imageUrls", JSON.stringify(showImages)); // images 배열 형식으로 전송
    images.forEach((file) => {
      formData.append("newImages", file); // images 배열 형식으로 전송
    });

    PatchActivitiesAPI(searchParams.get("id"), formData);
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 확인해주세요.");
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
                      window.confirm("수정을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.location.href = "/activity?year=&page=";
                    }
                  }}
                >
                  수정 취소
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
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>제목</div>
                  <input
                    id="title"
                    type="text"
                    defaultValue={activityData.title}
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
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
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
                      defaultValue={
                        activityData.startDate.length === 3
                          ? new Date(
                              activityData.startDate[0],
                              activityData.startDate[1] - 1,
                              activityData.startDate[2] + 1
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
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
                      defaultValue={
                        activityData.endDate.length === 3
                          ? new Date(
                              activityData.endDate[0],
                              activityData.endDate[1] - 1,
                              activityData.endDate[2] + 1
                            )
                              .toISOString()
                              .split("T")[0]
                          : ""
                      }
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
                      accept="image/*"
                      {...register("Image", {})}
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
                  {showImages.length !== 0 || showNewImages.length !== 0 ? (
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
                            alt="delete"
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
                          &emsp;
                          <div>{image}</div>
                        </div>
                      ))}
                      {showNewImages.map((image, id) => (
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
                            alt="delete"
                            style={{ width: "16px", cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteNewImage(id);
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
                          &emsp;
                          <div>{image}</div>
                        </div>
                      ))}
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
                    ></div>
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
