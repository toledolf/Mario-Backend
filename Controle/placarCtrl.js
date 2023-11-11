import Placar from "../Modelo/Placar.js";

export default class PlacarCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const time_id_1 = dados.time_id_1;
      const resultado_time_id_1 = dados.resultado_time_id_1;
      const time_id_2 = dados.time_id_2;
      const resultado_time_id_2 = dados.resultado_time_id_2;
      const data = dados.data;

      if (time_id_1 && resultado_time_id_1 && time_id_2 && resultado_time_id_2, data) {
        const placar = new Placar(
          0,
          time_id_1,
          resultado_time_id_1,
          time_id_2,
          resultado_time_id_2,
          data
        );
        await placar.gravar();
        resp.json({
          status: true,
          mensagem: "Placar registrado com sucesso!",
        });
      } else {
        resp.json({
          status: false,
          mensagem:
            "Informe adequadamente todos os dados de um Placar conforme documentação da API!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const placar = new Placar();
      placar
        .consultarDados("")
        .then((placar) => {
          resp.status(200).json(placar);
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
      const placar = new Placar();
      placar
        .consultarCodigo(id)
        .then((placar) => {
          resp.status(200).json(placar);
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
