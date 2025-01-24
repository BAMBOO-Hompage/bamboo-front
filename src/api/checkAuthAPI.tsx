import { setCookie, getCookie } from "./cookies.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
  return fetch(API_SERVER_DOMAIN + `/auth/reissue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
      "Refresh-Token": refreshToken,
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        alert("-1: Fail Get AccessToken With RefreshToken");
        throw new Error("Failed to refresh access token");
      }
      return response.text();
    })
    .then((newAccessToken) => {
      setCookie("accessToken", newAccessToken, {
        path: "/",
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 1일 뒤 삭제
      });

      return newAccessToken;
    });
}

export default async function checkAuth() {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (!accessToken) {
    if (refreshToken) {
      try {
        let newAccessToken = await getAccessTokenWithRefreshToken(
          accessToken,
          refreshToken
        );

        console.log(newAccessToken);
        return 1;
      } catch (error) {
        console.error("Failed to refresh access token:", error);

        return 0;
      }
    } else {
      return 0;
    }
  } else {
    return 1;
  }
}
