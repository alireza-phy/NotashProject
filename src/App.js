import { lazy, useEffect , Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  const cookies = new Cookies();
  useEffect(() => {
    if (window.location.pathname !== "/login") {
      let userSessionId = cookies.get("session", { path: "/" });
      if (userSessionId === null || userSessionId === undefined) {
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <div>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
