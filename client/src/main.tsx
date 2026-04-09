import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { captureTrackingParams } from "@/lib/lead-tracker";

captureTrackingParams();

createRoot(document.getElementById("root")!).render(<App />);

