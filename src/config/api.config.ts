/**
 * API Configuration
 * 
 * 환경 변수를 통해 API 서버 URL을 관리합니다.
 * 
 * Local: http://localhost:8080
 * Production: https://api.smu-bamboo.com
 */

export const API_SERVER_DOMAIN = 
  process.env.REACT_APP_API_URL || "https://api.smu-bamboo.com";

export default API_SERVER_DOMAIN;

