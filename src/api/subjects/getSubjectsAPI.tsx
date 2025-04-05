var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function GetSubjectsAPI(isBook, batch) {
  try {
    const params = new URLSearchParams();

    if (typeof isBook === "boolean") {
      params.append("커리큘럼 유무", isBook ? "true" : "false");
    }
    params.append("기수", batch.toString());
    console.log(params.toString());

    const response = await fetch(
      API_SERVER_DOMAIN + `/api/subjects?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get subjects");
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
