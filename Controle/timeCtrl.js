import Time from "../Modelo/Time.js";

export default class TimeCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const nome = dados.nome;
      const cidade = dados.cidade;
      const fundacao = dados.fundacao;
      const treinador = dados.treinador.id;

      if (nome && cidade && fundacao) {
        const time = new Time(0, nome, cidade, fundacao, treinador);
        await time.gravar();
        resp.json({
          status: true,
          mensagem: "Time cadastrado com sucesso!",
        });
      } else {
        resp.json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de um Time conforme documentação da API!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const time = new Time();
      time
        .consultar("")
        .then((time) => {
          resp.status(200).json(time);
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
      const time = new Time();
      time
        .consultarId(id)
        .then((time) => {
          resp.status(200).json(time);
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
