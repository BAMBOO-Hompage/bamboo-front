import { getCookie } from "../cookies.tsx";

var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

async function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
  return fetch(API_SERVER_DOMAIN + "/auth/reissue", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

function postActivities(accessToken, formData) {
  return fetch(API_SERVER_DOMAIN + "/api/main-activities", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post activies");
    }
    return response.json();
  });
}

export default async function PostActivitiesAPI(formData) {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (accessToken) {
    try {
      // FormData 확인
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await postActivities(accessToken, formData);

      alert("작성 완료");
      window.location.href = "/activity";

      return 0;
    } catch (error) {
      if (refreshToken) {
        try {
          console.error("accessToken expiration: ", error);
          alert("Refresh accessToken");

          const newAccessToken = await getAccessTokenWithRefreshToken(
            accessToken,
            refreshToken
          );

          await postActivities(newAccessToken, formData);

          alert("작성 완료");
          window.location.href = "/activity";
        } catch (error) {
          console.error("Failed to refresh accessToken: ", error);
          window.location.href = "/activity";
        }
      } else {
        window.location.href = "/activity";
      }
    }
  } else {
    window.location.href = "/activity";
  }
}
