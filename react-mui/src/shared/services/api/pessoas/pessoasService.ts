import { Enviroment } from "../../../environment";
import { api } from "../axios-config";

interface Ilistagempessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number; // representa o relaciomento da cidade e da pessoa
}

interface Idetalhepessoa {
  id: number;
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

// criando um tipo para tipar o dado
type TpessoascomTotalCount = {
  data: Ilistagempessoa[];
  totalcount: number;
};

const contagem = () => {};

//a resposta do nosso getall seria uma lista de pessoas e a quantidade total
const getAll = async (
  page = 1,
  filter = ""
): Promise<TpessoascomTotalCount | Error> => {
  try {
    //desestruturando e obtendo os dados da resposta
    //listagem de registros
    // vem uma pagina e 10 registros
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await api.get(urlRelativa);
    if (data) {
      return {
        data,
        totalcount: Number(
          headers["x-total-count"] || Enviroment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("erro ao listar os registros");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "erro ao listar os registros"
    );
  }
};

const getByid = async (id: number): Promise<Idetalhepessoa | Error> => {
  try {
    const { data } = await api.get(`/pessoas/${id}`);
    if (data) {
      return data;
    }
    return new Error("erro ao consultar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "erro ao consultar o registro"
    );
  }
};

const create = async (
  dados: Omit<Idetalhepessoa, "id">
): Promise<number | Error> => {
  try {
    const { data } = await api.post<Idetalhepessoa>(`/pessoas`, dados);
    if (data) {
      return data.id;
    }
    return new Error("erro ao criar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "erro ao criar o registro"
    );
  }
};
const updateByid = async (
  id: number,
  dados: Idetalhepessoa
): Promise<void | Error> => {
  try {
    await api.put<Idetalhepessoa>(`/pessoas/${id}`, dados);
    return new Error("erro ao editar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "erro ao editar o registro"
    );
  }
};
const deleteByid = async (id: number): Promise<any> => {
  try {
    await api.delete<Idetalhepessoa>(`/pessoas/${id}`);
    return new Error("erro ao apagar o registro");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "erro ao apagar o registro"
    );
  }
};

export const PessoaService = {
  getAll,
  getByid,
  create,
  updateByid,
  deleteByid,
};
