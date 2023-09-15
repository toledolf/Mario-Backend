import Agendamento from "../Modelo/Agendamento.js";
import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";

export default class AgendamentoDB {
  async inserirDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO agendamento (campo, data, horario, cpfUsuario) \
                                           VALUES(?, ?, ?, ?)";
        const valores = [
          agendamento.campo,
          agendamento.data,
          agendamento.horario,
          agendamento.cpfUsuario,
        ];
        await conexao.query(sql, valores);
      }

     // global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async alterarDados(agendamento) {
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
  }

  async excluirDados(agendamento) {
    if (agendamento instanceof Agendamento) {
      const conexao = await conectar();
      const sql = "DELETE FROM agendamento WHERE codigo = ?";
      const valores = [agendamento.codigo];
      await conexao.query(sql, valores);
      global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM agendamento as a INNER JOIN usuario as u ON a.cpfUsuario = u.cpf WHERE nome LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaAgendamentos = [];
    for (const row of rows) {
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const agendamento = new Agendamento(
        row["codigo"],
        row["campo"],
        row["data"],
        row["horario"],
        row["cpfUsuario"],
        usuario
      );
      listaAgendamentos.push(agendamento);
    }
    return listaAgendamentos;
  }

  async consultarCodigo(codigo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM agendamento WHERE codigo =  ?";
    const valores = [codigo];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaAgendamentos = [];
    for (const row of rows) {
      const agendamento = new Agendamento(
        row["codigo"],
        row["campo"],
        row["data"],
        row["horario"],
        row["cpfUsuario"]
      );
      listaAgendamentos.push(agendamento);
    }
    return listaAgendamentos;
  }
}
