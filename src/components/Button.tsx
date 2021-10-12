import styled from "styled-components";
import { color, ColorProps } from "styled-system";

const Button = styled.button<ColorProps>`
  background-color: black;
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  ${color}
`;

export default Button;
