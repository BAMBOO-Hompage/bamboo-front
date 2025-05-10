import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postWeeklyBest(accessToken, studyId, week, memberId) {
  return fetch(
    API_SERVER_DOMAIN +
      `/api/inventories/weekly-best?studyId=${studyId}&week=${week}&memberId=${memberId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: JSON.stringify({}),
    }
  ).then((response) => {
    if (!response.ok && response.status !== 404) {
      throw new Error("Failed to post activities");
    }
    if (response.status === 404) {
      return null;
    }
    return response.json();
  });
}

export default async function PostWeeklyBestAPI(studyId, week, memberId) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log(studyId, week, memberId);
      const weeklyBestResult = await postWeeklyBest(
        accessToken,
        studyId,
        week,
        memberId
      );

      if (!weeklyBestResult) {
        alert("정리본이 등록되지 않은 학생입니다.");
      } else {
        alert("등록 완료");
        window.location.reload();
      }
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          const weeklyBestResult = await postWeeklyBest(
            newAccessToken,
            studyId,
            week,
            memberId
          );

          if (!weeklyBestResult) {
            alert("정리본이 등록되지 않은 학생입니다.");
          } else {
            alert("등록 완료");
            window.location.reload();
          }
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
