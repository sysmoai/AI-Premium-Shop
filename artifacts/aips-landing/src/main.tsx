import { createRoot } from "react-dom/client";
import RootApp from "./RootApp";
import { installPublicBrandGuard } from "./lib/publicBrandGuard";
import "./index.css";
import "./accessibility.css";

installPublicBrandGuard();
createRoot(document.getElementById("root")!).render(<RootApp />);
