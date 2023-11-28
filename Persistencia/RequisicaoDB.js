import conectar from "./Conexao.js";
import Requisicao from "../Modelo/Requisicao.js";

export default class RequisicaoDB {
  async inserirDados(requisicao) {
    if (requisicao instanceof Requisicao) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO requisicao (user_cpf, requisicao, data) \
                                           VALUES(?, ?, ?)";
        const valores = [requisicao.user_cpf, requisicao.requisicao, requisicao.data];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM requisicao WHERE user_cpf LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaRequisicoes = [];
    for (const row of rows) {
      const requisicao = new Requisicao(
        row["id"],
        row["user_cpf"],
        row["requisicao"],
        row["data"]
      );
      listaRequisicoes.push(requisicao);
    }
    return listaRequisicoes;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM requisicao WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaRequisicoes = [];
    for (const row of rows) {
      const requisicao = new Requisicao(
        row["id"],
        row["user_cpf"],
        row["requisicao"],
        row["data"]
      );
      listaRequisicoes.push(requisicao);
    }
    return listaRequisicoes;
  }
}
