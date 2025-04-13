var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function GetAwardsAPI(batch) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN + `/api/awards/awards/${batch}/latest`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json().then((data) => {
      if (!response.ok) {
        throw new Error("Failed to get awards");
      }
      console.log(data.result);
      return data.result;
    });
  } catch (error) {
    console.error(error);
    alert("서버 오류 발생");
    window.location.href = "/";
    return;
  }
}
