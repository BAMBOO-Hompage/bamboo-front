import { setCookie } from "./cookies.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function getAccessTokenWithRefreshToken(
  accessToken,
  refreshToken
) {
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
        throw new Error("Failed to refresh access token");
      }
      return response.text();
    })
    .then((newAccessToken) => {
      setCookie("accessToken", newAccessToken, {
        path: "/",
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1시간 뒤 삭제
      });

      return newAccessToken;
    });
}
