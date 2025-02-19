import { setCookie } from "../cookies.tsx";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default function LogInAPI(studentId: number, password: string) {
  fetch(`${API_SERVER_DOMAIN}/api/members/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      studentId: studentId,
      password: password,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("LogIn failed");
      }

      // JSON 데이터를 파싱해 로그 데이터 출력 (필요하다면 추가 작업)
      const data = await response.json();
      console.log("LogIn success:", data);

      // 토큰을 응답 헤더에서 가져옴
      const accessToken = response.headers
        .get("authorization")
        ?.replace("Bearer ", "");
      const refreshToken = response.headers.get("refresh-token");

      if (!accessToken || !refreshToken) {
        throw new Error("Tokens are missing from the response headers.");
      }

      // 쿠키에 토큰 저장
      setCookie("accessToken", accessToken, {
        path: "/",
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1일 뒤 삭제
      });
      setCookie("refreshToken", refreshToken, {
        path: "/",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 2일 뒤 삭제
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 100); // 100ms 딜레이
    })
    .catch((error) => {
      console.error("LogIn failed:", error);
      alert("아이디나 비밀번호를 다시 확인해주세요.");
    });
}
