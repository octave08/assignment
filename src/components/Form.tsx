import styled from "styled-components";
import { flexbox, FlexboxProps } from "styled-system";

const Form = styled.form<FlexboxProps>`
  display: flex;
  flex-direction: column;
  ${flexbox};

  input {
    margin-bottom: 8px;
  }
`;

export default Form;
