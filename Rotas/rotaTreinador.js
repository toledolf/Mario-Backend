import { Router } from "express";
import TreinadorCTRL from "../Controle/treinadorCtrl.js";

const rotaTreinador = new Router();
const treinadorCtrl = new TreinadorCTRL();

rotaTreinador
  .get("/", treinadorCtrl.consultar)
  .post("/", treinadorCtrl.gravar)
  /*   .put("/", treinadorCtrl.atualizar)
  .delete("/", treinadorCtrl.excluir) */
  .get("/:id", treinadorCtrl.consultarPorId);

export default rotaTreinador;
