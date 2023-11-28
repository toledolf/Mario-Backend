import { Router } from "express";
import RequisicaoCTRL from "../Controle/requisicaoCtrl.js";

const rotaRequisicao = new Router();
const requisicaoCtrl = new RequisicaoCTRL();

rotaRequisicao
  .get("/", requisicaoCtrl.consultar)
  .post("/", requisicaoCtrl.gravar)
  /*   .put("/", agendamentoCtrl.atualizar)
  .delete("/", agendamentoCtrl.excluir) */
  .get("/:id", requisicaoCtrl.consultarPorId);

export default rotaRequisicao;
