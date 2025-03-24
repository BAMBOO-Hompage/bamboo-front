import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import SelectDeactivateAPI from "../../api/members/selectDeactivateAPI.tsx";
import GetMembersAPI from "../../api/members/getMembersAPI.tsx";
import PatchRoleAPI from "../../api/members/patchRoleAPI.tsx";

import "../../App.css";

type Members = {
  memberId: number;
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
};

const maxVisiblePages = 5;

export default function PersonalInfo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [membersToDisplay, setMembersToDisplay] = useState<Members[]>([]);
  const [changedRoles, setChangedRoles] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [totalPages, setTotalPages] = useState<number>(1);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setSearchParams({ page: page.toString(), size: "10" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    GetMembersAPI(currentPage).then((result) => {
      var memberData = result.content;
      setMembersToDisplay(memberData);
      setTotalPages(result.totalPages);

      // 초기 changedRoles 상태 생성
      const initialChangedRoles = memberData.reduce(
        (acc: { [key: number]: boolean }, member: { id: number }) => {
          acc[member.id] = false; // 모든 멤버의 id에 대해 초기값 false 설정
          return acc;
        },
        {}
      );
      setChangedRoles(initialChangedRoles);
    });
  }, [currentPage]);

  useEffect(() => {
    // localStorage에서 selected_id를 가져와 상태를 초기화
    const storedIds = JSON.parse(localStorage.getItem("selected_id") || "[]");
    setSelectedIds(storedIds);

    // 컴포넌트 언마운트 시 selected_id 초기화
    return () => {
      localStorage.removeItem("selected_id");
    };
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

  const handleRoleChange = (id: number, newRole: string) => {
    setMembersToDisplay((prevMembers) =>
      prevMembers.map((member) =>
        member.memberId === id ? { ...member, role: newRole } : member
      )
    );
    // 역할 변경 여부를 true로 설정
    setChangedRoles((prevChanges) => ({
      ...prevChanges,
      [id]: true,
    }));
  };

  const handleSave = () => {
    const roleDescriptions = {
      ROLE_USER: "비회원",
      ROLE_MEMBER: "일반회원",
      ROLE_ADMIN: "운영진",
      ROLE_OPS: "관리자",
    };

    const updatedMembers = Object.keys(changedRoles)
      .filter((id) => changedRoles[parseInt(id)])
      .map((id) => {
        const member = membersToDisplay.find(
          (m) => m.memberId === parseInt(id)
        );
        return member
          ? {
              memberId: member.memberId,
              studentId: member.studentId,
              name: member.name,
              role: member.role,
            }
          : null;
      })
      .filter((m) => m !== null);

    if (updatedMembers.length > 0) {
      const confirmUpdateRole = window.confirm(
        "변경 사항을 확인해주세요.\n" +
          updatedMembers
            .map(
              (member) =>
                `ID: ${member.memberId}, 학번: ${member.studentId}, 이름: ${
                  member.name
                }, 등급: ${roleDescriptions[member.role] || member.role}`
            )
            .join("\n")
      );
      if (confirmUpdateRole) {
        PatchRoleAPI(updatedMembers);
      }
    } else {
      alert("변경된 내용이 없습니다.");
    }
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
              maxWidth: "1000px",
              padding: "0 20px",
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
                width: "clamp(120px, 20vw, 180px)",
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
                  onClick={() => {
                    window.location.href = "/personalInfo";
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  style={{
                    boxSizing: "border-box",
                    color: "#2CC295",
                    borderRight: "1px solid #2cc295",
                  }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  회원 관리
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href = "/curriculumManagement";
                  }}
                >
                  커리큘럼 관리
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href = "/studyManagement";
                  }}
                >
                  스터디 관리
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
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "clamp(20px, 4vw, 50px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  회원 관리&nbsp;
                  <span
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#FF5005",
                    }}
                  >
                    test 기간동안만 개방합니다. (개인정보 마스킹, 삭제 및 변경
                    제한)
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <div
                    style={{
                      marginRight: "30px",
                      display: selectedIds.length > 0 ? "block" : "none",
                    }}
                  >
                    <Button
                      type="secondary"
                      size="small"
                      title="선택 회원 삭제"
                      onClick={() => {
                        const deleteMember =
                          window.confirm("선택한 회원들을 삭제하시겠습니까?");
                        if (deleteMember) {
                          if (selectedIds.length > 0) {
                            SelectDeactivateAPI(selectedIds);
                          }
                        }
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "right",
                      gap: "10px",
                    }}
                  >
                    <Button
                      type="destructive"
                      size="xsmall"
                      title="취소"
                      onClick={() => {
                        const deleteAdd =
                          window.confirm("변경을 취소하시겠습니까?");
                        if (deleteAdd) {
                          localStorage.removeItem("selected_id");
                          window.location.reload();
                        }
                      }}
                    />
                    <Button
                      type="primary"
                      size="xsmall"
                      title="저장"
                      onClick={handleSave}
                    />
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "40px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Pretendard-Light",
                  fontSize: "16px",
                  color: "#888",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{ flexGrow: 1, flexBasis: "60px", minWidth: "30px" }}
                >
                  선택
                </div>
                <div
                  style={{ flexGrow: 2, flexBasis: "80px", minWidth: "50px" }}
                >
                  등급
                </div>
                <div
                  style={{ flexGrow: 3, flexBasis: "120px", minWidth: "80px" }}
                >
                  학과
                </div>
                <div
                  style={{ flexGrow: 2, flexBasis: "100px", minWidth: "70px" }}
                >
                  학번
                </div>
                <div
                  style={{ flexGrow: 1.5, flexBasis: "70px", minWidth: "40px" }}
                >
                  이름
                </div>
                <div
                  style={{ flexGrow: 3, flexBasis: "140px", minWidth: "100px" }}
                >
                  전화 번호
                </div>
              </div>
              <hr
                style={{
                  height: "1px",
                  background: "#666",
                  border: "none",
                }}
              />
              <div style={{ height: "570px", marginBottom: "100px" }}>
                {membersToDisplay.map((member) => (
                  <div
                    key={member.memberId}
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "50px",
                      marginBottom: "8px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "16px",
                      color: "#fff",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: selectedIds.includes(member.memberId)
                        ? "linear-gradient(175deg, #142B28 -10%, #111015 50%)"
                        : undefined,
                      borderRadius: "10px",
                      gap: "10px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        flexBasis: "60px",
                        minWidth: "30px",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={
                          selectedIds.includes(member.memberId)
                            ? "../img/btn/select_enabled.png"
                            : "../img/btn/select_disabled.png"
                        }
                        alt="select"
                        style={{ width: "25px", cursor: "pointer" }}
                        onClick={() => toggleSelect(member.memberId)}
                      />
                    </div>
                    <div
                      style={{
                        flexGrow: 2,
                        flexBasis: "80px",
                        minWidth: "50px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <select
                        value={member.role}
                        onChange={(e) =>
                          handleRoleChange(member.memberId, e.target.value)
                        }
                        style={{
                          width: "80%",
                          height: "40px",
                          backgroundColor: "transparent",
                          border: "none",
                          fontFamily: "Pretendard-Light",
                          fontSize: "16px",
                          color: changedRoles[member.memberId]
                            ? "#2cc295"
                            : "white",
                          cursor: "pointer",
                        }}
                      >
                        <option
                          value="ROLE_OPS"
                          style={{
                            background: "#111015",
                            cursor: "pointer",
                          }}
                        >
                          관리자
                        </option>
                        <option
                          value="ROLE_ADMIN"
                          style={{
                            background: "#111015",
                            cursor: "pointer",
                          }}
                        >
                          운영진
                        </option>
                        <option
                          value="ROLE_MEMBER"
                          style={{
                            background: "#111015",
                            cursor: "pointer",
                          }}
                        >
                          일반회원
                        </option>
                        <option
                          value="ROLE_USER"
                          style={{
                            background: "#111015",
                            cursor: "pointer",
                          }}
                        >
                          비회원
                        </option>
                      </select>
                    </div>
                    <div
                      style={{
                        flexGrow: 3,
                        flexBasis: "120px",
                        minWidth: "80px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {member.major}
                    </div>
                    <div
                      style={{
                        flexGrow: 2,
                        flexBasis: "100px",
                        minWidth: "70px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {member.studentId}
                    </div>
                    <div
                      style={{
                        flexGrow: 1.5,
                        flexBasis: "70px",
                        minWidth: "50px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {member.name}
                    </div>
                    <div
                      style={{
                        flexGrow: 3,
                        flexBasis: "140px",
                        minWidth: "100px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {member.phone.slice(0, 3)}-{member.phone.slice(3, 7)}-
                      {member.phone.slice(7, 11)}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  width: "100%",
                  maxWidth: "770px",
                  marginTop: "100px",
                  paddingBottom: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <button
                  className="bottom_btn"
                  style={{}}
                  onClick={() => changePage(1)}
                >
                  <img
                    src="../img/btn/pageStart.png"
                    alt="pageStart"
                    style={{
                      height: "12px",
                    }}
                  />
                </button>
                <button
                  className="bottom_btn"
                  style={{}}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <img
                    src="../img/btn/pagePrev.png"
                    alt="pagePrev"
                    style={{
                      height: "12px",
                    }}
                  />
                </button>
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, i) => startPage + i
                ).map((page) => (
                  <button
                    key={page}
                    className="bottom_tabs"
                    onClick={() => changePage(page)}
                    style={
                      page === currentPage
                        ? {
                            textShadow: "0 0 0.1em, 0 0 0.1em",
                            color: "#2CC295",
                          }
                        : {}
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  className="bottom_btn"
                  style={{}}
                  onClick={() => changePage(currentPage + 1)}
                >
                  <img
                    src="../img/btn/pageNext.png"
                    alt="pageNext"
                    style={{
                      height: "12px",
                    }}
                  />
                </button>
                <button
                  className="bottom_btn"
                  style={{}}
                  onClick={() => changePage(totalPages)}
                >
                  <img
                    src="../img/btn/pageEnd.png"
                    alt="pageNext"
                    style={{
                      height: "12px",
                    }}
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
