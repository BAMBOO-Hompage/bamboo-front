import React from "react";
import "../App.css";

// post.tsx
export default function HistoryData() {
  return [
    { year: "2020", events: ["2020.02. [1기] 동아리 '데나무' 개설"] },
    { year: "2021", events: ["[2기] Kaggle, NLP 스터디 시작"] },
    {
      year: "2022",
      events: [
        "[3기] 논문 스터디",
        "SW중심대학 공동 AI 경진대회 참여",
        "KT AI+X 프로그램 참여",
      ],
    },
    { year: "2023", events: ["스터디 상반플러스", "[4기] 파이썬 멘토링"] },
    {
      year: "2024",
      events: ["[5기] 커리큘럼 재정비", "동아리명 'bamboo'로 개편"],
    },
    { year: "2025", events: ["밤부 1, 2회 캐글대회", "밤부 1회 홈커밍"] },
    { year: "2026", events: ["김진석, 김정찬 여기 남다.."] },
  ];
}
