import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function patchStudies(
  accessToken,
  studyId,
  subjectId,
  teamName,
  cohort,
  isBook,
  section,
  studyMasterStudentId,
  studyMembers
) {
  return fetch(API_SERVER_DOMAIN + `/api/studies/${studyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      subjectId: subjectId,
      teamName: teamName,
      cohort: cohort,
      isBook: isBook,
      section: section,
      studyMasterStudentId: studyMasterStudentId,
      studyMembers: studyMembers,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PatchStudiesAPI(
  studyId,
  subjectId,
  teamName,
  cohort,
  isBook,
  section,
  studyMasterStudentId,
  studyMembers
) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      let data = await patchStudies(
        accessToken,
        studyId,
        subjectId,
        teamName,
        cohort,
        isBook,
        section,
        studyMasterStudentId,
        studyMembers
      );
      console.log(data.result);

      alert("스터디가 성공적으로 수정되었습니다.");
      window.location.reload();
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          let data = await patchStudies(
            newAccessToken,
            studyId,
            subjectId,
            teamName,
            cohort,
            isBook,
            section,
            studyMasterStudentId,
            studyMembers
          );
          console.log(data.result);

          alert("스터디가 성공적으로 수정되었습니다.");
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
    removeCookie("refreshToken");
    window.location.href = "/";
  }
}
