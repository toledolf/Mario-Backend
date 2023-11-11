import PlacarDB from "../persistencia/PlacarDB.js";

export default class Placar {
  #id;
  #time_id_1;
  #resultado_time_id_1;
  #time_id_2;
  #resultado_time_id_2;
  #data;

  constructor(id, time_id_1, resultado_time_id_1, time_id_2, resultado_time_id_2, data) {
    this.#id = id;
    this.#time_id_1 = time_id_1;
    this.#resultado_time_id_1 = resultado_time_id_1;
    this.#time_id_2 = time_id_2;
    this.#resultado_time_id_2 = resultado_time_id_2;
    this.#data = data;
  }

  get id() {
    return this.#id;
  }

  get time_id_1() {
    return this.#time_id_1;
  }

  get resultado_time_id_1() {
    return this.#resultado_time_id_1;
  }

  get time_id_2() {
    return this.#time_id_2;
  }

  get resultado_time_id_2() {
    return this.#resultado_time_id_2;
  }

  get data() {
    return this.#data;
  }

  set time_id_1(time_id_1) {
    this.#time_id_1 = time_id_1;
  }

  set resultado_time_id_1(resultado_time_id_1) {
    this.#resultado_time_id_1 = resultado_time_id_1;
  }

  set time_id_2(time_id_2) {
    this.#time_id_2 = time_id_2;
  }

  set resultado_time_id_2(resultado_time_id_2) {
    this.#resultado_time_id_2 = resultado_time_id_2;
  }

  set data(data) {
    this.#data = data;
  }

  toJSON() {
    return {
      id: this.#id,
      time_id_1: this.#time_id_1,
      resultado_time_id_1: this.#resultado_time_id_1,
      time_id_2: this.#time_id_2,
      resultado_time_id_2: this.#resultado_time_id_2,
      data: this.#data,
    };
  }

  async gravar() {
    const placarDB = new PlacarDB();
    await placarDB.inserirDados(this);
  }

  async consultarDados(especificidade) {
    const placarDB = new PlacarDB();
    const placares = await placarDB.consultarDados(especificidade);
    return placares;
  }

  async consultarCodigo(id) {
    const placarDB = new PlacarDB();
    const placares = await placarDB.consultarCodigo(id);
    return placares;
  }
}
