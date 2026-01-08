import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";
import API_SERVER_DOMAIN from "../../config/api.config";

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
