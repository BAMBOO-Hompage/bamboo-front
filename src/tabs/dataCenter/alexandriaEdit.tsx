import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetPaperAPI from "../../api/library-posts/getPaperAPI.tsx";
import PutPapersAPI from "../../api/library-posts/putPapersAPI.tsx";

import "../../App.css";

type Paper = {
  libraryPostId: number;
  member: { studentId: string; name: string };
  paperName: string;
  link: string;
  year: string;
  topic: string;
  tagNames: string[];
  content: string;
};

export default function AlexandriaEdit() {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [paperData, setPaperData] = useState<Paper>({
    libraryPostId: 0,
    paperName: "",
    link: "",
    year: "",
    member: { studentId: "", name: "" },
    topic: "",
    tagNames: [],
    content: "",
  });
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    GetPaperAPI(searchParams.get("id")).then((data) => {
      setPaperData(data);
      setContent(data.content);
    });
  }, [searchParams]);

  useEffect(() => {
    if (paperData.paperName) {
      setValue("Title", paperData.paperName);
    }
    if (paperData.link) {
      setValue("Link", paperData.link);
    }
    if (paperData.year) {
      setValue("Year", paperData.year);
    }
    if (paperData.topic) {
      setValue("Topic", paperData.topic);
    }
    if (paperData.tagNames) {
      setValue("Tag", paperData.tagNames.map((tag) => `#${tag}`).join(" "));
    }
  }, [paperData, setValue]);

  const onValid = (e) => {
    console.log(
      e.Title +
        "\n" +
        e.Link +
        "\n" +
        e.Year +
        "\n" +
        e.Topic +
        "\n" +
        e.Tag +
        "\n" +
        content,
      "onValid"
    );
    var tagList = [];
    if (e.Tag) {
      const tags = e.Tag.split(/\s+/);
      const allStartWithHash = tags.every((tag: string) => tag.startsWith("#"));
      if (!allStartWithHash) {
        alert("모든 태그는 #으로 시작해야 합니다.");
        return;
      }
      const isValid = tags.every((tag: string) => /^#\w+$/.test(tag));
      if (!isValid) {
        alert("태그는 '_'를 제외한 특수문자를 포함할 수 없습니다.");
        return;
      }
      tagList = tags.map((tag: string) => tag.slice(1));
      console.log("유효한 태그 목록:", tagList);
    }

    PutPapersAPI(
      searchParams.get("id"),
      e.Title,
      e.Link,
      parseInt(e.Year),
      e.Topic,
      tagList,
      content
    );
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
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
            maxHeight: "1250px",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              margin: "100px auto",
              padding: "0 20px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "40px",
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
                minHeight: "860px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <form
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="title"
                    className="title"
                    type="text"
                    defaultValue={paperData.paperName}
                    placeholder="제목을 입력해주세요."
                    autoComplete="off"
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      fontFamily: "Pretendard-Bold",
                      fontSize: "28px",
                    }}
                  />
                </div>
                <div
                  style={{
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;논문<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="link"
                    type="text"
                    defaultValue={paperData.link}
                    placeholder="논문 링크를 입력해주세요."
                    autoComplete="off"
                    {...register("Link", {
                      required: "논문 링크를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
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
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;연도<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="year"
                    type="number"
                    defaultValue={paperData.year}
                    placeholder="논문 작성 연도를 입력해주세요."
                    autoComplete="off"
                    {...register("Year", {
                      required: "논문 작성 연도를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
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
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;주제<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="topic"
                    type="text"
                    defaultValue={paperData.topic}
                    placeholder="논문 주제를 입력해주세요."
                    autoComplete="off"
                    {...register("Topic", {
                      required: "논문 주제를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
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
                    maxWidth: "920px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;태그
                  </div>
                  <input
                    id="tag"
                    type="text"
                    defaultValue={paperData.tagNames
                      .map((tag) => `#${tag}`)
                      .join(" ")}
                    placeholder="태그를 추가해보세요.  ex) #zero_shot"
                    autoComplete="off"
                    {...register("Tag", {})}
                    style={{
                      flex: "1",
                      width: "150px",
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
                    boxSizing: "border-box",
                    width: "100%",
                    minHeight: "500px",
                    marginBottom: "20px",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                    padding: "20px",
                  }}
                >
                  <ReactEditor content={content} setContent={setContent} />
                </div>

                <div
                  style={{
                    maxWidth: "1000px",
                    paddingBottom: "20px",
                    display: "flex",
                    justifyContent: "right",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="destructive"
                    size="small"
                    title="취소"
                    onClick={() => {
                      const deleteAdd =
                        window.confirm("작성을 취소하시겠습니까?");
                      if (deleteAdd) {
                        window.location.href = "/alexandria";
                      }
                    }}
                  />
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
