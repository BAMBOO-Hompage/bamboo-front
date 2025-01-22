var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

export default async function GetActivitiesAPI(year, page) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN + `/api/main-activities/year?year=${year}&page=${page}`,
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
    return null; // 에러 발생 시 null을 반환하거나 에러 처리에 맞는 값을 반환
  }
}
