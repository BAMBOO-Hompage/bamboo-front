import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "../../components/button.tsx";
import "../../App.css";

export default function PersonalInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    getValues: getValuesChangePassword,
    formState: { errors: errorsChangePassword },
  } = useForm();

  const [edit, setEdit] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);

  const onValid = (e) => {
    console.log(e.Category + "\n" + e.Title + "\n", "onValid");
    alert("카테고리 : " + e.Category + "\n제목 : " + e.Title + "\n내용 : \n");
    window.location.href = "/mypage";
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const passwordPattern =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*.,/])[a-zA-Z\d!@#$%^&*.,/]{8,24}$/;

  return (
    <>
      <div
        style={{
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: "30px",
            color: "#fff",
          }}
        >
          개인 정보
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-Bold",
            fontSize: "30px",
            color: "#555",
          }}
        >
          회원 등급 -
          <span
            style={{
              fontFamily: "Pretendard-Bold",
              fontSize: "30px",
              color: "#2cc295",
            }}
          >
            {` 아기 판다🐼`}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Pretendard-Light",
            fontSize: "18px",
            color: "#777",
          }}
        >
          개인정보 수정&emsp;
          <img
            src="../../img/btn/edit_enabled.png"
            alt="edit"
            style={{
              width: "30px",
              cursor: "pointer",
              opacity: "0.8",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onClick={() => {
              setEdit(true);
            }}
          />
        </div>
      </div>

      {!changePassword && !edit ? (
        <div
          style={{
            width: "100%",
            height: "280px",
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "250px",
              height: "250px",
              borderRadius: "125px",
              backgroundColor: "#111015",
              boxShadow:
                "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="https://github.com/user-attachments/assets/5ab779b6-ab38-474e-92a4-e481ea11f639"
              alt="profile"
              style={{
                width: "200px",
                height: "200px",
                borderRadius: "100px",
              }}
            />
          </div>
          <div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                이 름
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                맹의현
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                학 과
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                휴먼지능정보공학전공
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                학 번
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                202010770
              </div>
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                전화번호
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                01092428053
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                이메일
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                202010770@sangmyung.kr
              </div>
            </div>
          </div>
        </div>
      ) : !changePassword && edit ? (
        <form
          style={{
            width: "100%",
            height: "280px",
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "250px",
              height: "250px",
              borderRadius: "125px",
              backgroundColor: "#111015",
              boxShadow:
                "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="../img/test/test_profile.png"
              alt="profile"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "90px",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
            >
              <img
                src="../img/btn/search_disabled.png"
                alt="search"
                style={{
                  width: "35px",
                  opacity: "0.8",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1"; // Hover 시 opacity 변경
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.8"; // Hover 해제 시 opacity 복원
                }}
              />
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                이 름
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                맹의현
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                학 과
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                휴먼지능정보공학전공
              </div>
            </div>
            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                학 번
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                202010770
              </div>
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                margin: "0 auto",
                marginBottom: "15px",
                backgroundColor: "#111015",
                boxShadow:
                  "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                borderRadius: "20px",
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
                  fontSize: "18px",
                  color: "#fff",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                전화번호
              </label>
              <input
                id="phoneNum"
                type="text"
                defaultValue={"01092428053"}
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
                style={{
                  width: errors.PhoneNum ? "240px" : "260px",
                  height: "30px",
                  margin: "0 20px",
                }}
              />
            </div>

            <div
              style={{
                width: "400px",
                height: "40px",
                borderRadius: "20px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  width: "80px",
                  paddingLeft: "20px",
                }}
              >
                이메일
              </div>
              <div
                style={{
                  width: "260px",
                  height: "30px",
                  margin: "0 20px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#777",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                202010770@sangmyung.kr
              </div>
            </div>

            <div
              style={{
                position: "absolute",
                right: "0",
                bottom: "-30px",
                width: "100%",
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
                    window.confirm("개인정보 수정을 취소하시겠습니까?");
                  if (deleteAdd) {
                    setEdit(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="수정 완료"
                onClick={handleSubmit(onValid, onInvalid)}
              />
            </div>
          </div>
        </form>
      ) : (
        <form
          style={{
            boxSizing: "border-box",
            width: "100%",
            height: "280px",
            borderRadius: "30px",
            backgroundColor: "#222",
            marginTop: "40px",
            padding: "60px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "250px",
              height: "160px",
            }}
          >
            <div
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#555",
              }}
            >
              비밀번호를
              <br />
              변경해주세요.
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "0",
                width: "100%",
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
                    window.confirm("비밀번호 변경을 취소하시겠습니까?");
                  if (deleteAdd) {
                    setChangePassword(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={handleSubmitChangePassword(onValid, onInvalid)}
              />
            </div>
          </div>
          <div
            style={{
              width: "340px",
              height: "160px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "40px",
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
                  width: "140px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                현재 비밀번호
              </label>
              <input
                id="password"
                placeholder=""
                type="password"
                {...registerChangePassword("Password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "영어, 숫자, 특수문자 포함 8-24자리를 입력해주세요.",
                  },
                })}
                style={{
                  width: "200px",
                  height: "40px",
                  padding: "5px 20px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "40px",
                margin: "0 auto",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="newPassword"
                style={{
                  width: "140px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                새 비밀번호
              </label>
              <input
                id="newPassword"
                placeholder=""
                type="password"
                {...registerChangePassword("NewPassword", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "영어, 숫자, 특수문자 포함 8-16자리를 입력해주세요.",
                  },
                })}
                style={{
                  width: "200px",
                  height: "40px",
                  padding: "5px 20px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                }}
              />
            </div>
            <div
              style={{
                width: "100%",
                height: "40px",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                position: "relative",
              }}
            >
              <label
                htmlFor="reNewPassword"
                style={{
                  width: "140px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                새 비밀번호 확인
              </label>
              <input
                id="reNewPassword"
                placeholder=""
                type="password"
                {...registerChangePassword("ReNewPassword", {
                  required: "비밀번호를 확인해주세요.",
                  validate: (value) =>
                    value === getValuesChangePassword("NewPassword") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                style={{
                  width: "200px",
                  height: "40px",
                  padding: "5px 20px",
                  backgroundColor: "#111015",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                }}
              />
            </div>
          </div>
        </form>
      )}

      <div
        style={{
          width: "100%",
          marginTop: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "20px",
            width: "280px",
            padding: "12px",
            backgroundColor: "#111015",
            borderRadius: "25px",
            boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
            color: "#2CC295",
            cursor: "pointer",
          }}
          onClick={() => {
            setChangePassword(true);
          }}
        >
          비밀번호 변경
        </div>
        <div
          style={{
            fontFamily: "Pretendard-SemiBold",
            fontSize: "20px",
            width: "280px",
            padding: "12px",
            backgroundColor: "#111015",
            borderRadius: "25px",
            boxShadow: "-10px -10px 30px #242424, 15px 15px 30px #000",
            color: "#FF5005",
            cursor: "pointer",
          }}
          onClick={() => {
            var confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
            if (confirmDelete) {
              window.location.href = "/";
            }
          }}
        >
          회원 탈퇴
        </div>
      </div>
    </>
  );
}
