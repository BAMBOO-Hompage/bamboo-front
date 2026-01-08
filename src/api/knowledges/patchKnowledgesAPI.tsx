import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

async function patchKnowledges(accessToken, id, fileUrls, formData) {
  return fetch(
    API_SERVER_DOMAIN +
      `/api/knowledges/${id}?imageUrls=${[]}&fileUrls=${fileUrls}`,
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      body: formData,
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PatchKnowledgesAPI(id, fileUrls, formData) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      await patchKnowledges(accessToken, id, fileUrls, formData);

      alert("수정 완료");
      window.history.back();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await patchKnowledges(newAccessToken, id, fileUrls, formData);

          alert("수정 완료");
          window.history.back();
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
