import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const Input = styled.input`
  color: black;
  padding: 10px 12px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray30};
`;

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "type"
  > {
  type?: "text";
  value: string;
  onChange: (value: string) => void;
}

const TextField: React.FC<Props> = ({
  type = "text",
  value,
  onChange,
  ...rest
}: Props) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  );
};

export default TextField;
