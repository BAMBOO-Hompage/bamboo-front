var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function GetCohortAPI(batch) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN + `/api/cohorts/batch/${batch}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get activities");
    }

    const data = await response.json();
    console.log(data.result);

    return data.result;
  } catch (error) {
    console.error(error);
    alert("서버 오류 발생");
    window.location.href = "/";
    return;
  }
}
