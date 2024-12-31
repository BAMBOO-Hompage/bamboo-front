import React from 'react';

var API_SERVER_DOMAIN = 'http://localhost:8080/';

export default function StudyAddAPI() {
    return fetch(API_SERVER_DOMAIN + '/api/v1/posts', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch timetable');
        }
        return response.json();
    });
}

function studyAddAPI(accessToken) {
    return fetch(API_SERVER_DOMAIN + '/api/user/ruleSet', {
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch timetable');
        }
        return response.json();
    });
}