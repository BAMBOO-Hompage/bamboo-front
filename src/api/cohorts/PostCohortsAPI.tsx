import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

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

export default async function PostCohortsAPI(
  batch: number,
  year: number,
  isFirstSemester: boolean
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log(batch, year, isFirstSemester);
      await postCohorts(accessToken, batch, year, isFirstSemester);

      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert(2);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          alert(3);
          await postCohorts(newAccessToken, batch, year, isFirstSemester);

          window.location.reload();
        } catch (error) {
          alert(4);
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
