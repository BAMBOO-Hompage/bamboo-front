import API_SERVER_DOMAIN from "../../config/api.config";

export default async function GetStudiesAPI(batchId, subjectId) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN +
        `/api/studies?batchId=${batchId}&subjectId=${subjectId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to get studies");
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
