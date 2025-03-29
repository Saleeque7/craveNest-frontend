import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import {
  ProtectedRoute,
  PublicRoute,
} from "./helpers/middleware/protectedMiddleware";


function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="/*" element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route path="/admin" element={<AdminLogin />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin/home/*" element={<AdminHome />} />
      </Route>

    </Routes>
  );
}

export default App;
