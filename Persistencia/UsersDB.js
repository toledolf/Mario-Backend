import conectar from "./Conexao.js";
import Users from "../Modelo/Users.js";

export default class UsersDB {
  async incluir(users) {
    if (users instanceof Users) {
      const conexao = await conectar();

      const sql = "INSERT INTO users (cpf, password, accessLevel) VALUES (?, ?, ?)";

      const valores = [users.cpf, users.password, users.accessLevel];

      await conexao.query(sql, valores);
    }
  }

  async consultarDados(especificidade) {
    const conexao = await conectar();
    const sql = "SELECT * FROM users WHERE id LIKE ?";
    const valores = ["%" + especificidade + "%"];
    const [rows] = await conexao.query(sql, valores);

    const listaUsers = [];
    for (const row of rows) {
      const users = new Users(row["id"], row["cpf"], row["password"], row["accessLevel"]);
      listaUsers.push(users);
    }
    return listaUsers;
  }

  async consultarId(id) {
    const conexao = await conectar();
    const sql = "SELECT * FROM users WHERE id =  ?";
    const valores = [id];
    const [rows] = await conexao.query(sql, valores);

    const listaUsers = [];
    for (const row of rows) {
      const users = new Users(row["id"], row["cpf"], row["password"], row["accessLevel"]);
      listaUsers.push(users);
    }
    return listaUsers;
  }
}
