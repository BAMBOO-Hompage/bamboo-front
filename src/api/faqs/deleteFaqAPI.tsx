import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

async function deleteFaq(accessToken, id) {
  return fetch(API_SERVER_DOMAIN + `/api/faqs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete FAQ");
    }
    return response.json();
  });
}

export default async function DeleteFaqAPI(id: number) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await deleteFaq(accessToken, id);

      alert("FAQ 삭제 완료");
      window.location.href = "/faq?category=전체";

      return 0;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await deleteFaq(newAccessToken, id);

          alert("FAQ 삭제 완료");
          window.location.href = "/faq";
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
