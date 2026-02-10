import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

async function getFaqs(accessToken: string | undefined, category?: string) {
  const url = category
    ? `${API_SERVER_DOMAIN}/api/faqs/category/${encodeURIComponent(category)}`
    : `${API_SERVER_DOMAIN}/api/faqs`;

  const headers: Record<string, string> = {};
  if (accessToken) {
    headers.Authorization = "Bearer " + accessToken;
  }

  return fetch(url, {
    method: "GET",
    headers,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to get FAQs");
    }
    return response.json();
  });
}

export default async function GetFaqsAPI(category?: string) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  try {
    if (accessToken) {
      let data = await getFaqs(accessToken, category);
      console.log(data.result);
      return data.result;
    }
    // 토큰 없이 조회 (FAQ GET은 백엔드에서 permitAll)
    let data = await getFaqs(undefined, category);
    console.log(data.result);
    return data.result;
  } catch (error) {
    if (accessToken && refreshToken) {
      try {
        console.error("accessToken expiration: ", error);
        let newAccessToken = await getAccessTokenWithRefreshToken(
          accessToken,
          refreshToken
        );
        let data = await getFaqs(newAccessToken, category);
        console.log(data.result);
        return data.result;
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        alert("다시 로그인해주세요.");
        removeCookie("accessToken");
        removeCookie("refreshToken");
        window.location.href = "/";
      }
    } else {
      console.error("FAQ 조회 실패:", error);
      throw error;
    }
  }
}
