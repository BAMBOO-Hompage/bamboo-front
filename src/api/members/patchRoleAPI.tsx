import { setCookie, getCookie, removeCookie } from "../cookies.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
  return fetch(API_SERVER_DOMAIN + `/auth/reissue`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken,
      "Refresh-Token": refreshToken,
    },
    body: JSON.stringify({}),
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        alert("-1: Fail Get AccessToken With RefreshToken");
        throw new Error("Failed to refresh access token");
      }
      return response.text();
    })
    .then((newAccessToken) => {
      setCookie("accessToken", newAccessToken, {
        path: "/",
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 1일 뒤 삭제
      });

      return newAccessToken;
    });
}

async function patchRole(accessToken, memberId, role) {
  return fetch(API_SERVER_DOMAIN + `/api/members/${memberId}/role`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      memberId: memberId,
      role: role,
    }),
  }).then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to patch password");
    }
    return response.json();
  });
}

export default async function PatchPasswordAPI(updatedMembers) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      console.log(updatedMembers);

      for (let i = 0; i < updatedMembers.length; i++) {
        const memberId = updatedMembers[i].id;
        const role = updatedMembers[i].role;
        await patchRole(accessToken, memberId, role);
      }
      alert("변경 사항이 저장되었습니다.");
      window.location.reload();
      return;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert("Refresh accessToken");

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );
          console.log(newAccessToken);

          for (let i = 0; i < updatedMembers.length; i++) {
            const memberId = updatedMembers[i].id;
            const role = updatedMembers[i].role;
            await patchRole(accessToken, memberId, role);
          }
          alert("변경 사항이 저장되었습니다.");
          window.location.reload();
          return;
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          alert("다시 로그인 해주세요.");
          removeCookie("accessToken");
          removeCookie("refreshToken");
          window.location.href = "/";
        }
      } else {
        alert("다시 로그인 해주세요.");
        window.location.href = "/";
      }
    }
  } else {
    alert("다시 로그인 해주세요.");
    window.location.href = "/";
  }
}
