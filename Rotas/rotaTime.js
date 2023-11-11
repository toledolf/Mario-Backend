import { Router } from "express";
import TimeCTRL from "../Controle/timeCtrl.js";

const rotaTime = new Router();
const timeCtrl = new TimeCTRL();

rotaTime
  .get("/", timeCtrl.consultar)
  .post("/", timeCtrl.gravar)
  /*   .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir) */
  .get("/:id", timeCtrl.consultarPorId);

export default rotaTime;
