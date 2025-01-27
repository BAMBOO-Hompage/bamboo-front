import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "../../components/button.tsx";

import MyPageAPI from "../../api/members/myPageAPI.tsx";
import PatchMyPageAPI from "../../api/members/patchMyPageAPI.tsx";
import PatchPasswordAPI from "../../api/members/patchPasswordAPI.tsx";
import "../../App.css";

type MyDataType = {
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
  profileImageUrl: string;
};

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
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [myData, setmyData] = useState<MyDataType>({
    studentId: "",
    email: "",
    name: "",
    major: "",
    phone: "",
    role: "",
    profileImageUrl: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState<File>();
  const edit = searchParams.get("edit") || "0";
  const changePassword = searchParams.get("changePassword") || "0";

  useEffect(() => {
    MyPageAPI().then((data) => {
      if (!data.profileImageUrl) {
        data.profileImageUrl = "../img/icon/base_profile.png";
      }
      setmyData(data);
      setPreviewImage(data.profileImageUrl);
      navigate("/myPage?list=personalInfo&edit=0&changePassword=0", {
        replace: true,
      });
    });
  }, [navigate]);

  const handleProfileImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }

    setImage(file);
  };

  const onValid = (e) => {
    e.PhoneNum = e.PhoneNum.replace(/-/g, "");
    console.log(previewImage + "\n" + e.PhoneNum, "onValid");

    const formData = new FormData();
    if (image) {
      formData.append("profileImage", image);
      formData.append("phoneNumber", e.PhoneNum);
    } else {
      formData.append("phoneNumber", e.PhoneNum);
    }

    PatchMyPageAPI(formData);
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    if (errors.PhoneNum) {
      alert(String(errors.PhoneNum.message));
    }
  };

  const onChangePasswordValid = (e) => {
    console.log(e.Password + "\n" + e.NewPassword);
    PatchPasswordAPI(e.Password, e.NewPassword);
  };
  const onChangePasswordInvalid = (e) => {
    console.log(e, "onInvalid");
    if (errorsChangePassword.Password) {
      alert(String(errorsChangePassword.Password.message));
    } else {
      if (errorsChangePassword.NewPassword) {
        alert(String(errorsChangePassword.NewPassword.message));
      } else {
        if (errorsChangePassword.ReNewPassword) {
          alert(String(errorsChangePassword.ReNewPassword.message));
        }
      }
    }
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
          {myData.role === "ROLE_USER" ? (
            <span
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#aaa",
              }}
            >
              &nbsp;비회원
            </span>
          ) : myData.role === "ROLE_MEMBER" ? (
            <span
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#2cc295",
              }}
            >
              &nbsp;일반회원&nbsp;<span style={{ fontSize: "25px" }}>🐼</span>
            </span>
          ) : myData.role === "ROLE_ADMIN" ? (
            <span
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#FF5005",
              }}
            >
              &nbsp;운영진&nbsp;△
            </span>
          ) : (
            <span
              style={{
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#F1C411",
              }}
            >
              &nbsp;관리자&nbsp;□
            </span>
          )}
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
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onClick={() => {
              setSearchParams({
                list: "personalInfo",
                edit: "1",
                changePassword: "0",
              });
            }}
          />
        </div>
      </div>

      {changePassword === "0" && edit === "0" ? (
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
              src={myData.profileImageUrl}
              alt="profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
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
                {myData.name}
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
                {myData.major}
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
                {myData.studentId}
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
                {myData.phone.slice(0, 3)}-{myData.phone.slice(3, 7)}-
                {myData.phone.slice(7, 11)}
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
                {myData.email}
              </div>
            </div>
          </div>
        </div>
      ) : changePassword === "0" && edit === "1" ? (
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
              src={previewImage}
              alt="profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "100px",
              }}
            />

            <label
              htmlFor="fileInput"
              style={{
                width: "35px",
                borderRadius: "18px",
                position: "absolute",
                bottom: "20px",
                right: "20px",
              }}
              onChange={handleProfileImage}
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
              <input
                type="file"
                id="fileInput"
                style={{
                  display: "none",
                }}
                {...register("Image", {})}
              />
            </label>
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
                {myData.name}
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
                {myData.major}
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
                {myData.studentId}
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
                defaultValue={`${myData.phone.slice(0, 3)}-${myData.phone.slice(
                  3,
                  7
                )}-${myData.phone.slice(7, 11)}`}
                onKeyUp={() => autoSeparate("phoneNum")}
                autoComplete="off"
                {...register("PhoneNum", {
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
                style={{
                  width: "260px",
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
                {myData.email}
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
                    window.location.href = "/myPage?edit=&changePassword=";
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
                    window.location.href = "/myPage?edit=&changePassword=";
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={handleSubmitChangePassword(
                  onChangePasswordValid,
                  onChangePasswordInvalid
                )}
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
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLDivElement).style.transform = "scale(1.05)"; // 살짝 확대
            (e.target as HTMLDivElement).style.boxShadow =
              "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLDivElement).style.transform = "scale(1)";
            (e.target as HTMLDivElement).style.boxShadow =
              "-10px -10px 30px #242424, 15px 15px 30px #000";
          }}
          onClick={() => {
            setSearchParams({
              list: "personalInfo",
              edit: "0",
              changePassword: "1",
            });
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
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLDivElement).style.transform = "scale(1.05)"; // 살짝 확대
            (e.target as HTMLDivElement).style.boxShadow =
              "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLDivElement).style.transform = "scale(1)";
            (e.target as HTMLDivElement).style.boxShadow =
              "-10px -10px 30px #242424, 15px 15px 30px #000";
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
