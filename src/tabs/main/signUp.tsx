import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Button from "../../components/button.tsx";

import ExistsAPI from "../../api/members/existsAPI.tsx";
import VerificationRequestsAPI from "../../api/emails/verificationReauestsAPI.tsx";
import VerificationsAPI from "../../api/emails/verificationsAPI.tsx";
import SignupAPI from "../../api/members/signUpAPI.tsx";

import "../../App.css";

const majors = [
  "휴먼지능정보공학전공",
  "컴퓨터과학전공",
  "핀테크·빅데이터융합·스마트생산전공",
  "지능IOT융합전공",
  "애니메이션전공",
  "전기공학전공",
  "한일문화콘텐츠전공",
  "생명공학전공",
  "화공신소재전공",
  "화학에너지공학전공",
  "기타",
];

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
    setFocus,
    formState: { errors: errorsEmail },
  } = useForm();
  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
  } = useForm();
  useEffect(() => {
    setFocus("StudentNum");
  }, [setFocus]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [timer, setTimer] = useState(600); // 10분 (초 단위)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [studentNum, setStudentNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState("학과 선택");

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (timer === 0) setIsTimerActive(false);
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const startTimer = () => {
    setTimer(600); // 10분
    setIsTimerActive(true);
  };

  const onEmailValid = async (e) => {
    var studentNumToEmail = `${e.StudentNum}@sangmyung.kr`;
    const handleVerification = async () => {
      const exists = await ExistsAPI(e.StudentNum);
      if (exists) {
        alert("이미 존재하는 학번입니다. 로그인을 진행해주세요.");
        return;
      }

      const success = await VerificationRequestsAPI(studentNumToEmail);
      if (success) {
        setValidEmail(true);
        startTimer();
        setStudentNum(e.StudentNum);
        setEmail(studentNumToEmail);
      }
    };
    handleVerification();
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

  const onValid = async (e) => {
    e.PhoneNum = e.PhoneNum.replace(/-/g, "");
    if (checkedEmail) {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        console.log(e, "onValid");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await SignupAPI(
          email,
          e.Password,
          e.Name,
          e.Major,
          studentNum,
          e.PhoneNum
        );
      } catch (error) {
        console.error("회원가입 실패:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("이메일 인증을 진행해주세요.");
    }
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const handleChange = (e) => {
    setSelectedMajor(e.target.value);
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

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.,/])[a-zA-Z\d!@#$%^&*.,/]{8,24}$/;

  const autoSeparate = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement | null;

    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;

    // 숫자가 아닌 문자 제거
    inputValue = inputValue.replace(/[^0-9]/g, "");
    // 올바른 위치에 대시 추가
    if (inputValue.length > 3 && inputValue.charAt(3) !== "-") {
      inputValue = inputValue.slice(0, 3) + "-" + inputValue.slice(3);
    }
    if (inputValue.length > 8 && inputValue.charAt(8) !== "-") {
      inputValue = inputValue.slice(0, 8) + "-" + inputValue.slice(8);
    }
    input.value = inputValue;
  };

  return (
    <div>
      <div
        style={{
          textAlign: "left",
          position: "absolute",
          top: "13px",
          left: "6%",
          zIndex: "2",
        }}
      >
        <Link to="/">
          <img
            src="../img/nav_logo.png"
            alt="nav_logo"
            style={{ width: "100px", height: "30px" }}
          />
        </Link>
      </div>

      <div
        style={{
          paddingTop: "20vh",
          marginBottom: "60px",
          fontFamily: "Pretendard-ExtraBold",
          fontSize: "clamp(26px, 3.8vw, 30px)",
        }}
      >
        회원가입
      </div>

      <div style={{ maxWidth: "500px", padding: "0 20px", margin: "0 auto" }}>
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
                htmlFor="studentNum"
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "clamp(14px, 2.2vw, 18px)",
                  color: "#fff",
                  width: "120px",
                  minWidth: "70px",
                  paddingLeft: "20px",
                }}
              >
                이메일
              </label>
              <input
                id="studentNum"
                placeholder="학번 입력"
                type="text"
                autoComplete="off"
                onKeyUp={() => {
                  autoPattern("studentNum");
                }}
                disabled={checkedEmail}
                {...registerEmail("StudentNum", {
                  required: "학번을 입력해주세요.",
                  pattern: {
                    value: /^[0-9]{9,9}$/,
                    message: "학번 9자리만 입력해주세요.",
                  },
                })}
                style={{
                  width: "100%",
                  maxWidth: "160px",
                  height: "30px",
                  margin: "0 10px",
                  color: checkedEmail ? "#777" : "#fff",
                }}
              />
              <div
                style={{
                  width: "90px",
                  marginRight: "10px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "12px",
                  color: "#777",
                }}
              >
                @sangmyung.kr
              </div>
              {errorsEmail.StudentNum ? (
                <div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "80px",
                      paddingLeft: "40px",
                    }}
                  >
                    <img
                      src="..\img\btn\fail.png"
                      alt="fail"
                      style={{ width: "15px" }}
                    />
                  </div>
                  <div
                    className="signUpError"
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
                      {String(errorsEmail.StudentNum.message)}
                    </span>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  style={{
                    width: "70px",
                    minWidth: "70px",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "12px",
                    backgroundColor: "#2CC295",
                    color: "#fff",
                    textAlign: "center",
                    borderRadius: "20px",
                    border: "none",
                    padding: "5px",
                    marginRight: "10px",
                    cursor: "pointer",
                    zIndex: "0",
                    display: checkedEmail ? "none" : "block",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.8";
                  }}
                  onClick={handleSubmitEmail(onEmailValid, onEmailInvalid)}
                >
                  {isTimerActive ? "재전송" : "이메일 인증"}
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
                  marginBottom: "15px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <input
                  id="code"
                  placeholder="인증코드를 입력하고 확인을 눌러주세요."
                  type="text"
                  disabled={checkedEmail}
                  autoComplete="off"
                  {...registerVerification("Code", {
                    required: "인증코드를 입력해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "30px",
                    margin: "0 10px 0 20px",
                    color: checkedEmail ? "#777" : "#fff",
                  }}
                />
                {isTimerActive && !checkedEmail ? (
                  <div
                    style={{
                      width: "40px",
                      marginRight: "10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                      color: "#777",
                    }}
                  >
                    {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(
                      2,
                      "0"
                    )}`}
                  </div>
                ) : (
                  <div
                    style={{
                      width: "40px",
                      marginRight: "10px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                      color: "#777",
                    }}
                  ></div>
                )}
                {checkedEmail ? (
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "80px",
                      paddingLeft: "40px",
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
                      minWidth: "70px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "12px",
                      backgroundColor: "#2CC295",
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "none",
                      padding: "5px",
                      marginRight: "10px",
                      cursor: "pointer",
                      zIndex: "0",
                      display: checkedEmail ? "none" : "block",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.8";
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
                  marginBottom: "15px",
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
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  비밀번호
                </label>
                <input
                  id="password"
                  placeholder="비밀번호 입력"
                  type={isPasswordVisible ? "text" : "password"}
                  autoComplete="off"
                  {...registerSignUp("Password", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "영어, 숫자, 특수문자 포함 8-24자리를 입력해주세요.",
                    },
                  })}
                  style={{
                    width: "100%",
                    maxWidth: errorsSignUp.Password ? "265px" : "295px",
                    height: "30px",
                    margin: "0 20px 0 10px",
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
                      marginRight: "10px",
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
                      marginRight: "10px",
                    }}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                )}
                {errorsSignUp.Password ? (
                  <div>
                    <div
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      className="signUpError"
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
                  </div>
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
                  marginBottom: "15px",
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
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  비밀번호 확인
                </label>
                <input
                  id="rePassword"
                  placeholder="비밀번호 확인"
                  type={isRePasswordVisible ? "text" : "password"}
                  autoComplete="off"
                  {...registerSignUp("RePassword", {
                    required: "비밀번호를 확인해주세요.",
                    validate: (value) =>
                      value === getValuesSignUp("Password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: errorsSignUp.RePassword ? "265px" : "295px",
                    height: "30px",
                    margin: "0 20px 0 10px",
                  }}
                />
                {isRePasswordVisible ? (
                  <img
                    src="../img/icon/eye_open.png"
                    alt="eye_open"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                  />
                ) : (
                  <img
                    src="../img/icon/eye_close.png"
                    alt="eye_close"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => setIsRePasswordVisible(!isRePasswordVisible)}
                  />
                )}
                {errorsSignUp.RePassword ? (
                  <div>
                    <div
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      className="signUpError"
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
                  </div>
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
                  marginBottom: "15px",
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
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  이 름
                </label>
                <input
                  id="name"
                  placeholder="이름 입력"
                  type="text"
                  autoComplete="off"
                  {...registerSignUp("Name", {
                    required: "이름을 입력해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: errorsSignUp.Name ? "310px" : "340px",
                    height: "30px",
                    margin: "0 10px",
                  }}
                />
                {errorsSignUp.Name ? (
                  <div>
                    <div
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      className="signUpError"
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
                  </div>
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
                  marginBottom: "15px",
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
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  학 과
                </label>
                <select
                  defaultValue="학과 선택"
                  id="major"
                  style={{
                    width: "100%",
                    maxWidth: errorsSignUp.Major ? "310px" : "340px",
                    margin: "0 10px",
                    height: "40px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: selectedMajor === "학과 선택" ? "#777" : "#fff",
                    cursor: "pointer",
                  }}
                  {...registerSignUp("Major", {
                    validate: (value) =>
                      value !== "학과 선택" || "학과를 선택해주세요.",
                    onChange: handleChange,
                  })}
                >
                  <option
                    disabled
                    value="학과 선택"
                    style={{ background: "#111015", cursor: "pointer" }}
                  >
                    학과 선택
                  </option>
                  {majors.map((major) => (
                    <option
                      key={major}
                      value={major}
                      style={{
                        color: "#fff",
                        background: "#111015",
                        cursor: "pointer",
                      }}
                    >
                      {major}
                    </option>
                  ))}
                </select>
                {errorsSignUp.Major ? (
                  <div>
                    <div
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      className="signUpError"
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
                  </div>
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
                  marginBottom: "15px",
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
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  전화번호
                </label>
                <input
                  id="phoneNum"
                  type="text"
                  autoComplete="off"
                  onKeyUp={() => autoSeparate("phoneNum")}
                  {...registerSignUp("PhoneNum", {
                    required: "전화번호를 입력해주세요.",
                    minLength: {
                      value: 13,
                      message: "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                    },
                    maxLength: {
                      value: 13,
                      message: "전화번호는 '-'를 제외한 11자리를 입력해주세요.",
                    },
                  })}
                  placeholder="전화번호 입력"
                  style={{
                    width: "100%",
                    maxWidth: errorsSignUp.PhoneNum ? "310px" : "340px",
                    height: "30px",
                    margin: "0 10px",
                  }}
                />
                {errorsSignUp.PhoneNum ? (
                  <div>
                    <div
                      style={{
                        width: "30px",
                      }}
                    >
                      <img
                        src="..\img\btn\fail.png"
                        alt="fail"
                        style={{ width: "15px" }}
                      />
                    </div>
                    <div
                      className="signUpError"
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
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </form>
          </div>
          <div
            style={{
              maxWidth: "500px",
              margin: "50px 0 150px",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              border: "none",
            }}
          >
            <Button
              type={isSubmitting ? "disabled" : "primary"}
              size="large"
              title="계정 생성"
              onClick={handleSubmitSignUp(onValid, onInvalid)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
