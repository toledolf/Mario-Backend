import RequisicaoDB from "../Persistencia/RequisicaoDB.js";

export default class Requisicao {
  #id;
  #user_cpf;
  #requisicao;
  #data;

  constructor(id, user_cpf, requisicao, data) {
    this.#id = id;
    this.#user_cpf = user_cpf;
    this.#requisicao = requisicao;
    this.#data = data;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get user_cpf() {
    return this.#user_cpf;
  }

  set user_cpf(novoUser_cpf) {
    this.#user_cpf = novoUser_cpf;
  }

  get requisicao() {
    return this.#requisicao;
  }

  set requisicao(novoRequisicao) {
    this.#requisicao = novoRequisicao;
  }

  get data() {
    return this.#data;
  }

  set data(novaData) {
    this.#data = novaData;
  }

  toJSON() {
    return {
      id: this.#id,
      user_cpf: this.#user_cpf,
      requisicao: this.#requisicao,
      data: this.#data,
    };
  }

  async gravar() {
    const requisicaoDB = new RequisicaoDB();
    await requisicaoDB.inserirDados(this);
  }

  async consultar(especificidade) {
    const requisicaoDB = new RequisicaoDB();
    const requisicoes = await requisicaoDB.consultarDados(especificidade);
    return requisicoes;
  }

  async consultarId(id) {
    const requisicaoDB = new RequisicaoDB();
    const requisicoes = await requisicaoDB.consultarCodigo(id);
    return requisicoes;
  }
}
