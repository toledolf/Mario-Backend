import Campo from "../Modelo/Campo.js";

export default class CampoCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const corReferencial = dados.corReferencial;
      const descricao = dados.descricao;

      if (corReferencial && descricao) {
        const campo = new Campo(corReferencial, descricao);
        await campo.gravar();
        resp.json({
          status: true,
          mensagem: "Campo cadastrado com sucesso!",
        });
      } else {
        resp.json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de um Campo conforme documentação da API!",
        });
      }
    }
  }

  async atualizar(req, resp) {
    resp.type("application/json");
    if (req.method === "PUT") {
      try {
        const dados = req.body;
        const id = dados.id;
        const corReferencial = dados.corReferencial;
        const descricao = dados.descricao;

        if (id && corReferencial && descricao) {
          const campo = new Campo(id, corReferencial, descricao);
          await campo.atualizar();
          resp.json({
            status: true,
            mensagem: "Campo atualizado com sucesso!",
          });
        } else {
          resp.json({
            status: false,
            mensagem:
              "Informe adequadamente todos os dados de um Campo conforme documentação da API!",
          });
        }
      } catch (err) {
        resp.json({
          status: false,
          mensagem: "Método não permitido! Consulte a documentação da API.",
        });
      }
    }
  }

  excluir(req, resp) {
    resp.type("application/json");
    if (req.method === "DELETE") {
      const dados = req.body;
      const id = dados.id;
      if (id) {
        const campo = new Campo(id);
        campo
          .excluirDados()
          .then(() => {
            resp.status(200).json({
              status: true,
              mensagem: "Campo excluído com sucesso!",
            });
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
          mensagem:
            "Informe adequadamente todos os dados de um Agendamento conforme documentação da API!",
        });
      }
    } else {
      resp.status(400).json({
        status: false,
        mensagem:
          "Método não permitido ou cliente no formato JSON não fornecido!\
                          Consulte a documentação da API.",
      });
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const campo = new Campo();
      campo
        .consultar("")
        .then((campo) => {
          resp.status(200).json(campo);
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
      const campo = new Campo();
      campo
        .consultarId(id)
        .then((campo) => {
          resp.status(200).json(campo);
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
