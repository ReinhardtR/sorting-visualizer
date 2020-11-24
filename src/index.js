import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { SortingVisualizer } from "./SortingVisualizer/SortingVisualizer.jsx";

ReactDOM.render(
  <React.StrictMode>
    <SortingVisualizer></SortingVisualizer>
  </React.StrictMode>,
  document.getElementById("root")
);
