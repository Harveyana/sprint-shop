import React from "react";
import styled from "styled-components";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
`;

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
};

export default Button;
