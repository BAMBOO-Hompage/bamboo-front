var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
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
      return data.accessToken;
    });
}

export default function checkAuth() {
  var accessToken = getCookie("accessToken");
  var refreshToken = getCookie("refreshToken");

  if (!accessToken) {
    if (refreshToken) {
      getAccessTokenWithRefreshToken(accessToken, refreshToken)
        .then((newAccessToken) => {
          return 1;
        })
        .catch((error) => {
          console.error("Failed to refreshToken", error);
          return 0;
        });
    } else {
      return 0;
    }
  }

  return 1;
}
