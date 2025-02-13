import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";

import { getCookie } from "../api/cookies.tsx";
import LogOutAPI from "../api/members/logOutAPI.tsx";

import "../App.css";

type NavType =
  | "main"
  | "community"
  | "aboutUs"
  | "dataCenter"
  | "study"
  | "myPage";

type NavProps = { type?: NavType };

export default function Nav(props: NavProps) {
  const { type } = props;

  const [hover, setHover] = useState(false);
  const [currentFocus, setCurrentFocus] = useState("");
  const [checkAuth, setCheckAuth] = useState<number | undefined>(undefined);
  const [isMenuActive, setIsMenuActive] = useState(false); // 메뉴 상태 관리
  const [hamburgerMenu, setHamburgerMenu] = useState<NavType | undefined>(
    props.type
  );

  useEffect(() => {
    var accessToken = getCookie("accessToken");

    if (!accessToken) {
      setCheckAuth(0);
    } else {
      setCheckAuth(1);
    }
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: " 0",
        width: "100%",
        zIndex: "100",
      }}
      onMouseLeave={() => setHover(false)}
    >
      <div
        style={{
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111015",
          borderBottom: hover ? "2px solid #555" : "none",
        }}
      >
        <div style={{ position: "absolute", left: "6%" }}>
          <Link to="/">
            <img
              src="../img/nav_logo.png"
              alt="nav_logo"
              style={{
                width: "100px",
                height: "30px",
              }}
            />
          </Link>
        </div>

        {/* 네비게이션 메뉴 */}
        <div
          className="nav_menu"
          style={{ width: "680px" }}
          onMouseEnter={() => setHover(true)}
        >
          <div
            className="nav_text"
            style={
              props.type === "aboutUs"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : currentFocus === "aboutUs"
                ? {
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
          >
            About Us
          </div>
          <div
            className="nav_text"
            style={
              props.type === "study"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : currentFocus === "study"
                ? {
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
          >
            Study
          </div>
          <div
            className="nav_text"
            style={
              props.type === "dataCenter"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : currentFocus === "dataCenter"
                ? {
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
          >
            Data Center
          </div>
          <div
            className="nav_text"
            style={
              props.type === "community"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : currentFocus === "community"
                ? {
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
          >
            Community
          </div>
        </div>
        {checkAuth === 1 ? (
          <div className="nav_menu_logInOut">
            <Link
              to="/personalInfo?edit=&changePassword="
              style={{ textDecoration: "none" }}
            >
              <div
                className="nav_text"
                style={
                  props.type === "myPage"
                    ? {
                        color: "#2CC295",
                        textShadow: "0 0 0.1em, 0 0 0.3em",
                        borderBottom: "2px solid #2cc295",
                      }
                    : {}
                }
              >
                MyPage
              </div>
            </Link>
            <img
              src="../img/btn/logout_disabled.png"
              alt="logOut"
              style={{
                width: "35px",
                padding: "0 20px",
                opacity: "0.6",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onClick={() => {
                LogOutAPI();
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
            />
          </div>
        ) : checkAuth === 0 ? (
          <div className="nav_menu_logInOut">
            <Button
              type="logIn"
              size="logIn"
              title="Log In"
              onClick={() => {
                window.location.href = "/logIn";
              }}
            />
          </div>
        ) : (
          <></>
        )}

        {/* 햄버거 메뉴 */}
        <div
          className="hamburger"
          style={{
            position: "absolute",
            right: "20px",
          }}
          onClick={() => setIsMenuActive(!isMenuActive)}
        >
          <img
            src="../img/icon/hamburger.png"
            alt="hamburger"
            style={{ width: "30px", cursor: "pointer" }}
          />
        </div>
      </div>

      <div
        className="hamburger"
        style={{
          position: "absolute",
          top: "60px",
          right: "0",
          width: isMenuActive ? "100%" : "0",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        onClick={() => setIsMenuActive(!isMenuActive)}
      ></div>
      <div
        className="hamburger"
        style={{
          position: "absolute",
          right: isMenuActive ? "0" : "-280px",
          width: "280px",
          height: "100vh",
          backgroundColor: "#000",
          opacity: "1",
          transition: "right 0.3s ease",
          textAlign: "left",
        }}
      >
        <div
          style={{
            minWidth: "100px",
            margin: "40px 50px 0 30px",
          }}
        >
          <div
            className="hamburger_text"
            style={
              hamburgerMenu === "aboutUs"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
            onClick={() => {
              if (hamburgerMenu !== "aboutUs") {
                setHamburgerMenu("aboutUs");
              } else {
                setHamburgerMenu(undefined);
              }
            }}
          >
            About Us
          </div>
          <div
            style={{
              maxHeight: hamburgerMenu === "aboutUs" ? "110px" : "0",
              overflow: "hidden",
              transition: "max-height 0.4s ease-out",
            }}
          >
            <Link to="/introduction" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs" style={{ marginTop: "20px" }}>
                동아리 소개
              </div>
            </Link>
            <Link
              to="/activity?year=&page=1"
              style={{ textDecoration: "none" }}
            >
              <div className="hamburger_tabs">주요 활동</div>
            </Link>
            <Link to="/joinUs" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs">지원 안내</div>
            </Link>
          </div>
        </div>
        <div
          style={{
            minWidth: "100px",
            margin: "25px 50px 20px 30px",
          }}
        >
          <div
            className="hamburger_text"
            style={
              hamburgerMenu === "study"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
            onClick={() => {
              if (hamburgerMenu !== "study") {
                setHamburgerMenu("study");
              } else {
                setHamburgerMenu(undefined);
              }
            }}
          >
            Study
          </div>
          <div
            style={{
              height: hamburgerMenu === "study" ? "110px" : "0",
              overflow: "hidden",
              transition: "height 0.4s ease-out",
            }}
          >
            <Link to="/curriculumStudy" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs" style={{ marginTop: "20px" }}>
                커리큘럼 스터디
              </div>
            </Link>
            <Link to="/selfStudy" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs">자율 스터디</div>
            </Link>
            <Link to="/studyRecruitment" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs">스터디 모집</div>
            </Link>
          </div>
        </div>
        <div
          style={{
            minWidth: "100px",
            margin: "25px 50px 20px 30px",
          }}
        >
          <div
            className="hamburger_text"
            style={
              hamburgerMenu === "dataCenter"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
            onClick={() => {
              if (hamburgerMenu !== "dataCenter") {
                setHamburgerMenu("dataCenter");
              } else {
                setHamburgerMenu(undefined);
              }
            }}
          >
            Data Center
          </div>
          <div
            style={{
              height: hamburgerMenu === "dataCenter" ? "110px" : "0",
              overflow: "hidden",
              transition: "height 0.4s ease-out",
            }}
          >
            <Link
              to="/alexandria?tab=&search=&page=1&size=10"
              style={{ textDecoration: "none" }}
            >
              <div className="hamburger_tabs" style={{ marginTop: "20px" }}>
                알렉산드리아 도서관
              </div>
            </Link>
            <Link to="/hallOfFame" style={{ textDecoration: "none" }}>
              <div className="hamburger_tabs">명예의 전당</div>
            </Link>
          </div>
        </div>
        <div
          style={{
            minWidth: "100px",
            margin: "25px 50px 20px 30px",
          }}
        >
          <div
            className="hamburger_text"
            style={
              hamburgerMenu === "community"
                ? {
                    color: "#2CC295",
                    textShadow: "0 0 0.1em, 0 0 0.3em",
                    borderBottom: "2px solid #2cc295",
                  }
                : {}
            }
            onClick={() => {
              if (hamburgerMenu !== "community") {
                setHamburgerMenu("community");
              } else {
                setHamburgerMenu(undefined);
              }
            }}
          >
            Community
          </div>
          <div
            style={{
              height: hamburgerMenu === "community" ? "110px" : "0",
              overflow: "hidden",
              transition: "height 0.4s ease-out",
            }}
          >
            <Link
              to="/notice?post=전체&page=1&size=8"
              style={{ textDecoration: "none" }}
              onClick={() => sessionStorage.clear()}
            >
              <div className="hamburger_tabs" style={{ marginTop: "20px" }}>
                공지 사항
              </div>
            </Link>
            <Link
              to="/knowledge?post=전체&search=&page=1&size=8"
              style={{ textDecoration: "none" }}
            >
              <div className="hamburger_tabs">정보 공유</div>
            </Link>
          </div>
        </div>

        {checkAuth === 0 ? (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "30px",
              minWidth: "100px",
            }}
          >
            <Link to="/logIn" style={{ textDecoration: "none" }}>
              <div className="hamburger_text">Log In</div>
            </Link>
          </div>
        ) : checkAuth === 1 ? (
          <div
            style={{
              position: "absolute",
              bottom: "80px",
              left: "30px",
              minWidth: "100px",
            }}
          >
            <Link
              to="/personalInfo?edit=&changePassword="
              style={{ textDecoration: "none" }}
            >
              <div
                className="hamburger_text"
                style={
                  hamburgerMenu === "myPage"
                    ? {
                        color: "#2CC295",
                        textShadow: "0 0 0.1em, 0 0 0.3em",
                      }
                    : {}
                }
              >
                MyPage
              </div>
            </Link>
            <div
              className="hamburger_text"
              onClick={() => {
                LogOutAPI();
              }}
              style={{ marginTop: "25px" }}
            >
              Log Out
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div
        style={{
          width: "100%",
          height: hover ? "150px" : "0",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#151515",
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        <div
          style={{ width: "680px", display: "flex" }}
          onMouseEnter={() => setHover(true)}
        >
          <div
            className="nav_list"
            style={{ borderLeft: "1px solid #777" }}
            onMouseEnter={() => setCurrentFocus("aboutUs")}
            onMouseLeave={() => setCurrentFocus("")}
          >
            <Link to="/introduction" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">동아리 소개</div>
            </Link>
            <Link
              to="/activity?year=&page=1"
              style={{ textDecoration: "none" }}
            >
              <div className="nav_tabs">주요 활동</div>
            </Link>
            <Link to="/joinUs" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">지원 안내</div>
            </Link>
          </div>
          <div
            className="nav_list"
            onMouseEnter={() => setCurrentFocus("study")}
            onMouseLeave={() => setCurrentFocus("")}
          >
            <Link to="/curriculumStudy" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">커리큘럼 스터디</div>
            </Link>
            <Link to="/selfStudy" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">자율 스터디</div>
            </Link>
            <Link to="/studyRecruitment" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">스터디 모집</div>
            </Link>
          </div>
          <div
            className="nav_list"
            onMouseEnter={() => setCurrentFocus("dataCenter")}
            onMouseLeave={() => setCurrentFocus("")}
          >
            <Link
              to="/alexandria?tab=&search=&page=1&size=10"
              style={{ textDecoration: "none" }}
            >
              <div className="nav_tabs">알렉산드리아 도서관</div>
            </Link>
            <Link to="/hallOfFame" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">명예의 전당</div>
            </Link>
          </div>
          <div
            className="nav_list"
            onMouseEnter={() => setCurrentFocus("community")}
            onMouseLeave={() => setCurrentFocus("")}
          >
            <Link
              to="/notice?post=전체&page=1&size=8"
              style={{ textDecoration: "none" }}
              onClick={() => sessionStorage.clear()}
            >
              <div className="nav_tabs">공지 사항</div>
            </Link>
            <Link
              to="/knowledge?post=전체&search=&page=1&size=8"
              style={{ textDecoration: "none" }}
            >
              <div className="nav_tabs">정보 공유</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
