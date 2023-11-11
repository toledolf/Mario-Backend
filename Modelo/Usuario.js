import UsuarioBD from "../Persistencia/UsuarioBD.js";
export default class Usuario {
  #cpf;
  #senha;
  #userLevel;
  #nome;
  #dataNasc;
  #email;
  #tel;
  #sexo;
  #cidade;
  #uf;
  #treinador;
  #jogador;

  constructor(
    cpf,
    senha,
    userLevel,
    nome,
    dataNasc,
    email,
    tel,
    sexo,
    cidade,
    uf,
    treinador,
    jogador
  ) {
    this.cpf = cpf;
    this.senha = senha;
    this.userLevel = userLevel;
    this.nome = nome;
    this.dataNasc = dataNasc;
    this.email = email;
    this.tel = tel;
    this.sexo = sexo;
    this.cidade = cidade;
    this.uf = uf;
    this.treinador = treinador;
    this.jogador = jogador;
  }

  get cpf() {
    return this.#cpf;
  }

  set cpf(novoCpf) {
    this.#cpf = novoCpf;
  }

  get senha() {
    return this.#senha;
  }

  set senha(novaSenha) {
    this.#senha = novaSenha;
  }

  get userLevel() {
    return this.#userLevel;
  }

  set userLevel(novoUserLevel) {
    this.#userLevel = novoUserLevel;
  }
  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    if (novoNome != "") this.#nome = novoNome;
  }

  get dataNasc() {
    return this.#dataNasc;
  }

  set dataNasc(novaDataNasc) {
    this.#dataNasc = novaDataNasc;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get tel() {
    return this.#tel;
  }

  set tel(novoTel) {
    this.#tel = novoTel;
  }

  get sexo() {
    return this.#sexo;
  }

  set sexo(novoSexo) {
    this.#sexo = novoSexo;
  }

  get cidade() {
    return this.#cidade;
  }

  set cidade(novaCidade) {
    this.#cidade = novaCidade;
  }

  get uf() {
    return this.#uf;
  }

  set uf(novaUF) {
    this.#uf = novaUF;
  }

  get treinador() {
    return this.#treinador;
  }

  set treinador(novoTreinador) {
    this.#treinador = novoTreinador;
  }

  get jogador() {
    return this.#jogador;
  }

  set jogador(novoJogador) {
    this.#jogador = novoJogador;
  }

  toJSON() {
    return {
      cpf: this.#cpf,
      senha: this.#senha,
      userLevel: this.#userLevel,
      nome: this.#nome,
      dataNasc: this.#dataNasc,
      email: this.#email,
      tel: this.#tel,
      sexo: this.#sexo,
      cidade: this.#cidade,
      uf: this.#uf,
      treinador: this.#treinador,
      jogador: this.#jogador,
    };
  }

  async gravar() {
    const usuarioBD = new UsuarioBD();
    await usuarioBD.incluir(this);
  }

  async verificarCredenciais() {
    const usuarioBD = new UsuarioBD();
    const usuario = await usuarioBD.verificarCredenciais(this);
    return usuario;
  }

  async atualizar() {
    const usuarioBD = new UsuarioBD();
    await usuarioBD.alterar(this);
  }

  async removerDoBancoDados() {
    const usuarioBD = new UsuarioBD();
    await usuarioBD.excluir(this);
  }

  async consultar(termo) {
    const usuarioBD = new UsuarioBD();
    const usuarios = await usuarioBD.consultar(termo);
    return usuarios;
  }

  async consultarCPF(cpf) {
    const usuarioBD = new UsuarioBD();
    const usuarios = await usuarioBD.consultarCPF(cpf);
    return usuarios;
  }
}
