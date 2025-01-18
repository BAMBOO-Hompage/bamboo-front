var API_SERVER_DOMAIN = "http://52.78.239.177:8080";

// signup.tsx
export default async function SignupAPI(
  email: string,
  password: string,
  name: string,
  major: string,
  studentId: number,
  phoneNumber: number
) {
  // event.preventDefault(); // 기본 제출 동작을 막습니다.

  // 사용자가 입력한 이메일과 비밀번호를 가져옵니다.
  var email: string = email;
  var password: string = password;
  var name: string = name;
  var major: string = major;
  var studentId: number = studentId;
  var phoneNumber: number = phoneNumber;

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

    if (!signupResponse.ok) {
      throw new Error("Signup failed");
    }

    // 회원가입이 성공하면 다음 동작을 수행합니다.
    alert("회원가입에 성공하였습니다.");
    window.location.href = "/login";
  } catch (error) {
    alert("회원가입 중 오류가 발생했습니다." + error);
  }
}
