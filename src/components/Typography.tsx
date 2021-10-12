import styled, { css } from "styled-components";
import { typography, TypographyProps, color, ColorProps } from "styled-system";

const Typography = styled.div<TypographyProps | ColorProps>`
  width: fit-content;
  ${typography}
  ${color}

  ${(props) =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`;

export default Typography;
