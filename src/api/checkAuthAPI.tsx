import { getCookie } from "./cookies.tsx";
import getAccessTokenWithRefreshToken from "./getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getMyPage(accessToken) {
  return fetch(API_SERVER_DOMAIN + `/api/members/myPage`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to check auth");
    }
    return response.json();
  });
}

export default async function checkAuth() {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      let data = await getMyPage(accessToken);
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
          let data = await getMyPage(newAccessToken);
          console.log(data.result);

          return data.result;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          return 0;
        }
      } else {
        return 0;
      }
    }
  } else {
    return 0;
  }
}
