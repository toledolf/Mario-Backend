import Treinador from "../Modelo/Treinador.js";

export default class TreinadorCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const nome = dados.nome;
      const cidade = dados.cidade;
      const email = dados.email;
      const telefone = dados.telefone;
      const descricao = dados.descricao;

      if (nome && cidade && email && telefone && descricao) {
        const treinador = new Treinador(0, nome, cidade,  email, telefone, descricao);
        await treinador.gravar();
        resp.json({
          status: true,
          mensagem: "Treinador cadastrado com sucesso!",
        });
      } else {
        resp.json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de um Treinador conforme documentação da API!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const treinador = new Treinador();
      treinador
        .consultar("")
        .then((treinadores) => {
          resp.status(200).json(treinadores);
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
      const treinador = new Treinador();
      treinador
        .consultarId(id)
        .then((treinadores) => {
          resp.status(200).json(treinadores);
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
