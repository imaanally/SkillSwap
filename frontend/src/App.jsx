import { useState } from "react";
import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace";
import Requests from "./pages/Requests";
import Sessions from "./pages/Sessions";

function App() {
  const [activePage, setActivePage] = useState("Marketplace");

  function renderPage() {
    switch (activePage) {
      case "Home":
        return <h1>Home</h1>;

      case "Marketplace":
        return <Marketplace />;

      case "My requests":
        return <Requests />;

      case "Sessions":
        return <Sessions />;

      case "My profile":
        return <h1>My Profile</h1>;

      default:
        return <Marketplace />;
    }
  }

  return (
    <Navbar
      activePage={activePage}
      onNavigate={setActivePage}
      userName="Imaan Ali"
    >
      {renderPage()}
    </Navbar>
  );
}

export default App;
