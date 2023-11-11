import Usuario from "../Modelo/Usuario.js";
import conectar from "./Conexao.js";
export default class UsuarioBD {
  async incluir(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO usuario (cpf, senha, userLevel, nome, dataNasc, email, tel, sexo, cidade, uf, treinador, jogador) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
      const valores = [
        usuario.cpf,
        usuario.senha,
        usuario.userLevel,
        usuario.nome,
        usuario.dataNasc,
        usuario.email,
        usuario.tel,
        usuario.sexo,
        usuario.cidade,
        usuario.uf,
        usuario.treinador,
        usuario.jogador,
      ];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async verificarCredenciais(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = "SELECT * FROM usuario WHERE cpf = ? AND senha = ?";
      const valores = [usuario.cpf, usuario.senha];
      const [rows] = await conexao.query(sql, valores);

      for (const row of rows) {
        const usuario = new Usuario(row["cpf"], row["senha"], row["userLevel"]);
        if (usuario.cpf === row["cpf"] && usuario.senha === row["senha"]) {
          return true, row["userLevel"];
        }
      }
      return false;
    }
  }

  async alterar(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql =
        "UPDATE usuario SET senha = ?, userLevel = ?, nome = ?, dataNasc = ?, email = ?, tel = ?, sexo = ?, cidade = ?, uf = ?, treinador = ?, jogador = ? WHERE cpf = ?";
      const valores = [
        usuario.senha,
        usuario.nome,
        usuario.userLevel,
        usuario.dataNasc,
        usuario.email,
        usuario.tel,
        usuario.sexo,
        usuario.cidade,
        usuario.uf,
        usuario.treinador,
        usuario.jogador,
        usuario.cpf,
      ];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async excluir(usuario) {
    if (usuario instanceof Usuario) {
      const conexao = await conectar();
      const sql = "DELETE FROM usuario WHERE cpf = ?";
      const valores = [usuario.cpf];
      await conexao.query(sql, valores);
      //global.poolConexoes.pool.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    const conexao = await conectar();
    const sql = "SELECT * FROM usuario WHERE nome LIKE ?";
    const valores = ["%" + termo + "%"];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaUsuarios = [];
    for (const row of rows) {
      const usuario = new Usuario(
        row["cpf"],
        row["senha"],
        row["userLevel"],
        row["nome"],
        row["dataNasc"],
        row["email"],
        row["tel"],
        row["sexo"],
        row["cidade"],
        row["uf"],
        row["treinador"],
        row["jogador"]
      );
      listaUsuarios.push(usuario);
    }
    return listaUsuarios;
  }
  async consultarCPF(cpf) {
    const conexao = await conectar();
    const sql = "SELECT * FROM usuario WHERE cpf = ?";
    const valores = [cpf];
    const [rows] = await conexao.query(sql, valores);
    //global.poolConexoes.pool.releaseConnection(conexao);

    const listaUsuarios = [];
    for (const row of rows) {
      const usuario = new Usuario(
        row["cpf"],
        row["senha"],
        row["userLevel"],
        row["nome"],
        row["dataNasc"],
        row["email"],
        row["tel"],
        row["sexo"],
        row["cidade"],
        row["uf"],
        row["treinador"],
        row["jogador"]
      );
      listaUsuarios.push(usuario);
    }
    return listaUsuarios;
  }
}
