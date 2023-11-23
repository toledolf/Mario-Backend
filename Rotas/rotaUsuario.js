import { Router } from "express";
import { UsuarioCTRL } from "../Controle/UsuarioCTRL.js";

const rotaUsuario = new Router();
const usuarioCTRL = new UsuarioCTRL();

rotaUsuario
  .post("/login", usuarioCTRL.verificarCredenciais)
  .post("/usuario", usuarioCTRL.gravar)
  .put("/", usuarioCTRL.atualizar)
  .delete("/", usuarioCTRL.excluir)
  .get("/usuario", usuarioCTRL.consultar)
  .get("/:cpf", usuarioCTRL.consultarPeloCPF);

export default rotaUsuario;
