import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function patchImage(accessToken, studyId, week, formData) {
  return fetch(
    API_SERVER_DOMAIN + `/api/studies/${studyId}/weeks/${week}/image`,
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

export default async function PatchImageAPI(studyId, week, formData) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log(studyId, week);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await patchImage(accessToken, studyId, week, formData);

      alert("이미지 등록 완료");
      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await patchImage(newAccessToken, studyId, week, formData);

          alert("이미지 등록 완료");
          window.location.reload();
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인해주세요.");
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
