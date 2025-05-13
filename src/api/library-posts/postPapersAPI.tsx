import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postPapers(accessToken, formData) {
  return fetch(API_SERVER_DOMAIN + "/api/library-posts", {
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

export default async function PostPapersAPI(formData) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      await postPapers(accessToken, formData);

      alert("작성 완료");
      window.location.href = "/alexandria?tab=&search=&page=1&size=10";
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postPapers(newAccessToken, formData);

          alert("작성 완료");
          window.location.href = "/alexandria?tab=&search=&page=1&size=10";
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
