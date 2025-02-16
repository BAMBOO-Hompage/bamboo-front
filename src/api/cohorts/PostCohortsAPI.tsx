import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postCohorts(accessToken, batch, year, isFirstSemester) {
  return fetch(API_SERVER_DOMAIN + "/api/cohorts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      batch: batch,
      year: year,
      isFirstSemester: isFirstSemester,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PostCohortsAPI(batch, year, isFirstSemester) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await postCohorts(accessToken, batch, year, isFirstSemester);

      alert("새로운 기수의 시작!");
      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postCohorts(newAccessToken, batch, year, isFirstSemester);

          alert("새로운 기수의 시작!");
          window.location.reload();
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
    removeCookie("refreshToken");
    window.location.href = "/";
  }
}
