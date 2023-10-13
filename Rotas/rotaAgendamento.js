import { Router } from "express";
import AgendamentoCTRL from "../Controle/agendamentoCtrl.js";

const rotaAgendamento = new Router();
const agendamentoCtrl = new AgendamentoCTRL();

rotaAgendamento
  .get("/", agendamentoCtrl.consultar)
  .post("/", agendamentoCtrl.gravar)
  .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir)
  .get("/:id", agendamentoCtrl.consultarPorCodigo);

export default rotaAgendamento;
