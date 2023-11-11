import { Router } from "express";
import TorneioCTRL from "../Controle/torneioCtrl.js";

const rotaTorneio = new Router();
const torneioCTRL = new TorneioCTRL();

rotaTorneio
  .post("/", torneioCTRL.gravar)
  /*   .put("/", torneioCTRL.atualizar)
  .delete("/", torneioCTRL.excluir) */
  .get("/", torneioCTRL.consultar)
  .get("/:id", torneioCTRL.consultarPorCodigo);

export default rotaTorneio;
