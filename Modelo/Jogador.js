import JogadorBD from "../Persistencia/JogadorDB.js";

export default class Jogador {
  #id;
  #posicao;
  #time_id;
  #cpfJogador;

  constructor(id, posicao, time_id, cpfJogador) {
    this.#id = id;
    this.#posicao = posicao;
    this.#time_id = time_id;
    this.#cpfJogador = cpfJogador;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get posicao() {
    return this.#posicao;
  }

  set posicao(novaPosicao) {
    this.#posicao = novaPosicao;
  }

  get time_id() {
    return this.#time_id;
  }

  set time_id(novoTime_id) {
    this.#time_id = novoTime_id;
  }

  get cpfJogador() {
    return this.#cpfJogador;
  }

  set cpfJogador(novoCpfJogador) {
    this.#cpfJogador = novoCpfJogador;
  }

  toJSON() {
    return {
      id: this.#id,
      posicao: this.#posicao,
      time_id: this.#time_id,
      cpfJogador: this.#cpfJogador,
    };
  }

  async gravar() {
    const jogadorBD = new JogadorBD();
    await jogadorBD.inserirDados(this);
  }

  /* async atualizar() {
    const jogadorBD = new JogadorBD();
    await jogadorBD.alterarDados(this);
  }

  async excluirDados() {
    const jogadorBD = new JogadorBD();
    await jogadorBD.excluirDados(this);
  } */

  async consultar(especificidade) {
    const jogadorBD = new JogadorBD();
    const jogadores = await jogadorBD.consultarDados(especificidade);
    return jogadores;
  }

  async consultarId(id) {
    const jogadorBD = new JogadorBD();
    const jogadores = await jogadorBD.consultarPorID(id);
    return jogadores;
  }
}
