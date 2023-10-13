import CampoBD from "../Persistencia/CampoBD.js";

export default class Campo {
  #id;
  #coReferencial;
  #descricao;

  constructor(id, corReferencial, descricao) {
    this.#id = id;
    this.#coReferencial = corReferencial;
    this.#descricao = descricao;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get corReferencial() {
    return this.#coReferencial;
  }

  set corReferencial(novaCorReferencial) {
    this.#coReferencial = novaCorReferencial;
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
      corReferencial: this.#coReferencial,
      descricao: this.#descricao,
    };
  }

  async gravar() {
    const campoBD = new CampoBD();
    await campoBD.inserirDados(this);
  }

  async atualizar() {
    const campoBD = new CampoBD();
    await campoBD.alterarDados(this);
  }

  async excluirDados() {
    const campoBD = new CampoBD();
    await campoBD.excluirDados(this);
  }

  async consultar(especificidade) {
    const campoBD = new CampoBD();
    const campos = await campoBD.consultarDados(especificidade);
    return campos;
  }

  async consultarId(id) {
    const campoBD = new CampoBD();
    const campos = await campoBD.consultarPorID(id);
    return campos;
  }
}
