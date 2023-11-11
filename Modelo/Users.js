import UsersDB from "../Persistencia/UsersDB.js";

export default class Users {
  #id;
  #cpf;
  #password;
  #accessLevel;
  constructor(id, cpf, password, accessLevel) {
    this.#id = id;
    this.#cpf = cpf;
    this.#password = password;
    this.#accessLevel = accessLevel;
  }

  get id() {
    return this.#id;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get password() {
    return this.#password;
  }

  set password(novoPassword) {
    this.#password = novoPassword;
  }

  get accessLevel() {
    return this.#accessLevel;
  }

  set accessLevel(novoAccessLevel) {
    this.#accessLevel = novoAccessLevel;
  }

  toJSON() {
    return {
      id: this.id,
      cpf: this.cpf,
      password: this.password,
      accessLevel: this.accessLevel,
    };
  }

  async gravar() {
    const usersDB = new UsersDB();
    await usersDB.incluir(this);
  }

  async consultar(especificidade) {
    const usersDB = new UsersDB();
    const users = await usersDB.consultarDados(especificidade);
    return users;
  }

  async consultarId(id) {
    const usersDB = new UsersDB();
    const users = await usersDB.consultarId(id);
    return users;
  }
}
