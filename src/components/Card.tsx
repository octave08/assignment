import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

const Card = styled.div<FlexboxProps>`
  display: flex;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray30};
  boredr-radius: 12px;
  ${flexbox}
`;

export default Card;
