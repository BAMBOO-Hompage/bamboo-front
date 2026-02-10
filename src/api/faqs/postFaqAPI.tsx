import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

async function postFaq(accessToken, data) {
  return fetch(API_SERVER_DOMAIN + "/api/faqs", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post FAQ");
    }
    return response.json();
  });
}

export default async function PostFaqAPI(
  question: string, 
  answer: string, 
  category: string, 
  displayOrder: number
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  const data = { question, answer, category, displayOrder };

  if (accessToken) {
    try {
      await postFaq(accessToken, data);

      alert("FAQ 작성 완료");
      window.location.href = "/faq?category=전체";
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postFaq(newAccessToken, data);

          alert("FAQ 작성 완료");
          window.location.href = "/faq?category=전체";
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        alert("다시 로그인 해주세요.");
        removeCookie("accessToken");
        window.location.href = "/";
      }
    }
  } else {
    alert("다시 로그인 해주세요.");
    removeCookie("refreshToken");
    window.location.href = "/";
  }
}
