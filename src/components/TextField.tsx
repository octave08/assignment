import styled from "styled-components";

const TextField = styled.input`
  color: white;
  padding: 10px 12px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray30};
`;

export default TextField;
