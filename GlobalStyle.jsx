// src/GlobalStyle.jsx
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Poppins', sans-serif;
    background-color: #f5f5f5;
    color: #333;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    margin: 0;
  }

  p, span, label, input, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  a {
    color: #ff6600;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
