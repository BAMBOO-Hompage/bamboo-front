import API_SERVER_DOMAIN from "../../config/api.config";

export default async function GetInventoryAPI(studyId, id, week) {
  try {
    const response = await fetch(
      API_SERVER_DOMAIN +
        `/api/inventories/studies/${studyId}/members/${id}/week/${week}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.json().then((data) => {
      if (response.status === 404) {
        console.log(data.result);
        return data.result;
      }
      if (!response.ok) {
        throw new Error("Failed to get inventory");
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
