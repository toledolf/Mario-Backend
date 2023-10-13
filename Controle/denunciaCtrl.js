import Usuario from "../Modelo/Usuario.js";
import Denuncia from "../Modelo/Denuncia.js";

export default class DenunciaCTRL {
  async gravar(req, resp) {
    resp.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const data = dados.data;
      const horario = dados.horario;
      const campoSelecionado = dados.campoSelecionado;
      const nomeInfrator = dados.nomeInfrator;
      const dadosDenuncia = dados.dadosDenuncia;
      const cpfUsuario = dados.usuario.cpf;

      if (cpfUsuario === "000.000.000-00") {
        try {
          const denuncia = new Denuncia(
            0,
            data,
            horario,
            campoSelecionado,
            nomeInfrator,
            dadosDenuncia,
            cpfUsuario
          );
          await denuncia.gravar();

          resp.json({
            status: true,
            mensagem: "Denuncia efetivado com sucesso!",
          });
        } catch (err) {
          resp.json({
            status: false,
            mensagem: "Usuário ou Campo não encontrado!",
          });
        }
      } else {
        const usuario = new Usuario(0, "");
        const existeUsuario = await usuario.consultarCPF(cpfUsuario);

        if (existeUsuario) {
          try {
            const denuncia = new Denuncia(
              0,
              data,
              horario,
              campoSelecionado,
              nomeInfrator,
              dadosDenuncia,
              cpfUsuario
            );
            await denuncia.gravar();

            resp.json({
              status: true,
              codigo: denuncia.id,
              mensagem: "Denuncia efetivado com sucesso!",
            });
          } catch (err) {
            resp.json({
              status: false,
              mensagem: "Usuário ou Campo não encontrado!",
            });
          }
        } else {
          resp.json({
            status: false,
            mensagem: "Usuário ou Campo não encontrado!",
          });
        }
      }
    }
  }

  /* async atualizar(req, resp) {
    resp.type("application/json");
    if (req.method === "PUT") {
      try {
        const dados = req.body;
        const codigo = dados.codigo;
        const campo = dados.campo;
        const data = dados.data;
        const horario = dados.horario;
        const cpfUsuario = dados.usuario.cpf;
        const usuario = await new Usuario(0, "").consultarCPF(cpfUsuario);

        if (cpfUsuario) {
          const agendamento = new Agendamento(codigo, campo, data, horario, cpfUsuario);
          await agendamento.atualizar();

          resp.json({
            status: true,
            codigo: agendamento.codigo,
            mensagem: "Agendamento atualizado com sucesso!",
          });
        }  else {
          resp.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } catch (err) {
        resp.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  } */

  /* excluir(req, resp) {
    resp.type("application/json");
    if (req.method === "DELETE") {
      const dados = req.body;
      const codigo = dados.codigo;
      if (codigo) {
        const agendamento = new Agendamento(codigo);
        agendamento
          .excluirDados()
          .then(() => {
            resp.status(200).json({
              status: true,
              mensagem: "Agendamento excluído com sucesso!",
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
  } */

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const denuncia = new Denuncia();
      denuncia
        .consultar("")
        .then((denuncias) => {
          resp.status(200).json(denuncias);
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
      const denuncia = new Denuncia();
      denuncia
        .consultarCodigo(id)
        .then((denuncia) => {
          resp.status(200).json(denuncia);
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
