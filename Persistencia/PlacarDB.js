import conectar from "./Conexao.js";
import Placar from "../Modelo/Placar.js";

export default class PlacarDB {
  async inserirDados(placar) {
    if (placar instanceof Placar) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO placar (time_id_1, resultado_time_id_1, time_id_2, resultado_time_id_2, data) \
          VALUES(?, ?, ?, ?, ?)";
        const valores = [
          placar.time_id_1,
          placar.resultado_time_id_1,
          placar.time_id_2,
          placar.resultado_time_id_2,
          placar.data,
        ];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM placar WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaPlacares = [];
    for (const row of rows) {
      const placar = new Placar(
        row["id"],
        row["time_id_1"],
        row["resultado_time_id_1"],
        row["time_id_2"],
        row["resultado_time_id_2"],
        row["data"]
      );
      listaPlacares.push(placar);
    }
    return listaPlacares;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM placar WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaPlacares = [];
    for (const row of rows) {
      const placar = new Placar(
        row["id"],
        row["time_id_1"],
        row["resultado_time_id_1"],
        row["time_id_2"],
        row["resultado_time_id_2"], 
        row["data"]
      );
      listaPlacares.push(placar);
    }
    return listaPlacares;
  }
}
