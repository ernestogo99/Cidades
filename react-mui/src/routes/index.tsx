import { Route, Routes, Navigate } from "react-router-dom";
import { useDrawercontext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard } from "../pages";

export const APProutes = () => {
  const { setdraweroptions } = useDrawercontext();

  useEffect(() => {
    setdraweroptions([
      {
        label: "Página inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard></Dashboard>}></Route>
      <Route
        path="*"
        element={<Navigate to="/pagina-inicial"></Navigate>}
      ></Route>
    </Routes>
  );
};
