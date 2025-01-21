var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

export default async function VerificationsAPI(
  email: string,
  authcode: string
): Promise<number> {
  const url =
    API_SERVER_DOMAIN +
    `/api/emails/verifications?email=${email}&authcode=${authcode}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        authcode: authcode,
      }),
    });

    if (!response.ok) {
      throw new Error("valid email failed");
    }
    console.log("Response:", response);
    return 1;
  } catch (error) {
    console.error(error);
    alert("이메일이나 인증코드를 다시 확인해주세요.");
    return 0;
  }
}
