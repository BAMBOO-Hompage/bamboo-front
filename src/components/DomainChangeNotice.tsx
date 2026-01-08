import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface DomainChangeNoticeProps {
  onClose?: () => void;
}

export default function DomainChangeNotice({ onClose }: DomainChangeNoticeProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem("domainChangeNoticeHideUntil");
    const now = new Date().getTime();

    if (!hideUntil || now > parseInt(hideUntil)) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const handleHideToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem("domainChangeNoticeHideUntil", tomorrow.getTime().toString());
    handleClose();
  };

  const handleHideForever = () => {
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    localStorage.setItem("domainChangeNoticeHideUntil", nextYear.getTime().toString());
    handleClose();
  };

  if (!isVisible) return null;

  return (
    <Overlay onClick={handleClose}>
      {/* 배경 Blur 효과 */}
      <BlurCircle style={{ top: "15%", left: "20%", width: "200px", height: "200px" }} />
      <BlurCircle style={{ top: "60%", right: "15%", width: "250px", height: "250px" }} color="#297FB8" />
      <BlurCircle style={{ bottom: "10%", left: "35%", width: "180px", height: "180px" }} />
      
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </CloseButton>
        
        {/* 캐릭터 이미지 */}
        <CharacterSection>
          <CharacterImage src="/img/bamoo_mascot.gif" alt="BAMBOO Mascot" />
          <CharacterGlow />
        </CharacterSection>

        <Title>도메인 변경 안내</Title>

        <Content>
          <DomainChangeBox>
            <DomainSection>
              <CurrentDomain>
                <span>https://smu-bamboo.com</span>
              </CurrentDomain>
            </DomainSection>
            
            <ArrowSection>
              <ArrowIcon>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 4V20M12 20L18 14M12 20L6 14" stroke="#2CC295" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ArrowIcon>
            </ArrowSection>
            
            <DomainSection>
              <NewDomain>
                <span>https://smu-bamboo.uk</span>
                <NewBadge>NEW</NewBadge>
              </NewDomain>
            </DomainSection>
          </DomainChangeBox>

          <InfoRow>
            <InfoLabel>📅 변경 예정일</InfoLabel>
            <InfoValue>2026년 1월 19일</InfoValue>
          </InfoRow>

          <NoticeBox>
            <NoticeItem>
              <Bullet>•</Bullet>
              <NoticeText>즐겨찾기를 새 주소로 변경해주세요</NoticeText>
            </NoticeItem>
            <NoticeItem>
              <Bullet>•</Bullet>
              <NoticeText>모든 데이터와 기능은 동일합니다</NoticeText>
            </NoticeItem>
          </NoticeBox>
        </Content>

        <ButtonGroup>
          <TodayButton onClick={handleHideToday}>
            오늘 하루 보지 않기
          </TodayButton>
          <ConfirmButton onClick={handleHideForever}>
            <span>확인했습니다</span>
            <ButtonGlow />
          </ConfirmButton>
        </ButtonGroup>
      </ModalContainer>
    </Overlay>
  );
}

// ==================== Styled Components ====================

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  backdrop-filter: blur(10px);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const BlurCircle = styled.div<{ color?: string }>`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => props.color || "#2CC295"};
  filter: blur(80px);
  opacity: 0.4;
  pointer-events: none;
  animation: float 6s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const ModalContainer = styled.div`
  background: #111015;
  border-radius: 30px;
  padding: 40px;
  max-width: 500px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 
    inset -10px -10px 30px rgba(36, 36, 36, 0.5),
    inset 15px 15px 30px rgba(0, 0, 0, 0.5),
    0 30px 80px rgba(0, 0, 0, 0.8);
  position: relative;
  border: 1px solid rgba(44, 194, 149, 0.1);
  animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);

  @keyframes modalSlideUp {
    from {
      transform: translateY(100px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(17, 16, 21, 0.5);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #2CC295;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #25a577;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(17, 16, 21, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #888;
  transition: all 0.3s;
  box-shadow: inset -5px -5px 15px rgba(36, 36, 36, 0.5),
              inset 5px 5px 15px rgba(0, 0, 0, 0.5);

  &:hover {
    color: #2CC295;
    border-color: #2CC295;
    transform: rotate(90deg);
    box-shadow: 0 0 20px rgba(44, 194, 149, 0.3);
  }

  &:active {
    transform: rotate(90deg) scale(0.95);
  }
`;

const CharacterSection = styled.div`
  text-align: center;
  margin: -20px 0 30px 0;
  position: relative;
`;

const CharacterImage = styled.img`
  width: 180px;
  height: auto;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 25px rgba(44, 194, 149, 0.7));
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-15px);
    }
  }
