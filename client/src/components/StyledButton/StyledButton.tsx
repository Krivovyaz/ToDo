import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "./StyledButton.styles";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
}

export const StyledButton: FC<Props> = ({ children, onClick, ...props }) => {
  return (
    <Button onClick={onClick} {...props}>
      {children}
    </Button>
  );
};
