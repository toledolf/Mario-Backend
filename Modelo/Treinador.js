import TreinadorDB from "../Persistencia/TreinadorDB.js";

export default class Treinador {
  #id;
  #nome;
  #cidade;
  #email;
  #telefone;
  #descricao;

  constructor(id, nome, cidade, email, telefone, descricao) {
    this.#id = id;
    this.#nome = nome;
    this.#cidade = cidade;
    this.#email = email;
    this.#telefone = telefone;
    this.#descricao = descricao;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get telefone() {
    return this.#telefone;
  }

  set telefone(novoTelefone) {
    this.#telefone = novoTelefone;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }
  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      cidade: this.#cidade,
      email: this.#email,
      telefone: this.#telefone,
      descricao: this.#descricao,
    };
  }

  async gravar() {
    const treinadorDB = new TreinadorDB();
    await treinadorDB.inserirDados(this);
  }

  async consultar(especificidade) {
    const treinadorDB = new TreinadorDB();
    const treinadores = await treinadorDB.consultarDados(especificidade);
    return treinadores;
  }

  async consultarId(id) {
    const treinadorDB = new TreinadorDB();
    const treinadores = await treinadorDB.consultarCodigo(id);
    return treinadores;
  }
}
