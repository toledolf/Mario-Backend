import conectar from "./Conexao.js";
import Campo from "../Modelo/Campo.js";

export default class CamposBD {
  async inserirDados(campo) {
    if (campo instanceof Campo) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO campo (corReferencial, descricao) \
                                           VALUES(?, ?)";
        const valores = [campo.id, campo.corReferencial, campo.descricao];
        await conexao.query(sql, valores);
      }

      // global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async alterarDados(campo) {
    if (campo instanceof Campo) {
      const conexao = await conectar();
      const sql =
        "UPDATE campo SET corReferencial = ?, descricao = ? \
                         WHERE id = ?";
      const valores = [
        campo.id,
        campo.corReferencial,
        campo.descricao,
      ];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async excluirDados(campo) {
    if (campo instanceof Campo) {
      const conexao = await conectar();
      const sql = "DELETE FROM campo WHERE id = ?";
      const valores = [campo.id];
      await conexao.query(sql, valores);
      /* global.poolConexoes.pool.releaseConnection(conexao); */
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM campo WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaCampos = [];
    for (const row of rows) {
      const campo = new Campo(
        row["id"],
        row["corReferencial"],
        row["descricao"]
      );
      listaCampos.push(campo);
    }
    return listaCampos;
  }

  async consultarPorID(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM campo WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaCampos = [];
    for (const row of rows) {
      const campo = new Campo(
        row["id"],
        row["corReferencial"],
        row["descricao"]
      );
      listaCampos.push(campo);
    }
    return listaCampos;
  }
}
