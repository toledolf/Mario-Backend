import conectar from "./Conexao.js";
import Jogador from "../Modelo/Jogador.js";

export default class JogadorDB {
  async inserirDados(jogador) {
    if (jogador instanceof Jogador) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO jogador (posicao, time_id, cpfJogador) \
                                           VALUES(?, ?, ?)";
        const valores = [jogador.posicao, jogador.time_id, jogador.cpfJogador];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM jogador WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaJogadores = [];
    for (const row of rows) {
      const jogador = new Jogador(
        row["id"],
        row["posicao"],
        row["time_id"],
        row["cpfJogador"]
      );
      listaJogadores.push(jogador);
    }
    return listaJogadores;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM jogador WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaJogadores = [];
    for (const row of rows) {
      const jogador = new Jogador(
        row["id"],
        row["posicao"],
        row["time_id"],
        row["cpfJogador"]
      );
      listaJogadores.push(jogador);
    }
    return listaJogadores;
  }
}
