var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

export default async function VerificationRequestsAPI(email: string) {
  console.log(email);
  fetch(
    API_SERVER_DOMAIN + "/api/emails/verification-requests?email=" + email,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("valid email failed");
      }
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      alert("이메일 전송에 실패하였습니다");
      return 0;
    });
}
