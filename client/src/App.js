import { Route, Routes } from "react-router-dom";
import "./App.css";
import pathname from "./config/pathname";
import TheLayout from "./container/TheLayout";
import { Login, Register } from "./view";

function App() {
  return (
    <Routes>
      <Route exact path={pathname.login} name="Login" element={<Login />} />
      <Route
        exact
        path={pathname.register}
        name="Register"
        element={<Register />}
      />
      <Route exact path="*" name="Home" element={<TheLayout />} />
    </Routes>
  );
}

export default App;
