import React, { useState, useEffect } from "react";

var API_SERVER_DOMAIN = "https://api.smu-bamboo.com";

export default function StudyPostAPI() {
  const [studyPostList, setstudyPostList] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudyPostInfo();
        console.log(data);
        alert(1);
        setstudyPostList(data.result);
      } catch (error) {
        console.error("Failed to fetch timetable:", error);
        window.location = "/";
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return { studyPostList, loading };
}

function getStudyPostInfo() {
  return fetch(API_SERVER_DOMAIN + "/api/v1/posts", {
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed");
    }
    return response.json();
  });
}
