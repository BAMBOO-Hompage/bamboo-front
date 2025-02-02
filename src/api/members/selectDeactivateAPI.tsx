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

async function postSelectDeactivate(accessToken, id) {
  return fetch(API_SERVER_DOMAIN + `/api/members/${id}/deactivate`, {
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
    return response.json();
  });
}

export default async function SelectDeactivateAPI(ids) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      for (let i = 0; i < ids.length; i++) {
        await postSelectDeactivate(accessToken, ids[i]);
      }

      alert("선택된 회원이 삭제되었습니다.");
      localStorage.removeItem("selected_id");
      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert("Refresh accessToken");

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          for (let i = 0; i < ids.length; i++) {
            await postSelectDeactivate(newAccessToken, ids[i]);
          }

          alert("선택된 회원이 삭제되었습니다.");
          localStorage.removeItem("selected_id");
          window.location.reload();
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
