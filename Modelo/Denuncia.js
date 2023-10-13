import DenunciaDB from "../Persistencia/DenunciaDB.js";

export default class Denuncia {
  #id;
  #data;
  #horario;
  #campoSelecionado;
  #nomeInfrator;
  #dadosDenuncia;
  #cpfUsuario;

  constructor(id, data, horario, campoSelecionado, nomeInfrator, dadosDenuncia, cpfUsuario) {
    this.#id = id;
    this.#data = data;
    this.#horario = horario;
    this.#campoSelecionado = campoSelecionado;
    this.#nomeInfrator = nomeInfrator;
    this.#dadosDenuncia = dadosDenuncia;
    this.#cpfUsuario = cpfUsuario;
  }

  get id() {
    return this.#id;
  }

  get data() {
    return this.#data;
  }

  get horario() {
    return this.#horario;
  }

  get campoSelecionado() {
    return this.#campoSelecionado;
  }

  get nomeInfrator() {
    return this.#nomeInfrator;
  }

  get dadosDenuncia() {
    return this.#dadosDenuncia;
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

  set horario(novoHorario) {
    this.#horario = novoHorario;
  }

  set campoSelecionado(novoCampo) {
    this.#campoSelecionado = novoCampo;
  }

  set nomeInfrator(novoNomeInfrator) {
    this.#nomeInfrator = novoNomeInfrator;
  }

  set dadosDenuncia(novoDadosDenuncia) {
    this.#dadosDenuncia = novoDadosDenuncia;
  }

  set cpfUsuario(novoCpfUsuario) {
    this.#cpfUsuario = novoCpfUsuario;
  }

  toJSON() {
    return {
      id: this.#id,
      data: this.#data,
      horario: this.#horario,
      campoSelecionado: this.#campoSelecionado,
      nomeInfrator: this.#nomeInfrator,
      dadosDenuncia: this.#dadosDenuncia,
      cpfUsuario: this.#cpfUsuario,
    };
  }

  async gravar() {
    const denunciaDB = new DenunciaDB();
    await denunciaDB.inserirDados(this);
  }

  async atualizar() {
    const denunciaDB = new DenunciaDB();
    await denunciaDB.alterarDados(this);
  }

  async excluirDados() {
    const denunciaDB = new DenunciaDB();
    await denunciaDB.excluirDados(this);
  }

  async consultar(especificidade) {
    const denunciaDB = new DenunciaDB();
    const denuncias = await denunciaDB.consultarDados(especificidade);
    return denuncias;
  }

  async consultarId(id) {
    const denunciaDB = new DenunciaDB();
    const denuncias = await denunciaDB.consultarId(id);
    return denuncias;
  }
}
