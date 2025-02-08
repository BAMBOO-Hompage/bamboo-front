var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default async function VerificationRequestsAPI(
  email: string
): Promise<boolean> {
  console.log(email);

  try {
    const response = await fetch(
      API_SERVER_DOMAIN + "/api/emails/verification-requests?email=" + email,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("valid email failed");
    }

    console.log(response);
    return true; // 성공 시 true 반환
  } catch (error) {
    console.error(error);
    alert("이메일 전송에 실패하였습니다");
    return false; // 실패 시 false 반환
  }
}
