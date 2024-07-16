import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdedetalhe } from "../../shared/components";

export const DetalhePessoa: React.FC = () => {
  const { id = "nova" } = useParams<"id">();
  const navigate = useNavigate();

  return (
    <Layoutbasedepagina
      barradeferramentas={
        <Ferramentasdedetalhe
          mostrarbotaosalvarefechar
          mostrarbotaonovo={id !== "nova"}
          mostrarbotaoapagar={id !== "nova"}
          textobotaonovo="nova"
          aoclicaremapagar={() => {}}
          aoclicaremsalvar={() => {}}
          aoclicaremsalvarefechar={() => {}}
          aoclicaremnovo={() => {
            navigate("/pessoas/detalhe/nova");
          }}
          aoclicaremvoltar={() => navigate("/pessoas")}
        ></Ferramentasdedetalhe>
      }
      titulo="Detalhe de pessoa"
    >
      <p>detalhe da pessoa {id}</p>
    </Layoutbasedepagina>
  );
};
