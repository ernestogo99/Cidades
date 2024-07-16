import {
  Box,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdalistagem } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Ilistagempessoa,
  PessoaService,
} from "../../shared/services/api/pessoas/pessoasService";
import { useDeounce } from "../../shared/hooks/usedebounce";
import { Enviroment } from "../../shared/environment";
import { Delete, Edit } from "@mui/icons-material";

export const ListagemPessoas: React.FC = () => {
  const [searchParans, setSearchparans] = useSearchParams();
  const [rows, setrows] = useState<Ilistagempessoa[]>([]);
  const [totalcount, setTotalcount] = useState(0);
  const [isloading, setloading] = useState(true);
  //toda vez que a gente digitar na input o texto vai mudar o searchparan na url
  //e o valor vai ser modificado, assim vai executar o usememo

  const { debounce } = useDeounce();
  const navigate = useNavigate();
  const busca = useMemo(() => {
    return searchParans.get("busca") || "";
  }, [searchParans]);

  //saber a página que estamos na aplicação
  const pagina = useMemo(() => {
    return Number(searchParans.get("pagina") || "1");
  }, [searchParans]);

  useEffect(() => {
    setloading(true);

    debounce(() => {
      PessoaService.getAll(pagina, busca).then((result) => {
        setloading(false);

        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log(result);
          setrows(result.data);
          setTotalcount(result.totalcount);
        }
      });
    });
  }, [busca, pagina]);

  const handledelete = (id: number) => {
    if (window.confirm("Realmente deseja apagar?")) {
      PessoaService.deleteByid(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          console.log(result);
        } else {
          setrows((oldRows) => oldRows.filter((row) => row.id !== id));
          setTotalcount((oldCount) => oldCount - 1);
          alert("Registro apagado com sucesso");
        }
      });
    }
  };

  return (
    <Layoutbasedepagina
      titulo="Listagem de pessoas"
      barradeferramentas={
        <Ferramentasdalistagem
          aoclicaremnovo={() => navigate("/pessoas/detalhe/nova")}
          mostrarinputbuscar
          textodabusca={busca}
          aomudartextodebusca={(texto) =>
            setSearchparans({ busca: texto, pagina: "1" }, { replace: true })
          }
          textobotaonovo="Nova"
        />
      }
    >
      <TableContainer
        sx={{ margin: 1, width: "auto" }}
        component={Paper}
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ações</TableCell>
              <TableCell>Nome completo</TableCell>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      handledelete(row.id);
                    }}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigate(`/pessoas/detalhe/${row.id}`);
                    }}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>{row.nomeCompleto}</TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {totalcount === 0 && !isloading && (
            <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
          )}

          <TableFooter>
            {isloading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant="indeterminate" />
                </TableCell>
              </TableRow>
            )}
            {totalcount > 0 && totalcount > Enviroment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    onChange={(_, newpage) => {
                      setSearchparans(
                        { busca, pagina: newpage.toString() },
                        { replace: true }
                      );
                    }}
                    page={pagina}
                    count={Math.ceil(totalcount / Enviroment.LIMITE_DE_LINHAS)}
                  ></Pagination>
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </Layoutbasedepagina>
  );
};
