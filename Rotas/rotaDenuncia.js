import { Router } from "express";
import DenunciaCTRL from "../Controle/denunciaCtrl.js";

const rotaDenuncia = new Router();
const denunciaCtrl = new DenunciaCTRL();

rotaDenuncia
  .get("/", denunciaCtrl.consultar)
  .post("/", denunciaCtrl.gravar)
  /* .put("/", denunciaCtrl.atualizar)
  .delete("/", denunciaCtrl.excluir) */
  .get("/:id", denunciaCtrl.consultarPorCodigo);

export default rotaDenuncia;
