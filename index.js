import cors from "cors";
import express from "express";
import rotaAgendamento from "./Rotas/rotaAgendamento.js";
import rotaUsuario from "./Rotas/rotaUsuario.js";
import rotaDenuncia from "./Rotas/rotaDenuncia.js";
import rotaDoacao from "./Rotas/rotaDoacao.js";
import rotaCampo from "./Rotas/rotaCampo.js";

const app = express();

/* const host = "localhost";
const port = "4002"; */

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/agendamento", rotaAgendamento);
app.use("/usuario", rotaUsuario);
app.use("/denuncia", rotaDenuncia);
app.use("/doacao", rotaDoacao);
app.use("/campo", rotaCampo);

/* app.listen(port, host, () => {
  console.log(`API escutando no link: https://${host}/${port}`);
}); */

app.listen(3007, "localhost", () => {
  console.log("API escutando no link: http://localhost:3007/usuario");
});

app.listen(3008, "localhost", () => {
  console.log("API escutando no link: http://localhost:3008/agendamento");
});

app.listen(3009, "localhost", () => {
  console.log("API escutando no link: http://localhost:3009/denuncia");
});

app.listen(3010, "localhost", () => {
  console.log("API escutando no link: http://localhost:3010/doacao");
});

app.listen(3011, "localhost", () => {
  console.log("API escutando no link: http://localhost:3011/campo");
});
