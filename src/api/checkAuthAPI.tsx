import { getCookie } from "./cookies.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
  return fetch(API_SERVER_DOMAIN + "/auth/reissue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
      return response.json();
    })
    .then((data) => {
      return data.accessToken;
    });
}

export default async function checkAuth() {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (!accessToken) {
    if (refreshToken) {
      try {
        let refreshTokenResponse = await getAccessTokenWithRefreshToken(
          accessToken,
          refreshToken
        );

        console.log(refreshTokenResponse);
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
