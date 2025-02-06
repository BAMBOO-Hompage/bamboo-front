var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function GetActivitiesAPI(year, page) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN +
        `/api/main-activities/year?year=${year}&page=${page}&size=3`,
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
