import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function getPaper(accessToken, id) {
  return fetch(API_SERVER_DOMAIN + `/api/library-posts/${id}`, {
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

export default async function GetPaperAPI(id) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN + `/api/library-posts/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error("Failed to get inventory");
      }
      console.log(data.result);
      return data.result;
    });
  } catch (error) {
    console.error(error);
    alert("서버 오류 발생");
    window.location.href = "/";
    return;
  }
}
