import Jogador from "../Modelo/Jogador.js";
import Time from "../Modelo/Time.js";
import Usuario from "../Modelo/Usuario.js";


export default class JogadorCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const posicao = dados.posicao;
      const time_id = dados.time;
      const cpfJogador = dados.usuario;

      const time = new Time(0, "");
      const usuario = new Usuario(0, "");

      const existeTime = await time.consultarId(time_id);
      const existeUsuario = await usuario.consultarCPF(cpfJogador);

      if (existeTime && existeUsuario) {
        try {
          const jogador = new Jogador(0, posicao, time_id, cpfJogador);
          await jogador.gravar();
          resp.json({
            status: true,
            mensagem: "Jogador gravado com sucesso!",
          });
        } catch (err) {
          resp.json({
            status: false,
            mensagem: "Usuário ou Time não encontrado!",
          });
        }
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const jogador = new Jogador();
      jogador
        .consultar("")
        .then((jogador) => {
          resp.status(200).json(jogador);
        })
        .catch((erro) => {
          resp.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resp.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }

  consultarPorId(req, resp) {
    resp.type("application/json");

    const id = req.params["id"];

    if (req.method === "GET") {
      const jogador = new Jogador();
      jogador
        .consultarId(id)
        .then((jogador) => {
          resp.status(200).json(jogador);
        })
        .catch((erro) => {
          resp.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resp.status(400).json({
        status: false,
        mensagem: "Método não permitido! Consulte a documentação da API.",
      });
    }
  }
}
