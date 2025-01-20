import { getCookie, removeCookie } from "../cookies.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

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

    return response.json();
  });
}

export default async function LogOutAPI() {
  var accessToken = getCookie("accessToken");

  if (accessToken) {
    try {
      await postLogOut(accessToken);
      removeCookie("accessToken");
      removeCookie("refreshToken");

      setTimeout(() => {
        window.location.reload();
      }, 100); // 100ms 딜레이

      return 0;
    } catch (error) {
      console.error("Failed to get access token:" + error);
      window.location.reload();
    }
  } else {
    window.location.reload();
  }
}
