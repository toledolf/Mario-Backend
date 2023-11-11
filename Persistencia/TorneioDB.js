import Usuario from "../Modelo/Usuario.js";
import Torneio from "../Modelo/Torneio.js";
import conectar from "./Conexao.js";

export default class TorneioDB {
  async inserirDados(torneio) {
    if (torneio instanceof Torneio) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO torneios (modalidade, numEquipes, data, cpfUsuario) \
                                           VALUES(?, ?, ?, ?)";
        const valores = [
          torneio.modalidade,
          torneio.numEquipes,
          torneio.data,
          torneio.cpfUsuario,
        ];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql =
      "SELECT * FROM torneios as a INNER JOIN usuario as u ON a.cpfUsuario = u.cpf WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaTorneios = [];
    for (const row of rows) {
      const usuario = new Usuario(row["cpfUsuario"], row["nome"]);
      const torneio = new Torneio(
        row["id"],
        row["modalidade"],
        row["numEquipes"],
        row["data"],
        usuario
      );
      listaTorneios.push(torneio);
    }
    return listaTorneios;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM torneios WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaTorneios = [];
    for (const row of rows) {
      const torneio = new Torneio(
        row["id"],
        row["modalidade"],
        row["numEquipes"],
        row["data"],
        row["cpfUsuario"]
      );
      listaTorneios.push(torneio);
    }
    return listaTorneios;
  }
}
