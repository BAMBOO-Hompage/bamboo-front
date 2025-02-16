import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function GetCohort(accessToken, id) {
  return fetch(API_SERVER_DOMAIN + `/api/cohorts/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
    return response.json();
  });
}

export default async function GetCohortAPI(id) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      let data = await GetCohort(accessToken, id);
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
          let data = await GetCohort(newAccessToken, id);
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
    removeCookie("refreshToken");
    window.location.href = "/";
  }
}
