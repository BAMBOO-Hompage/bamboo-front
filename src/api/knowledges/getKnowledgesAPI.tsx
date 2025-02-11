import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function getKnowledges(accessToken, post, keyword, page) {
  const params = new URLSearchParams();

  if (post && post.trim()) {
    params.append("type", post.trim());
  }
  if (keyword && keyword.trim()) {
    params.append("keyword", keyword.trim());
  }
  params.append("page", page.toString());
  params.append("size", "8");

  return fetch(`${API_SERVER_DOMAIN}/api/knowledges?${params.toString()}`, {
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

export default async function GetKnowledgesAPI(post, keyword, page) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      if (post === "전체") {
        post = "";
      }
      console.log(post, keyword, page);
      let data = await getKnowledges(accessToken, post, keyword, page);
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
          let data = await getKnowledges(newAccessToken, post, keyword, page);
          console.log(data.result);

          return data.result;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          alert("다시 로그인해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        console.error("No RefreshToken");
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    console.error("No AccessToken");
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
