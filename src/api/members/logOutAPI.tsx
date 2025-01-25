import { setCookie, getCookie, removeCookie } from "../cookies.tsx";

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
          alert("Refresh accessToken");

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
        window.location.href = "/";
      }
    }
  } else {
    window.location.href = "/";
  }
}
