import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function deletePaperComments(accessToken, libraryPostId, commentId) {
  return fetch(
    API_SERVER_DOMAIN +
      `/api/library-posts/${libraryPostId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to pdelete activies");
    }
    return response.json();
  });
}

export default async function DeletePaperCommentsAPI(libraryPostId, commentId) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await deletePaperComments(accessToken, libraryPostId, commentId);

      alert("삭제 완료");
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await deletePaperComments(newAccessToken, libraryPostId, commentId);

          alert("삭제 완료");
          window.location.reload();
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
    window.location.href = "/";
  }
}
