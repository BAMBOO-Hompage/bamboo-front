import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../components/button.tsx";

import VerificationRequestsAPI from "../api/emails/verificationReauestsAPI.tsx";
import VerificationsAPI from "../api/emails/verificationsAPI.tsx";
import SignupAPI from "../api/members/signUpAPI.tsx";

import "../App.css";

export default function Signup() {
  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    getValues: getValuesSignUp,
    formState: { errors: errorsSignUp },
  } = useForm();
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: errorsEmail },
  } = useForm();
  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
  } = useForm();

  const [validEmail, setValidEmail] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [checkedEmail, setCheckedEmail] = useState(false);

  const onEmailValid = (e) => {
    console.log(e, "onEmailValid");
    VerificationRequestsAPI(e.Email);
    setValidEmail(true);
    setEmail(e.Email);
  };
  const onEmailInvalid = (e) => {
    console.log(e, "onEmailInvalid");
    alert("이메일을 확인해주세요.");
  };

  const onVerificationValid = (e) => {
    console.log(e, "onVerificationValid");
    VerificationsAPI(email, e.Code)
      .then((result) => {
        if (result === 1) {
          setCheckedEmail(true);
        } else {
          setCheckedEmail(false);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
  };
  const onVerificationInvalid = (e) => {
    console.log(e, "onVerificationInvalid");
    alert("인증 번호를 다시 입력해주세요.");
  };

  const onValid = (e) => {
    console.log(e, "onValid");
    if (checkedEmail) {
      SignupAPI(email, e.Password, e.Name, e.Major, e.StudentNum, e.PhoneNum);
    } else {
      alert("이메일 인증을 진행해주세요.");
    }
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  // 유효성 검사 패턴
  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.,/])[a-zA-Z\d!@#$%^&*.,/]{8,12}$/;
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
            src="../img/nav_logo.png"
            alt="nav_logo"
            style={{ width: "80px", marginTop: "5px" }}
          />
        </Link>
      </div>

      <div
        style={{
          marginTop: "80px",
          marginBottom: "50px",
          fontFamily: "Pretendard-ExtraBold",
          fontSize: "35px",
        }}
      >
        회원가입
      </div>

      <div style={{ width: "500px", margin: "0 auto" }}>
        <div style={{ textAlign: "left", width: "100%", margin: "0 auto" }}>
          <div
            style={{
              margin: "0 auto",
              marginBottom: "30px",
            }}
          >
            <form
              style={{
                width: "100%",
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
                htmlFor="email"
                style={{
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
                {...registerEmail("Email", {
                  required: "이메일을 입력해주세요.",
                  pattern: {
                    value: emailPattern,
                    message: "유효한 이메일 주소를 입력해주세요.",
                  },
                })}
                style={{
                  width: errorsEmail.Email ? "320px" : "270px",
                  height: "30px",
                  margin: "0 20px",
                  fontSize: "16px",
                }}
              />

              {errorsEmail.Email ? (
                <>
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    <img
                      src="..\img\btn\fail.png"
                      alt="fail"
                      style={{ width: "15px" }}
                    />
                  </div>
                  <div
                    style={{
                      width: "150px",
                      position: "absolute",
                      bottom: "25px",
                      left: "485px",
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
                      {String(errorsEmail.Email.message)}
                    </span>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  style={{
                    width: "70px",
                    position: "absolute",
                    right: "10px",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "12px",
                    backgroundColor: "#2CC295",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "none",
                    padding: "5px",
                    marginLeft: "5px",
                    cursor: "pointer",
                    zIndex: "0",
                  }}
                  onClick={handleSubmitEmail(onEmailValid, onEmailInvalid)}
                >
                  {`이메일 인증`}
                </button>
              )}
            </form>
            {validEmail ? (
              <form
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
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <input
                  id="code"
                  placeholder="인증코드를 입력해주세요."
                  type="text"
                  {...registerVerification("Code", {
                    required: "인증코드를 입력해주세요.",
                  })}
                  style={{
                    width: "390px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />

                {checkedEmail ? (
                  <div
                    style={{
                      width: "28px",
                      position: "absolute",
                      top: "10px",
                      right: "0px",
                    }}
                  >
                    <img
                      src="..\img\btn\check.png"
                      alt="check"
                      style={{ width: "15px" }}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    style={{
                      width: "70px",
                      position: "absolute",
                      right: "10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "12px",
                      backgroundColor: "#2CC295",
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "none",
                      padding: "5px",
                      marginLeft: "5px",
                      cursor: "pointer",
                      zIndex: "0",
                    }}
                    onClick={handleSubmitVerification(
                      onVerificationValid,
                      onVerificationInvalid
                    )}
                  >
                    확인
                  </button>
                )}
              </form>
            ) : (
              <></>
            )}
            <form>
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
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
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
                  {...registerSignUp("Password", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "영어, 숫자, 특수문자 포함 8-12자리를 입력해주세요.",
                    },
                  })}
                  style={{
                    width: errorsSignUp.Password ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.Password ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        bottom: "25px",
                        left: "485px",
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
                        {String(errorsSignUp.Password.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="rePassword"
                  style={{
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
                  id="rePassword"
                  placeholder=""
                  type="password"
                  {...registerSignUp("RePassword", {
                    required: "비밀번호를 확인해주세요.",
                    validate: (value) =>
                      value === getValuesSignUp("Password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  style={{
                    width: errorsSignUp.RePassword ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.RePassword ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      {errorsSignUp.RePassword ? (
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
                        left: "485px",
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
                        {String(errorsSignUp.RePassword.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="name"
                  style={{
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
                  placeholder=""
                  type="text"
                  autoComplete="none"
                  {...registerSignUp("Name", {
                    required: "이름을 입력해주세요.",
                  })}
                  style={{
                    width: errorsSignUp.Name ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.Name ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        bottom: "25px",
                        left: "485px",
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
                        {String(errorsSignUp.Name.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="major"
                  style={{
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
                  {...registerSignUp("Major", {
                    required: "학과를 입력해주세요.",
                  })}
                  style={{
                    width: errorsSignUp.Major ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.Major ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        bottom: "25px",
                        left: "485px",
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
                        {String(errorsSignUp.Major.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="studentNum"
                  style={{
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
                  {...registerSignUp("StudentNum", {
                    required: "학번을 입력해주세요.",
                    pattern: {
                      value: /^[0-9]{9,9}$/,
                      message: "학번은 9글자를 입력해주세요.",
                    },
                  })}
                  style={{
                    width: errorsSignUp.StudentNum ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.StudentNum ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        bottom: "25px",
                        left: "485px",
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
                        {String(errorsSignUp.StudentNum.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="phoneNum"
                  style={{
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
                  {...registerSignUp("PhoneNum", {
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
                  style={{
                    width: errorsSignUp.PhoneNum ? "320px" : "340px",
                    height: "30px",
                    margin: "0 20px",
                    fontSize: "16px",
                  }}
                />
                {errorsSignUp.PhoneNum ? (
                  <>
                    <div
                      style={{
                        width: "28px",
                        position: "absolute",
                        top: "10px",
                        right: "0px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      style={{
                        width: "150px",
                        position: "absolute",
                        bottom: "25px",
                        left: "485px",
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
                        {String(errorsSignUp.PhoneNum.message)}
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
          <div
            style={{
              width: "500px",
              margin: "10px 0",
              padding: "0",
              display: "flex",
              justifyContent: "right",
              border: "none",
            }}
          >
            <Button
              type="primary"
              size="XLarge"
              title="계정 생성"
              onClick={handleSubmitSignUp(onValid, onInvalid)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
