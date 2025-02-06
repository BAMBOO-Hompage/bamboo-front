var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

// signup.tsx
export default async function SignupAPI(
  email: string,
  password: string,
  name: string,
  major: string,
  studentId: string,
  phoneNumber: string
) {
  console.log(email, password, name, major, studentId, phoneNumber);

  try {
    // 서버에 회원가입 요청을 보냅니다.
    let signupResponse = await fetch(
      API_SERVER_DOMAIN + "/api/members/sign-up",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
          major: major,
          studentId: studentId,
          phoneNumber: phoneNumber,
        }),
      }
    );
    console.log(email, password, name, major, studentId, phoneNumber);
    console.log(signupResponse);

    if (!signupResponse.ok) {
      throw new Error("Signup failed");
    }
    // 회원가입이 성공하면 다음 동작을 수행합니다.
    alert("회원가입에 성공하였습니다.");
    window.location.href = "/login";
    return signupResponse.json();
  } catch (error) {
    alert("회원가입 중 오류가 발생했습니다: " + error);
  }
}
