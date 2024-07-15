import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdalistagem } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { PessoaService } from "../../shared/services/api/pessoas/pessoasService";

export const ListagemPessoas: React.FC = () => {
  const [searchParans, setSearchparans] = useSearchParams();
  //toda vez que a gente digitar na input o texto vai mudar o searchparan na url
  //e o valor vai ser modificado, assim vai executar o usememo
  const busca = useMemo(() => {
    return searchParans.get("busca") || "";
  }, [searchParans]);

  useEffect(() => {
    PessoaService.getAll(1, busca).then((result) => {
      if (result instanceof Error) {
        alert(result.message);
      } else {
        console.log(result);
      }
    });
  }, [busca]);

  return (
    <Layoutbasedepagina
      titulo="Listagem de pessoas"
      barradeferramentas={
        <Ferramentasdalistagem
          mostrarinputbuscar
          textodabusca={busca}
          aomudartextodebusca={(texto) =>
            setSearchparans({ busca: texto }, { replace: true })
          }
          textobotaonovo="Nova"
        />
      }
    >
      <></>
    </Layoutbasedepagina>
  );
};
