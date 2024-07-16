import { Route, Routes, Navigate } from "react-router-dom";
import { useDrawercontext } from "../shared/contexts";
import { useEffect } from "react";
import { Dashboard, DetalhePessoa, ListagemPessoas } from "../pages";

export const APProutes = () => {
  const { setdraweroptions } = useDrawercontext();

  useEffect(() => {
    setdraweroptions([
      {
        label: "Página inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Pessoas",
        icon: "people",
        path: "/pessoas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard></Dashboard>}></Route>
      <Route
        path="/pessoas"
        element={<ListagemPessoas></ListagemPessoas>}
      ></Route>
      <Route
        path="pessoas/detalhe/:id"
        element={<DetalhePessoa></DetalhePessoa>}
      ></Route>
      <Route
        path="*"
        element={<Navigate to="/pagina-inicial"></Navigate>}
      ></Route>
    </Routes>
  );
};
