import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";
import Denuncia from "../Modelo/Denuncia.js";
import Campo from "../Modelo/Campo.js";

export default class DenunciaDB {
  async inserirDados(denuncia) {
    if (denuncia instanceof Denuncia) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO denuncia (data, horario, campoSelecionado, nomeInfrator, dadosDenuncia, cpfUsuario) \
                                           VALUES(?, ?, ?, ?, ?, ?)";
        const valores = [
          denuncia.data,
          denuncia.horario,
          denuncia.campoSelecionado,
          denuncia.nomeInfrator,
          denuncia.dadosDenuncia,
          denuncia.cpfUsuario,
        ];
        await conexao.query(sql, valores);
      }

      // global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  /* async alterarDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      const sql =
        "UPDATE agendamento SET campo = ?, data = ?, horario = ?, \
                                         cpfUsuario = ? \
                         WHERE codigo = ?";
      const valores = [
        agendamento.campo,
        agendamento.data,
        agendamento.horario,
        agendamento.cpfUsuario,
        agendamento.codigo,
      ];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  } */

  /* async excluirDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      const sql = "DELETE FROM agendamento WHERE codigo = ?";
      const valores = [agendamento.codigo];
      await conexao.query(sql, valores);
      global.poolConexoes.pool.releaseConnection(conexao);
    }
  } */

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM denuncia as a INNER JOIN usuario as u ON a.cpfUsuario = u.cpf WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaDenuncias = [];
    for (const row of rows) {
      const campo = new Campo(row["id"]);
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const denuncia = new Denuncia(
        row["id"],
        row["data"],
        row["horario"],
        row["campoSelecionado"],
        row["nomeInfrator"],
        row["dadosDenuncia"],
        usuario,
        campo
      );
      listaDenuncias.push(denuncia);
    }
    return listaDenuncias;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM denuncia WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaDenuncias = [];
    for (const row of rows) {
      const denuncia = new Denuncia(
        row["id"],
        row["data"],
        row["horario"],
        row["campoSelecionado"],
        row["nomeInfrator"],
        row["dadosDenuncia"],
        row["cpfUsuario"]
      );
      listaDenuncias.push(denuncia);
    }
    return listaDenuncias;
  }
}
