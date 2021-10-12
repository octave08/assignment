import styled, { ThemeProvider } from "styled-components";
import {
  compose,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  color,
  ColorProps,
  typography,
  TypographyProps,
} from "styled-system";
import GlobalStyle from "./GlobalStyle";
import theme from "./theme";

const Container = styled.div<LayoutProps>`
  ${layout}
`;

const Wrapper = styled.div<FlexboxProps>`
  display: flex;
  ${flexbox}
`;

const Typography = styled.div<TypographyProps | ColorProps>(
  compose(typography, color)
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container width="100%" height="100%">
        <Wrapper
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <p>Hello Assignment</p>
          <Typography color="gray90">Hello Styled</Typography>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
