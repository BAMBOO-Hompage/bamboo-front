import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postPapers(
  accessToken,
  paperName,
  link,
  year,
  topic,
  tagNames,
  content
) {
  return fetch(API_SERVER_DOMAIN + "/api/library-posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      link: link,
      year: year,
      paperName: paperName,
      topic: topic,
      content: content,
      tagNames: tagNames,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PostPapersAPI(
  paperName,
  link,
  year,
  topic,
  tagNames,
  content
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      await postPapers(
        accessToken,
        paperName,
        link,
        year,
        topic,
        tagNames,
        content
      );

      alert("작성 완료");
      window.location.href = "/alexandria?tab=&search=&page=1&size=10";
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          await postPapers(
            newAccessToken,
            paperName,
            link,
            year,
            topic,
            tagNames,
            content
          );

          alert("작성 완료");
          window.location.href = "/alexandria?tab=&search=&page=1&size=10";
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
