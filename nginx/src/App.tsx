import "./App.css";
import LuckySheet from "./components/Luckysheet";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/Main";

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/:id" element={<LuckySheet />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
