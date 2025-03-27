import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function getWeeklyBest(accessToken, studyId, week) {
  return fetch(
    API_SERVER_DOMAIN + `/api/inventories/weekly-best/${studyId}/${week}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  ).then((response) => {
    return response.json().then((data) => {
      // 404면 에러 처리를 하지 않고 반환
      if (response.status === 404 || response.status === 500) {
        return data;
      }
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      return data;
    });
  });
}

export default async function GetWeeklyBestAPI(studyId, week) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      let data = await getWeeklyBest(accessToken, studyId, week);
      console.log(data.result);

      return data.result;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          let newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          let data = await getWeeklyBest(newAccessToken, studyId, week);
          console.log(data.result);

          return data.result;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          alert("다시 로그인해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        console.error("No RefreshToken");
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    console.error("No AccessToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
