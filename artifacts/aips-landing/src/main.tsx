import { createRoot } from "react-dom/client";
import RootApp from "./RootApp";
import "./index.css";
import "./accessibility.css";

createRoot(document.getElementById("root")!).render(<RootApp />);