`;

const CharacterGlow = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(44, 194, 149, 0.4) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: glowPulse 2s ease-in-out infinite;

  @keyframes glowPulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.15);
      opacity: 0.6;
    }
  }
`;

const Title = styled.h2`
  font-family: "Suit-Bold", sans-serif;
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin: 0 0 30px 0;
  letter-spacing: -0.5px;
`;

const Content = styled.div`
  margin-bottom: 24px;
`;

const DomainChangeBox = styled.div`
  background: rgba(17, 16, 21, 0.5);
  border-radius: 20px;
  padding: 24px;
  margin: 0 0 20px 0;
  box-shadow: 
    inset -10px -10px 30px rgba(36, 36, 36, 0.5),
    inset 15px 15px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(44, 194, 149, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(44, 194, 149, 0.05) 0%, transparent 70%);
    animation: rotate 10s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const DomainSection = styled.div`
  position: relative;
  z-index: 1;
`;

const CurrentDomain = styled.div`
  font-family: "Suit-Regular", monospace;
  font-size: 15px;
  color: #888;
  padding: 14px 18px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  text-decoration: line-through;
  text-align: center;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
`;

const NewDomain = styled.div`
  font-family: "Suit-Bold", monospace;
  font-size: 17px;
  color: #2CC295;
  padding: 16px 18px;
  background: linear-gradient(135deg, rgba(44, 194, 149, 0.2) 0%, rgba(41, 127, 184, 0.15) 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 
    0 0 25px rgba(44, 194, 149, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent);
    animation: shine 3s infinite;
  }

  @keyframes shine {
    to { left: 100%; }
  }
`;

const NewBadge = styled.span`
  background: #2CC295;
  color: #000;
  font-size: 10px;
  font-family: "Suit-Bold", sans-serif;
  padding: 4px 8px;
  border-radius: 12px;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 10px rgba(44, 194, 149, 0.5);
  animation: badgePulse 2s ease-in-out infinite;

  @keyframes badgePulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }
`;

const ArrowSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 18px 0;
`;

const ArrowIcon = styled.div`
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
`;

const InfoRow = styled.div`
  background: rgba(17, 16, 21, 0.5);
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  box-shadow: 
    inset -5px -5px 15px rgba(36, 36, 36, 0.3),
    inset 5px 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const InfoLabel = styled.div`
  font-family: "Suit-Medium", sans-serif;
  font-size: 14px;
  color: #aaa;
`;

const InfoValue = styled.div`
  font-family: "Suit-Bold", sans-serif;
  font-size: 14px;
  color: #2CC295;
  text-shadow: 0 0 10px rgba(44, 194, 149, 0.3);
`;

const NoticeBox = styled.div`
  background: rgba(17, 16, 21, 0.3);
  border-radius: 12px;
  padding: 18px;
  border: 1px solid rgba(44, 194, 149, 0.15);
`;

const NoticeItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Bullet = styled.span`
  color: #2CC295;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 1px;
`;

const NoticeText = styled.span`
  font-family: "Suit-Light", sans-serif;
  font-size: 13px;
  color: #bbb;
  line-height: 1.6;
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const BaseButton = styled.button`
  flex: 1;
  padding: 16px 24px;
  border-radius: 16px;
  font-family: "Suit-SemiBold", sans-serif;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  border: none;

  &:active {
    transform: scale(0.97);
  }
`;

const TodayButton = styled(BaseButton)`
  background: rgba(17, 16, 21, 0.5);
  color: #999;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    inset -5px -5px 15px rgba(36, 36, 36, 0.5),
    inset 5px 5px 15px rgba(0, 0, 0, 0.5);

  &:hover {
    color: #fff;
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 
      inset -5px -5px 15px rgba(36, 36, 36, 0.5),
      inset 5px 5px 15px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(255, 255, 255, 0.1);
  }
`;

const ConfirmButton = styled(BaseButton)`
  background: linear-gradient(135deg, #2CC295 0%, #25a577 100%);
  color: #000;
  font-family: "Suit-Bold", sans-serif;
  box-shadow: 0 8px 25px rgba(44, 194, 149, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    box-shadow: 0 10px 35px rgba(44, 194, 149, 0.6);
    transform: translateY(-2px);
  }

  span {
    position: relative;
    z-index: 2;
  }
`;

const ButtonGlow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;

  ${ConfirmButton}:hover & {
    opacity: 1;
  }
`;

// 배포 준비 완료
