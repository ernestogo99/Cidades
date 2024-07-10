import { Ferramentasdedetalhe } from "../../shared/components";
import { Layoutbasedepagina } from "../../shared/layout";

export const Dashboard = () => {
  return (
    <Layoutbasedepagina
      titulo="Página inicial"
      barradeferramentas={
        <Ferramentasdedetalhe mostrarbotaosalvarefechar></Ferramentasdedetalhe>
      }
    >
      testando
    </Layoutbasedepagina>
  );
};
