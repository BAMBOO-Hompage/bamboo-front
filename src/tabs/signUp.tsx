import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../components/button.tsx";
import "../App.css";

export default function Signup() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [validEmail, setValidEmail] = useState(false);

  const onValid = (e) => {
    console.log(e, "onValid");
    window.location = "/login";
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  // 유효성 검사 패턴
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div>
      <div
        style={{
          textAlign: "left",
          position: "fixed",
          top: "13px",
          left: "70px",
          width: "100%",
          zIndex: "2",
        }}
      >
        <Link to="/">
          <img
            src="../img/small_logo.png"
            alt="small_logo"
            style={{ width: "80px", marginTop: "5px" }}
          />
        </Link>
      </div>

      <div
        style={{
          marginTop: "100px",
          marginBottom: "50px",
          fontFamily: "Pretendard-ExtraBold",
          fontSize: "35px",
        }}
      >
        회원가입
      </div>

      <div style={{ width: "400px", margin: "0 auto" }}>
        <form style={{ textAlign: "left", width: "400px", margin: "0 auto" }}>
          <div
            style={{
              margin: "0 auto",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "email",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                이메일
              </label>
              <input
                id="email"
                placeholder="ex) 202010770@sangmyung.kr"
                type="text"
                autoComplete="new-password"
                {...register("Email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: emailPattern,
                    message: "유효한 이메일 주소를 입력해주세요.",
                  },
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              <button
                type="button"
                style={{
                  width: "70px",
                  position: "absolute",
                  left: "400px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "12px",
                  backgroundColor: "#2CC295",
                  color: "#fff",
                  textAlign: "center",
                  borderRadius: "20px",
                  border: "none",
                  padding: "6px",
                  marginLeft: "5px",
                  cursor: "pointer",
                  zIndex: "0",
                }}
                onClick={() => setValidEmail(true)}
              >
                이메일 인증
              </button>
              {errors.Email ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.Email ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.Email.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {validEmail ? (
              <div
                style={{
                  width: "400px",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <input
                  id="code"
                  placeholder="인증코드를 입력해주세요."
                  type="text"
                  {...register("Code", {
                    required: "인증코드를 입력해주세요.",
                  })}
                  style={{ width: "360px", height: "30px", fontSize: "16px" }}
                />
                <button
                  type="button"
                  style={{
                    width: "70px",
                    position: "absolute",
                    left: "400px",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "12px",
                    backgroundColor: "#2CC295",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "none",
                    padding: "6px",
                    marginLeft: "5px",
                    cursor: "pointer",
                    zIndex: "0",
                  }}
                  onClick={() => <></>}
                >
                  확인
                </button>
              </div>
            ) : (
              <></>
            )}

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "password",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                비밀번호
              </label>
              <input
                id="password"
                placeholder=""
                type="password"
                {...register("Password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "영어, 숫자, 특수문자 포함 8-12자리를 입력해주세요.",
                  },
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.Password ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.Password ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.Password.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "rePassword",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                비밀번호 확인
              </label>
              <input
                id="RePassword"
                placeholder=""
                type="password"
                {...register("RePassword", {
                  required: "비밀번호를 확인해주세요.",
                  validate: (value) =>
                    value === getValues("Password") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.RePassword ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.RePassword ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.RePassword.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "name",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                이 름
              </label>
              <input
                id="name"
                placeholder="ex) 맹의현"
                type="text"
                autoComplete="none"
                {...register("Name", {
                  required: "이름을 입력해주세요.",
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.Name ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.Name ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.Name.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "major",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                학 과
              </label>
              <input
                id="major"
                placeholder="ex) 휴먼지능정보공학전공"
                type="text"
                autoComplete="none"
                {...register("Major", {
                  required: "학과를 입력해주세요.",
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.Major ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.Major ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.Major.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "studentNum",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                학 번
              </label>
              <input
                id="studentNum"
                placeholder="ex) 202010770"
                type="text"
                autoComplete="none"
                {...register("StudentNum", {
                  required: "학번을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]{9,9}$/,
                    message: "학번은 9글자를 입력해주세요.",
                  },
                })}
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.StudentNum ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.StudentNum ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.StudentNum.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                style={{
                  htmlFor: "phoneNum",
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "16px",
                  color: "#fff",
                  width: "100px",
                  paddingLeft: "20px",
                }}
              >
                전화번호
              </label>
              <input
                id="phoneNum"
                type="text"
                autoComplete="none"
                {...register("PhoneNum", {
                  required: "전화번호를 입력해주세요.",
                  minLength: {
                    value: 11,
                    message: "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                  },
                  maxLength: {
                    value: 11,
                    message: "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                  },
                })}
                placeholder="ex) 01012345678"
                style={{ width: "280px", height: "30px", fontSize: "16px" }}
              />
              {errors.PhoneNum ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    {errors.PhoneNum ? (
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "385px",
                      backgroundColor: "#171717",
                      borderTopLeftRadius: "30px",
                      borderTopRightRadius: "30px",
                      borderBottomRightRadius: "30px",
                      padding: "10px 20px",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        color: "#fff",
                        fontFamily: "Pretendard-Light",
                        fontSize: "13px",
                        textAlign: "left",
                      }}
                    >
                      {errors.PhoneNum.message}
                    </span>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div
            style={{
              width: "390px",
              margin: "10px auto",
              textAlign: "center",
            }}
          >
            <Button
              type="primary"
              size="large"
              title="계정 생성"
              onClick={handleSubmit(onValid, onInvalid)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
