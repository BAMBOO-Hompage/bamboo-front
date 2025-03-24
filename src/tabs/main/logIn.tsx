import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/button.tsx";

import LogInAPI from "../../api/members/logInAPI.tsx";

import "../../App.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFocus("StudentNum"); // react-hook-form의 setFocus 함수 사용
  }, [setFocus]);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const onValid = (e: any) => {
    console.log(e, "onValid");
    LogInAPI(e.StudentNum, e.Password);
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
  };

  const autoPattern = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;

    inputValue = inputValue.replace(/[^0-9]/g, "");
    input.value = inputValue;
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "50%",
          transform: "translate(-50%, 0)",
          width: "100%",
          maxWidth: "1000px",
          display: "flex",
          justifyContent: "center",
          zIndex: "-10",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "450px",
            display: "flex",
            justifyContent: "space-between",
            zIndex: "-10",
          }}
        >
          <div
            style={{
              marginTop: "20px",
              width: "50%",
              height: "80px",
              borderRadius: "1171px",
              background: "#297FB8",
              filter: "blur(110px)",
            }}
          ></div>
          <div
            style={{
              width: "50%",
              height: "80px",
              borderRadius: "1171px",
              background: "#2CC295",
              filter: "blur(110px)",
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "460px",
          margin: "25vh auto",
        }}
      >
        <div
          style={{
            boxSizing: "border-box",
            maxWidth: "460px",
            padding: "0 20px",
            marginBottom: "100px",
          }}
        >
          <img
            src="..\img\main_logo_neon.png"
            alt="login_logo"
            style={{ width: "100%" }}
          />
        </div>

        <div
          style={{
            boxSizing: "border-box",
            maxWidth: "460px",
            padding: "0 20px",
            margin: "0 auto",
          }}
        >
          <form
            style={{ textAlign: "left", width: "100%" }}
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <div
              style={{
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <input
                  id="studentNum"
                  placeholder="학 번"
                  type="text"
                  autoComplete="off"
                  onKeyUp={() => {
                    autoPattern("studentNum");
                  }}
                  {...register("StudentNum", {
                    required: "학번 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "250px",
                    height: "40px",
                    margin: "0 20px",
                    borderRadius: "10px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Pretendard-Regular",
                    fontSize: "clamp(14px, 2vw, 16px)",
                    color: "#777",
                    marginRight: "20px",
                  }}
                >
                  @sangmyung.kr
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  id="password"
                  placeholder="비밀번호"
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("Password", {
                    required: "이메일 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    height: "40px",
                    margin: "0 20px",
                    borderRadius: "10px",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                />
                {isPasswordVisible ? (
                  <img
                    src="../img/icon/eye_open.png"
                    alt="eye_open"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                ) : (
                  <img
                    src="../img/icon/eye_close.png"
                    alt="eye_close"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "20px",
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
              </div>
              <div
                style={{
                  maxWidth: "400px",
                  height: "20px",
                  color: "#FF5005",
                  fontSize: "12px",
                  textAlign: "left",
                }}
              >
                {errors.StudentNum ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.StudentNum.message)}
                  </span>
                ) : errors.Password ? (
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errors.Password.message)}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                margin: "10px 0",
                textAlign: "center",
              }}
            >
              <button
                type="submit"
                style={{
                  maxWidth: "100%",
                  padding: "0",
                  border: "none",
                  backgroundColor: "transparent",
                }}
              >
                <div
                  style={{
                    maxWidth: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button type="primary" size="large" title="로그인" />
                </div>
              </button>
            </div>
          </form>
          <div
            style={{
              maxWidth: "400px",
              marginTop: "40px",
              marginBottom: "150px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "14px",
                color: "#777",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.fontWeight = "600";
                e.currentTarget.style.textDecoration = "underline #777";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fontWeight = "300";
                e.currentTarget.style.textDecoration = "none";
              }}
              onClick={() => {
                setIsPopupOpen(!isPopupOpen);
              }}
            >
              비밀번호 찾기
            </div>
            <a
              href="/privacyPolicy"
              style={{
                fontFamily: "Pretendard-Regular",
                fontSize: "14px",
                color: "#777",
                textDecorationLine: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.fontWeight = "600";
                e.currentTarget.style.textDecoration = "underline #777";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.fontWeight = "300";
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              회원가입
            </a>
          </div>
        </div>
      </div>

      {/* 팝업 컴포넌트 */}
      {isPopupOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "400px",
            backgroundColor: "#111015",
            padding: "30px 20px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              fontFamily: "Pretendard-Regular",
              fontSize: "16px",
              color: "#fff",
              marginBottom: "30px",
              lineHeight: "1.5",
            }}
          >
            분실한 비밀번호는 아래 연락처로 연락 부탁드립니다.
            <br />
            <strong>010-9242-8053</strong>
          </div>
          <div style={{ width: "80px", margin: "0 auto" }}>
            <Button
              type="primary"
              size="xsmall"
              title="닫기"
              onClick={() => {
                setIsPopupOpen(!isPopupOpen);
              }}
            />
          </div>
        </div>
      )}
      {/* 팝업 배경 */}
      {isPopupOpen && (
        <div
          onClick={() => {
            setIsPopupOpen(!isPopupOpen);
          }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            padding: "0 20px",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        />
      )}
    </div>
  );
}
