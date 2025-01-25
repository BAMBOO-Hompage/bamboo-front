import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import PersonalInfo from "../tabs/myPage/personalInfo.tsx";
import MembershipManagement from "../tabs/myPage/membershipManagement.tsx";

import Nav from "../components/nav.tsx";
import BottomInfo from "../components/bottomInfo.tsx";

import GetMembersAPI from "../api/members/getMembersAPI.tsx";
import "../App.css";

type Members = {
  id: number;
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
};

export default function MyPage() {
  const [postList, setPostList] = useState<string>("개인 정보");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [membersToDisplay, setMembersToDisplay] = useState<Members[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState(1);

  const maxVisiblePages = 5;

  const startPage =
    Math.floor(currentPage - 1 / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    GetMembersAPI(currentPage - 1).then((result) => {
      var memberData = result.content;
      setMembersToDisplay(memberData);
      setTotalPages(result.totalPages);
    });
  }, [currentPage]);

  useEffect(() => {
    // localStorage에서 selected_id를 가져와 상태를 초기화
    const storedIds = JSON.parse(localStorage.getItem("selected_id") || "[]");
    setSelectedIds(storedIds);
  }, []);

  const toggleSelect = (id: number) => {
    let updatedIds: number[];

    if (selectedIds.includes(id)) {
      updatedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      updatedIds = [...selectedIds, id];
    }

    setSelectedIds(updatedIds);
    localStorage.setItem("selected_id", JSON.stringify(updatedIds));
  };

  return (
    <div>
      <Nav type="myPage" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "1000px",
              minHeight: "570px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                minHeight: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                마이페이지
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  style={
                    postList === "개인 정보"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("개인 정보");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  style={
                    postList === "회원 관리"
                      ? {
                          boxSizing: "border-box",
                          color: "#2CC295",
                          borderRight: "1px solid #2cc295",
                        }
                      : {}
                  }
                  onClick={() => {
                    setPostList("회원 관리");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  회원 관리
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              key={postList}
              style={{
                position: "relative",
                width: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              {postList === "개인 정보" ? (
                <PersonalInfo />
              ) : (
                <MembershipManagement />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
