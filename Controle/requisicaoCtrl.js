import Requisicao from "../Modelo/Requisicao.js";

export default class RequisicaoCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const user_cpf = dados.usuario.user_cpf;
      const dadosRequisicao = dados.requisicao;
      const data = dados.data;

      if (user_cpf && dadosRequisicao && data) {
        const requisicao = new Requisicao(0, user_cpf, dadosRequisicao, data);
        await requisicao.gravar();
        resp.json({
          status: true,
          mensagem: "Requisicao cadastrada com sucesso!",
        });
      } else {
        resp.json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de uma Requisicao conforme documentação da API!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const requisicao = new Requisicao();
      requisicao
        .consultar("")
        .then((requisicoes) => {
          resp.status(200).json(requisicoes);
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
      const requisicao = new Requisicao();
      requisicao
        .consultarId(id)
        .then((requisicoes) => {
          resp.status(200).json(requisicoes);
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
