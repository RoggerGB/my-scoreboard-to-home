import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Scoreboard from "./pages/Scoreboard";
import Control from "./pages/Control";
import Admin from "./pages/Admin";
import { useMatchStore } from "./store/matchStore";

export default function App() {
  const initRealtime = useMatchStore((state) => state.initRealtime);

  useEffect(() => {
    initRealtime();
  }, [initRealtime]);

  return (
    <Routes>
      <Route path="/" element={<Scoreboard />} />
      <Route path="/control" element={<Control />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}