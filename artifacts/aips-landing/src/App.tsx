import { Router as WouterRouter } from "wouter";
import SafePublicSite from "@/pages/SafePublicSite";

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <SafePublicSite />
    </WouterRouter>
  );
}

export default App;
