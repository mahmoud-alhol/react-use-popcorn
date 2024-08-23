import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
// import StarRating from "./components/StarRating";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
    {/* <StarRating maxLength={10}/>
    <StarRating maxLength={5}/>
    <StarRating /> */}
  </StrictMode>
);
