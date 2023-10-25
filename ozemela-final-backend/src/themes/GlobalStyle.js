import { createGlobalStyle } from 'styled-components';
import 'animate.css';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }
  
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    list-style: none;
    text-decoration: none;
  }
  
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  ::-webkit-scrollbar {
    display: none;
  }
  
  body {
    scroll-behavior: smooth;
    font-family: "IBM Plex Sans";
    font-size: 16px;
  }
`;

export default GlobalStyle;