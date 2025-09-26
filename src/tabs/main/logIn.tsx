import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/button.tsx";

import LogInAPI from "../../api/members/logInAPI.tsx";
import ExistsAPI from "../../api/members/existsAPI.tsx";
import VerificationRequestsAPI from "../../api/emails/verificationReauestsAPI.tsx";
import VerificationsAPI from "../../api/emails/verificationsAPI.tsx";
import PatchPasswordNonLoginAPI from "../../api/members/patchPasswordNonLoginAPI.tsx";

import "../../App.css";

export default function Login() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    setValue: setValueEmail,
    formState: { errors: errorsEmail },
  } = useForm();
  const {
    register: registerVerification,
    handleSubmit: handleSubmitVerification,
    setValue: setValueVerification,
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    getValues: getValuesPassword,
    setValue: setValuePassword,
    formState: { errors: errorsPassword },
  } = useForm();
  useEffect(() => {
    setFocus("StudentNum");
  }, [setFocus]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [timer, setTimer] = useState(600); // 10분 (초 단위)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [studentNum, setStudentNum] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [checkedEmail, setCheckedEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);

  const onValid = async (e: any) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      console.log(e, "onValid");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await LogInAPI(e.StudentNum, e.Password);
    } finally {
      setIsSubmitting(false);
    }
  };
  const onInvalid = (e: any) => {
    console.log(e, "onInvalid");
  };

  useEffect(() => {
    let interval;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    if (timer === 0) setIsTimerActive(false);
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const startTimer = () => {
    setTimer(600);
    setIsTimerActive(true);
  };

  const onEmailValid = async (e) => {
    var studentNumToEmail = `${e.StudentNum}@sangmyung.kr`;
    const handleVerification = async () => {
      const exists = await ExistsAPI(e.StudentNum);
      if (!exists) {
        alert("존재하지 않는 회원입니다. 회원가입을 진행해주세요.");
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
          setChangePassword(true);
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

  const onChangePasswordValid = (e) => {
    console.log(e, "onChangePasswordValid");
    PatchPasswordNonLoginAPI(studentNum, e.Password, e.RePassword);
  };
  const onChangePasswordInvalid = (e) => {
    console.log(e, "onChangePasswordInvalid");
    alert("비밀번호를 다시 확인해주세요.");
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
                    fontFamily: "Paperozi-Light",
                    fontSize: "18px",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Paperozi-Regular",
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
                    required: "학번 혹은 비밀번호를 확인해주세요.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "360px",
                    height: "40px",
                    margin: "0 20px",
                    borderRadius: "10px",
                    fontFamily: "Paperozi-Light",
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
                disabled={isSubmitting}
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
                  <Button
                    type={isSubmitting ? "disabled" : "primary"}
                    size="large"
                    title="로그인"
                  />
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
                fontFamily: "Paperozi-Regular",
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
              비밀번호 재설정
            </div>
            <a
              href="/privacyPolicy"
              style={{
                fontFamily: "Paperozi-Regular",
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
            maxWidth: "500px",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "#111015",
            padding: "30px 30px 20px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            textAlign: "left",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              const closeConfirm = window.confirm(
                "비밀번호 재설정을 취소하시겠습니까?"
              );
              if (closeConfirm) {
                setIsPopupOpen(false);
                setCheckedEmail(false);
                setValidEmail(false);
                setChangePassword(false);
                setValueEmail("StudentNum", "");
                setValueVerification("Code", "");
                setValuePassword("Password", "");
                setValuePassword("RePassword", "");
              }
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              color: "#fff",
              fontFamily: "Paperozi-Semibold",
              fontSize: "30px",
              cursor: "pointer",
            }}
            aria-label="Close"
          >
            ×
          </button>
          <div
            style={{
              marginBottom: "30px",
              fontFamily: "Paperozi-Semibold",
              fontSize: "25px",
              color: "#fff",
              textAlign: "center",
            }}
          >
            비밀번호 재설정
          </div>
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
                fontFamily: "Paperozi-Regular",
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
                maxWidth: "170px",
                height: "30px",
                margin: "0 10px",
                color: checkedEmail ? "#777" : "#fff",
              }}
            />
            <div
              style={{
                width: "90px",
                marginRight: "10px",
                fontFamily: "Paperozi-Regular",
                fontSize: "12px",
                color: "#777",
              }}
            >
              @sangmyung.kr
            </div>
            <button
              type="button"
              style={{
                width: "70px",
                minWidth: "70px",
                fontFamily: "Paperozi-Regular",
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
                    fontFamily: "Paperozi-Regular",
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
                    fontFamily: "Paperozi-Regular",
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
                    fontFamily: "Paperozi-Regular",
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
          {changePassword ? (
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
                  marginBottom: errorsPassword.Password ? "5px" : "15px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="password"
                  style={{
                    display: "inline-block",
                    fontFamily: "Paperozi-Regular",
                    fontSize: "clamp(14px, 2.2vw, 18px)",
                    color: "#fff",
                    width: "120px",
                    minWidth: "70px",
                    paddingLeft: "20px",
                  }}
                >
                  새 비밀번호
                </label>
                <input
                  id="password"
                  placeholder="비밀번호 입력"
                  type={isNewPasswordVisible ? "text" : "password"}
                  autoComplete="off"
                  {...registerPassword("Password", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value: passwordPattern,
                      message:
                        "영어, 숫자, 특수문자 포함 8-24자리를 입력해주세요.",
                    },
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "295px",
                    height: "30px",
                    margin: "0 20px 0 10px",
                  }}
                />
                {isNewPasswordVisible ? (
                  <img
                    src="../img/icon/eye_open.png"
                    alt="eye_open"
                    color="#777"
                    style={{
                      width: "25px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
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
                    onClick={() =>
                      setIsNewPasswordVisible(!isNewPasswordVisible)
                    }
                  />
                )}
              </div>
              {errorsPassword.Password ? (
                <div
                  style={{
                    maxWidth: "400px",
                    height: "20px",
                    color: "#FF5005",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errorsPassword.Password.message)}
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div
                style={{
                  width: "100%",
                  height: "40px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  margin: "0 auto",
                  marginBottom: errorsPassword.RePassword ? "5px" : "15px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="rePassword"
                  style={{
                    display: "inline-block",
                    fontFamily: "Paperozi-Regular",
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
                  {...registerPassword("RePassword", {
                    required: "비밀번호를 확인해주세요.",
                    validate: (value) =>
                      value === getValuesPassword("Password") ||
                      "비밀번호가 일치하지 않습니다.",
                  })}
                  style={{
                    width: "100%",
                    maxWidth: "295px",
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
              </div>
              {errorsPassword.RePassword ? (
                <div
                  style={{
                    maxWidth: "400px",
                    height: "20px",
                    color: "#FF5005",
                    fontSize: "12px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      paddingLeft: "20px",
                    }}
                  >
                    * {String(errorsPassword.RePassword.message)}
                  </span>
                </div>
              ) : (
                <></>
              )}

              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "right",
                  gap: "10px",
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  title="저장"
                  onClick={handleSubmitPassword(
                    onChangePasswordValid,
                    onChangePasswordInvalid
                  )}
                />
              </div>
            </form>
          ) : (
            <></>
          )}
        </div>
      )}
      {isPopupOpen && (
        <div
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
