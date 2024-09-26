import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import AdminView from "./pages/admin";
import "./App.css";
import SafeRoute from "./pages/saferoute";

function App() {
  return (
      <div className="app">
        <Router>
        <SafeRoute>
            <Routes>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/app*" element={<AdminView />} />
              <Route path="/" element={<Navigate to="/auth/login" />} />
            </Routes>
          </SafeRoute>
        </Router>
      </div>
  );
}

export default App;
