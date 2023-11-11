import { Router } from "express";
import PlacarCTRL from "../Controle/placarCtrl.js";

const rotaPlacar = new Router();
const placarCtrl = new PlacarCTRL();

rotaPlacar
  .get("/", placarCtrl.consultar)
  .post("/", placarCtrl.gravar)
  /*   .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir) */
  .get("/:id", placarCtrl.consultarPorId);

export default rotaPlacar;