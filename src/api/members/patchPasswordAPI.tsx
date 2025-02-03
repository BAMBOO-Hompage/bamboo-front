import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function patchPassword(accessToken, password, newPassword) {
  return fetch(API_SERVER_DOMAIN + "/api/members/myPage/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      password: password,
      newPassword: newPassword,
    }),
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to patch password");
    }
    return response.json();
  });
}

export default async function PatchPasswordAPI(password, newPassword) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log("passoword: " + password + "\nnewPassword: " + newPassword);

      await patchPassword(accessToken, password, newPassword);

      alert("변경 완료");
      window.location.href = "/personalInfo?edit=&changePassword=";

      return;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert("Refresh accessToken");

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          console.log(newAccessToken);
          await patchPassword(newAccessToken, password, newPassword);

          alert("변경 완료");
          window.location.href = "/personalInfo?edit=&changePassword=";
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        alert("다시 로그인 해주세요.");
        window.location.href = "/";
      }
    }
  } else {
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
