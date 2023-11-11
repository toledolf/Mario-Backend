import conectar from "./Conexao.js";
import Treinador from "../Modelo/Treinador.js";

export default class TreinadorDB {
  async inserirDados(treinador) {
    if (treinador instanceof Treinador) {
      const conexao = await conectar();
      if (conexao) {
        const sql =
          "INSERT INTO treinador (nome, cidade, email, telefone, descricao) \
                                           VALUES(?, ?, ?, ?, ?)";
        const valores = [
          treinador.nome,
          treinador.cidade,
          treinador.email,
          treinador.telefone,
          treinador.descricao,
        ];
        await conexao.query(sql, valores);
      }
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM treinador WHERE nome LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaTreinadores = [];
    for (const row of rows) {
      const treinador = new Treinador(
        row["id"],
        row["nome"],
        row["cidade"],
        row["email"],
        row["telefone"],
        row["descricao"]
      );
      listaTreinadores.push(treinador);
    }
    return listaTreinadores;
  }

  async consultarCodigo(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM treinador WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaTreinadores = [];
    for (const row of rows) {
      const treinador = new Treinador(
        row["id"],
        row["nome"],
        row["cidade"],
        row["email"],
        row["telefone"],
        row["descricao"]
      );
      listaTreinadores.push(treinador);
    }
    return listaTreinadores;
  }
}
