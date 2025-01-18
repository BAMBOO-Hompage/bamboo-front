import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";
import "../App.css";

type ButtonType = "primary" | "secondary" | "destructive" | "logIn";
type Size = "small" | "medium" | "large" | "XLarge" | "logIn";

type ButtonProps = {
  onClick?: () => void;
  type?: ButtonType;
  size?: Size;
  title: string;
};

const ButtonContainer = styled.div<{
  type: "primary" | "secondary" | "destructive" | "logIn";
  size: "small" | "medium" | "large" | "XLarge" | "logIn";
}>`
  border: ${(props) => (props.type === "logIn" ? "none" : "none")};
  border-radius: ${(props) => (props.type === "logIn" ? "0" : "20px")};
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  background-color: ${(props) =>
    props.type === "primary"
      ? "#2CC295"
      : props.type === "secondary"
      ? "#A9FFDE"
      : props.type === "destructive"
      ? "#343434"
      : "#2CC295"};
  color: ${(props) =>
    props.type === "primary"
      ? "#fff"
      : props.type === "secondary"
      ? "#000"
      : props.type === "destructive"
      ? "#fff"
      : "#fff"};
  cursor: pointer;

  ${(props) =>
    props.size === "XLarge" &&
    css`
      height: 45px;
      font-size: 18px;
      font-weight: 700;
      width: 490px;
      text-align: center;
    `}
  ${(props) =>
    props.size === "large" &&
    css`
      height: 45px;
      font-size: 18px;
      font-weight: 700;
      width: 390px;
      text-align: center;
    `}
  ${(props) =>
    props.size === "medium" &&
    css`
      height: 40px;
      font-size: 18px;
      width: 180px;
      text-align: center;
    `}
    ${(props) =>
    props.size === "small" &&
    css`
      height: 30px;
      font-size: 16px;
      width: 120px;
      text-align: center;
    `}
    ${(props) =>
    props.size === "logIn" &&
    css`
      height: 60px;
      font-size: 18px;
      width: 180px;
      text-align: center;
    `}
    &:hover {
    & p {
      text-shadow: 0 0 0.1em, 0 0 0.3em;
    }
  }
`;

const ButtonTitle = styled.p`
  font-family: Pretendard-Regular;
`;

export default function Button(props: ButtonProps) {
  const { type, size, title, onClick = () => {} } = props;
  const [hover, setHover] = useState(false);
  return (
    <ButtonContainer
      type={type}
      size={size}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ButtonTitle>{title}</ButtonTitle>
    </ButtonContainer>
  );
}
