import { Router } from "express";
import JogadorCTRL from "../Controle/jogadorCtrl.js";

const rotaJogador = new Router();
const jogadorCtrl = new JogadorCTRL();

rotaJogador
  .get("/", jogadorCtrl.consultar)
  .post("/", jogadorCtrl.gravar)
  /*   .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir) */
  .get("/:id", jogadorCtrl.consultarPorId);

export default rotaJogador;
