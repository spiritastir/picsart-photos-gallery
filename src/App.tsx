import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { HomePage } from "./pages/HomePage";
import { PhotoDetailPage } from "./pages/PhotoDetailPage";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: #fafafa;
    color: #222;
    font-size: 16px;
    line-height: 1.5;
  }

  #root {
    width: 100%;
    height: 100%;
  }

  a {
    color: #05a081;
    text-decoration: none;
    transition: color 0.2s;
  }
  a:hover {
    color: #00856f;
    text-decoration: underline;
  }

  button {
    font-family: inherit;
    border: none;
    border-radius: 8px;
    background: #05a081;
    color: #fff;
    padding: 8px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.2s;
  }
  button:hover {
    background: #00856f;
  }

  * {
    box-sizing: border-box;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/photo/:photoId" element={<PhotoDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
