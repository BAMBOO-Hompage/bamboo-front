var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function GetStudyAPI(id) {
  try {
    const response = await fetch(API_SERVER_DOMAIN + `/api/studies/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get study");
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
