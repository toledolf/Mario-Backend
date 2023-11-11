import conectar from "./Conexao.js";
import Time from "../Modelo/Time.js";

export default class TimeDB {
  async inserirDados(time) {
    if (time instanceof Time) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO time (nome, cidade, fundacao, treinador_id) \
                                           VALUES(?, ?, ?, ?)";
        const valores = [time.nome, time.cidade, time.fundacao, time.treinador];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM time WHERE nome LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaTimes = [];
    for (const row of rows) {
      const time = new Time(row ["id"], row["nome"], row["cidade"], row["fundacao"], row["treinador_id"]);
      listaTimes.push(time);
    }
    return listaTimes;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM time WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaTimes = [];
    for (const row of rows) {
      const time = new Time(row["id"], row["nome"], row["cidade"], row["fundacao"], row["treinador_id"]);
      listaTimes.push(time);
    }
    return listaTimes;
  }
}
