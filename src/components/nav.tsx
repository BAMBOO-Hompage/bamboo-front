import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button.tsx";

import CheckAuthAPI from "../api/checkAuthAPI.tsx";
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
  const [checkAuth, setCheckAuth] = useState<number>(0);

  useEffect(() => {
    CheckAuthAPI().then((response) => {
      if (response === 1) {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
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
        <div style={{ position: "absolute", left: "70px" }}>
          <Link to="/">
            <img
              src="../img/nav_logo.png"
              alt="nav_logo"
              style={{ width: "80px", marginTop: "5px" }}
            />
          </Link>
        </div>
        <div
          style={{ width: "720px", display: "flex" }}
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
                : currentFocus === "joinUs"
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
          <div
            style={{
              position: "absolute",
              right: "0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Link to="/myPage" style={{ textDecoration: "none" }}>
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
              style={{ width: "35px", padding: "0 20px", cursor: "pointer" }}
              onClick={() => {
                LogOutAPI();
              }}
              onMouseOver={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `../img/btn/logout_disabled.png`;
              }}
              onMouseOut={(e) => {
                (
                  e.target as HTMLImageElement
                ).src = `../img/btn/logout_disabled.png`;
              }}
            />
          </div>
        ) : (
          <div style={{ position: "absolute", right: "0" }}>
            <Button
              type="logIn"
              size="logIn"
              title="Log In"
              onClick={() => {
                window.location.href = "/logIn";
              }}
            />
          </div>
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
        {/*#111015*/}
        <div
          style={{ width: "720px", display: "flex" }}
          onMouseEnter={() => setHover(true)}
        >
          <div
            className="nav_list"
            style={{ borderLeft: "1px solid #777" }}
            onMouseEnter={() => setCurrentFocus("joinUs")}
            onMouseLeave={() => setCurrentFocus("")}
          >
            <Link to="/introduction" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">동아리 소개</div>
            </Link>
            <Link to="/activity" style={{ textDecoration: "none" }}>
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
            <Link to="/alexandria" style={{ textDecoration: "none" }}>
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
              to="/notice"
              style={{ textDecoration: "none" }}
              onClick={() => sessionStorage.clear()}
            >
              <div className="nav_tabs">공지사항</div>
            </Link>
            <Link to="/knowledge" style={{ textDecoration: "none" }}>
              <div className="nav_tabs">지식 공유 게시판</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
