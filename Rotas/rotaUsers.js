import { Router } from "express";
import UsersCTRL from "../Controle/usersCtrl.js";

const rotaUsers = new Router();
const usersCTRL = new UsersCTRL();

rotaUsers
  .post("/", usersCTRL.gravar)
  /*   .put("/", torneioCTRL.atualizar)
  .delete("/", torneioCTRL.excluir) */
  .get("/", usersCTRL.consultar)
  .get("/:id", usersCTRL.consultarId);

export default rotaUsers;
