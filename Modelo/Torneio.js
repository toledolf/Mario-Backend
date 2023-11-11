import TorneioDB from "../Persistencia/TorneioDB.js";

export default class Torneio {
  #id;
  #modalidade;
  #numEquipes;
  #data;
  #cpfUsuario;

  constructor(id, modalidade, numEquipes, data, cpfUsuario) {
    this.#id = id;
    this.#modalidade = modalidade;
    this.#numEquipes = numEquipes;
    this.#data = data;
    this.#cpfUsuario = cpfUsuario;
  }

  get id() {
    return this.#id;
  }

  get data() {
    return this.#data;
  }

  get modalidade() {
    return this.#modalidade;
  }

  get numEquipes() {
    return this.#numEquipes;
  }

  get cpfUsuario() {
    return this.#cpfUsuario;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  set data(novaData) {
    this.#data = novaData;
  }

  set modalidade(novoModalidade) {
    this.#modalidade = novoModalidade;
  }

  set numEquipes(novoNumEquipes) {
    this.#numEquipes = novoNumEquipes;
  }

  set cpfUsuario(novoCpfUsuario) {
    this.#cpfUsuario = novoCpfUsuario;
  }

  toJSON() {
    return {
      id: this.#id,
      modalidade: this.#modalidade,
      numEquipes: this.#numEquipes,
      data: this.#data,
      cpfUsuario: this.#cpfUsuario,
    };
  }

  async gravar() {
    const torneioDB = new TorneioDB();
    await torneioDB.inserirDados(this);
  }

  /*   async atualizar() {
    const torneioDB = new TorneioDB();
    await torneioDB.alterarDados(this);
  }

  async excluirDados() {
    const torneioDB = new TorneioDB();
    await torneioDB.excluirDados(this);
  } */

  async consultar(especificidade) {
    const torneioDB = new TorneioDB();
    const torneios = await torneioDB.consultarDados(especificidade);
    return torneios;
  }

  async consultarId(id) {
    const torneioDB = new TorneioDB();
    const torneios = await torneioDB.consultarCodigo(id);
    return torneios;
  }
}
