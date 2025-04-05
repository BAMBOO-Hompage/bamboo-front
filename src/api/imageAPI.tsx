import { getCookie, removeCookie } from "./cookies.tsx";
import getAccessTokenWithRefreshToken from "./getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postImage(accessToken, formData) {
  return fetch(API_SERVER_DOMAIN + "/api/upload", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function ImageAPI(formData) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      let data = await postImage(accessToken, formData);

      return data;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          console.log(newAccessToken);
          let data = await postImage(newAccessToken, formData);

          return data;
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("이미지 사용에 문제가 생겼습니다.");
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
