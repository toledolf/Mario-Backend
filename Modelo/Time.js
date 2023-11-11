import TimeDB from "../Persistencia/TimeDB.js";

export default class Time {
  #id;
  #nome;
  #cidade;
  #fundacao;
  #treinador;

  constructor(id, nome, cidade, fundacao, treinador) {
    this.#id = id;
    this.#nome = nome;
    this.#cidade = cidade;
    this.#fundacao = fundacao;
    this.#treinador = treinador;
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

  get fundacao() {
    return this.#fundacao;
  }

  set fundacao(novaFundacao) {
    this.#fundacao = novaFundacao;
  }

  get treinador() {
    return this.#treinador;
  }

  set treinador(novoTreinador) {
    this.#treinador = novoTreinador;
  }
  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      cidade: this.#cidade,
      fundacao: this.#fundacao,
      treinador: this.#treinador,
    };
  }

  async gravar() {
    const timeDB = new TimeDB();
    await timeDB.inserirDados(this);
  }

  async consultar(especificidade) {
    const timeDB = new TimeDB();
    const times = await timeDB.consultarDados(especificidade);
    return times;
  }

  async consultarId(id) {
    const timeDB = new TimeDB();
    const times = await timeDB.consultarCodigo(id);
    return times;
  }
}
