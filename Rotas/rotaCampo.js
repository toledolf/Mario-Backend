import { Router } from "express";
import CampoCTRL from "../Controle/campoCtrl.js";

const rotaCampo = new Router();
const agendamentoCtrl = new CampoCTRL();

rotaCampo
  .get("/", agendamentoCtrl.consultar)
  .post("/", agendamentoCtrl.gravar)
  .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir)
  .get("/:id", agendamentoCtrl.consultarPorId);

export default rotaCampo;