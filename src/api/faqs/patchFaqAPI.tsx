import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

async function patchFaq(accessToken, id, data) {
  return fetch(API_SERVER_DOMAIN + `/api/faqs/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to patch FAQ");
    }
    return response.json();
  });
}

export default async function PatchFaqAPI(
  id: number, 
  question?: string, 
  answer?: string, 
  category?: string, 
  displayOrder?: number
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  // null이 아닌 필드만 포함
  const data: any = {};
  if (question) data.question = question;
  if (answer) data.answer = answer;
  if (category) data.category = category;
  if (displayOrder) data.displayOrder = displayOrder;

  if (accessToken) {
    try {
      await patchFaq(accessToken, id, data);

      alert("FAQ 수정 완료");
      window.location.href = "/faq?category=전체";
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await patchFaq(newAccessToken, id, data);

          alert("FAQ 수정 완료");
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
