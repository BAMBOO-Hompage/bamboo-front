// 아직 api 연결 안함 확인 필요함
import { getCookie, removeCookie } from "../cookies.tsx";
import getAccessTokenWithRefreshToken from "../getAccessTokenWithRefreshToken.tsx";

const API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

async function postStudyRecruit(accessToken: string, formData: FormData) {
  const res = await fetch(`${API_SERVER_DOMAIN}/api/studies-recruitments`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to post study recruitment");
  return res.json();
}

/**
 * 성공 시: /study/recruitment?keyword=전체&page=1&size=8 로 이동
 * SPA이면 navigate를 주입해서 부드럽게 이동, 아니면 window.location.href 사용
 */
export default async function PostStudyRecruitAPI(
  formData: FormData,
  navigate?: (to: string, opts?: { replace?: boolean }) => void
) {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  const target = `/study/recruitment?keyword=${encodeURIComponent(
    "전체"
  )}&page=1&size=8`;

  const go = () =>
    navigate ? navigate(target) : (window.location.href = target);

  if (!accessToken) {
    alert("다시 로그인 해주세요.");
    removeCookie("refreshToken");
    window.location.href = "/";
    return;
  }

  try {
    await postStudyRecruit(accessToken, formData);
    alert("작성 완료");
    go();
  } catch (err) {
    if (!refreshToken) {
      alert("다시 로그인 해주세요.");
      removeCookie("accessToken");
      window.location.href = "/";
      return;
    }
    try {
      const newAccessToken = await getAccessTokenWithRefreshToken(
        accessToken,
        refreshToken
      );
      await postStudyRecruit(newAccessToken, formData);
      alert("작성 완료");
      go();
    } catch (e) {
      console.error("Failed to refresh accessToken:", e);
      alert("다시 로그인 해주세요.");
      removeCookie("accessToken");
      removeCookie("refreshToken");
      window.location.href = "/";
    }
  }
}
