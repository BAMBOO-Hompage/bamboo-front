import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postLogOut(accessToken) {
  return fetch(API_SERVER_DOMAIN + `/api/members/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({}),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to logout");
    }
    removeCookie("accessToken");
    removeCookie("refreshToken");

    return response.json();
  });
}

export default async function LogOutAPI() {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await postLogOut(accessToken);

      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postLogOut(newAccessToken);

          setTimeout(() => {
            window.location.href = "/";
          }, 100);
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          removeCookie("accessToken");
          removeCookie("refreshToken");

          window.location.href = "/";
        }
      } else {
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    window.location.href = "/";
  }
}
