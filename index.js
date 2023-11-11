import cors from "cors";
import express from "express";
import rotaAgendamento from "./Rotas/rotaAgendamento.js";
import rotaUsuario from "./Rotas/rotaUsuario.js";
import rotaDenuncia from "./Rotas/rotaDenuncia.js";
import rotaDoacao from "./Rotas/rotaDoacao.js";
import rotaCampo from "./Rotas/rotaCampo.js";
import rotaTorneio from "./Rotas/rotaTorneio.js";
import rotaTime from "./Rotas/rotaTime.js";
import rotaJogador from "./Rotas/rotaJogador.js";
import rotaUsers from "./Rotas/rotaUsers.js";
import rotaPlacar from "./Rotas/rotaPlacar.js";
import rotaTreinador from "./Rotas/rotaTreinador.js";

const app = express();

const host = "localhost";
const port = "3010";

app.use(cors({ origin: "*" }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/agendamento", rotaAgendamento);
app.use("/usuario", rotaUsuario);
app.use("/time", rotaTime);
app.use("/jogador", rotaJogador);
app.use("/denuncia", rotaDenuncia);
app.use("/doacao", rotaDoacao);
app.use("/campo", rotaCampo);
app.use("/torneios", rotaTorneio);
app.use("/users", rotaUsers);
app.use("/placar", rotaPlacar);
app.use("/treinador", rotaTreinador);

app.listen(port, host, () => {
  console.log(`API escutando no link: https://${host}/${port}`);
});
