import { getCookie, removeCookie } from "../cookies.tsx";

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
      return data;
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
        window.location.reload();
      }, 100); // 100ms 딜레이

      return 0;
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
            window.location.reload();
          }, 100); // 100ms 딜레이
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          removeCookie("accessToken");
          removeCookie("refreshToken");

          window.location.reload();
        }
      } else {
        window.location.reload();
      }
    }
  } else {
    window.location.reload();
  }
}
