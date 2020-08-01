import React from 'react';
import styled from 'styled-components';
import Color from 'color';


interface Variant {
  background: string
  border?: string
  stroke?: string
  text: string
};

const variants:Record<string, Variant> = {
  primary: {
    background: "#00afb9",
    border: "#0081a7",
    text: "#fdfcdc",
  },
  secondary: {
    background: "#bdc0c0",
    text: Color("#bdc0c0").lighten(0.5).hex(),
  },
  red: {
    background: "#c62828",
    text: "#fff",
  },
  blue: {
    background: "#1565c0",
    text: "#fff",
  },
  yellow: {
    background: "#ffab00",
    text: "#fff",
  },
  green: {
    background: "#388e3c",
    text: "#fff",
  },
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

const backgroundColor = ({ variant = "primary" }: Props) => {
  return variants[variant].background;
}

const borderColor = ({ variant = "primary" }: Props) => {
  return variants[variant].border || (
    Color(variants[variant].background).darken(0.5).hex()
  );
}

const strokeColor = ({ variant = "primary" }: Props) => {
  return variants[variant].stroke || (
    Color(variants[variant].background).darken(0.5).hex()
  );
}

const textColor = ({ variant = "primary" }: Props) => {
  return variants[variant].text;
}


const StyledButton = styled.button<Props>`
  display: inline-block;
  font-family: ${props => props.theme.fonts.heading};
  font-size: ${props => props.theme.fontSizes[1]}px;
  font-weight: ${props => props.theme.fontWeights.heading};
  border-color: ${borderColor};
  border-radius: 6px;
  border-width: 2px;
  border-style: solid;
  padding: 4px 16px;
  background: ${backgroundColor};
  transition: transform ease-in-out 200ms;
  text-align: center;
  box-sizing: border-box;
  color: ${textColor};

  &:hover {
    transform: scale(1.2);
  }

  &:disabled {
    opacity: 0.5;
  }
  &:disabled:hover {
    transform: none;
  }
  & > svg {
    height: 100%;
    width: 100%;
    fill: #fdfcdc;
    fill: ${textColor};
    stoke: ${strokeColor};
    stroke-width: 1px;
  }
`

const StyledText = styled.span<Pick<Props, "variant">>`
  color: inherit;
  display: inline-block;
  position: relative;
  -webkit-text-stroke: 4px ${borderColor};
  text-decoration: none;

  &::after {
    content: "${props => (props.children as string)}";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    -webkit-text-stroke: 0;
  }

  ${StyledButton}:disabled & {
    -webkit-text-stroke-color: #7a979f;
  }
`

const Button: React.FC<Props> = ({
  children,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      { typeof children === "string" ? (
        <StyledText variant={props.variant}>{children}</StyledText>
      ) : children }
    </StyledButton>
  )
}

export default Button;
