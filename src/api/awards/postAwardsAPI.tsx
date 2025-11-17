import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postAwards(
  accessToken,
  isMidterm,
  batch,
  inventoryId,
  subjectName,
  section,
  memberId
) {
  return fetch(API_SERVER_DOMAIN + "/api/awards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      isMidterm: isMidterm,
      batch: batch,
      inventoryId: inventoryId,
      subjectName: subjectName,
      section: section,
      memberId: memberId,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PostAwardsAPI(
  isMidterm,
  batch,
  inventoryId,
  subjectName,
  section,
  memberId
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log(
        isMidterm,
        batch,
        inventoryId,
        subjectName,
        section,
        memberId
      );
      await postAwards(
        accessToken,
        isMidterm,
        batch,
        inventoryId,
        subjectName,
        section,
        memberId
      );

      alert("작성 완료");
      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postAwards(
            newAccessToken,
            isMidterm,
            batch,
            inventoryId,
            subjectName,
            section,
            memberId
          );

          alert("작성 완료");
          window.location.reload();
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          // removeCookie("accessToken");
          // removeCookie("refreshToken");
          // window.location.href = "/";
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
