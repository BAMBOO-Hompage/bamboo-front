import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postWeeklyContents(
  accessToken,
  id,
  content,
  week,
  startDate,
  endDate,
  startPage,
  endPage
) {
  return fetch(API_SERVER_DOMAIN + `/api/subjects/${id}/weeklyContents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      content: content,
      week: week,
      startDate: startDate,
      endDate: endDate,
      startPage: startPage,
      endPage: endPage,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PostWeeklyContentsAPI(
  id,
  content,
  week,
  startDate,
  endDate,
  startPage,
  endPage
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await postWeeklyContents(
        accessToken,
        id,
        content,
        week,
        startDate,
        endDate,
        startPage,
        endPage
      );
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postWeeklyContents(
            newAccessToken,
            id,
            content,
            week,
            startDate,
            endDate,
            startPage,
            endPage
          );
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          // removeCookie("accessToken");
          // removeCookie("refreshToken");
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
