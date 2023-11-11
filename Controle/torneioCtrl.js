import Usuario from "../Modelo/Usuario.js";
import Torneio from "../Modelo/Torneio.js";

export default class TorneioCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const modalidade = dados.modalidade;
      const numEquipes = dados.numEquipes;
      const data = dados.data;
      const cpfUsuario = dados.usuario.cpf;

      const usuario = new Usuario(0, "");
      const existeUsuario = await usuario.consultarCPF(cpfUsuario);

      if (existeUsuario) {
        try {
          const torneio = new Torneio(0, modalidade, numEquipes, data, cpfUsuario);
          await torneio.gravar();

          resp.json({
            status: true,
            codigo: torneio.id,
            mensagem: "Torneio efetivado com sucesso!",
          });
        } catch (err) {
          resp.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } else {
        resp.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const torneio = new Torneio();
      torneio
        .consultar("")
        .then((torneios) => {
          resp.status(200).json(torneios);
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

  consultarPorCodigo(req, resp) {
    resp.type("application/json");

    const id = req.params["id"];

    if (req.method === "GET") {
      const torneio = new Torneio();
      torneio
        .consultarId(id)
        .then((torneio) => {
          resp.status(200).json(torneio);
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
