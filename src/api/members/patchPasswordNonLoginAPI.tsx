import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function PatchPasswordNonLoginAPI(
  studentId,
  newPassword1,
  newPassword2
) {
  try {
    const response = await fetch(API_SERVER_DOMAIN + "/api/members/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        studentId: studentId,
        newPassword1: newPassword1,
        newPassword2: newPassword2,
      }),
    });

    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error("Failed to get inventory");
      }
      console.log(data.result);
      alert("비밀번호 변경 완료");
      window.location.reload();
    });
  } catch (error) {
    console.error(error);
    alert("서버 오류 발생");
    window.location.href = "/";
    return;
  }
}
