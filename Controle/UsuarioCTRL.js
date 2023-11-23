import Usuario from "../Modelo/Usuario.js";
export class UsuarioCTRL {
  async gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST") {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const senha = dados.senha;
      const userLevel = dados.userLevel;
      const nome = dados.nome;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const tel = dados.tel;
      const sexo = dados.sexo;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const treinador = dados.treinador;
      const jogador = dados.jogador;
      if (
        cpf &&
        senha &&
        userLevel &&
        nome &&
        dataNasc &&
        email &&
        tel &&
        sexo &&
        cidade &&
        uf &&
        treinador &&
        jogador
      ) {
        const usuario = new Usuario(
          cpf,
          senha,
          userLevel,
          nome,
          dataNasc,
          email,
          tel,
          sexo,
          cidade,
          uf,
          treinador,
          jogador
        );

        usuario
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario cadastrado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe TODOS os dados!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  async verificarCredenciais(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST") {
      const { path } = requisicao;

      if (path === "/usuario") {
        return this.gravar(requisicao, resposta);
      }
      const dados = requisicao.body;
      const usuarioCpf = dados.usuario.cpf;
      const senha = dados.senha;

      if (usuarioCpf) {
        try {
          const usuarioInstance = new Usuario(usuarioCpf, senha);
          const resultadoAutenticacao = await usuarioInstance.verificarCredenciais();

          if (!resultadoAutenticacao.autenticado) {
            resposta.status(400).json({
              status: 400,
              error: {
                autenticado: false,
                message: "Credenciais inválidas!",
              },
            });
          } else {
            resposta.status(200).json({
              status: 200,
              message: "Autenticado com sucesso!",
              userLevel: resultadoAutenticacao.userLevel,
              autenticado: true,
            });
          }
        } catch (erro) {
          resposta.status(400).json({
            status: 400,
            error: {
              erro: erro.message,
              message: "Erro ao autenticar!",
            },
          });
        }
      } else {
        resposta.status(400).json({
          status: 400,
          error: {
            autenticado: false,
            mensagem: "Método não permitido ou dados JSON não fornecidos!",
          },
        });
      }
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");

    if (requisicao.method === "PUT") {
      const dados = requisicao.body;
      const cpf = dados.cpf;
      const senha = dados.senha;
      const userLevel = dados.userLevel;
      const nome = dados.nome;
      const dataNasc = dados.dataNasc;
      const email = dados.email;
      const tel = dados.tel;
      const sexo = dados.sexo;
      const cidade = dados.cidade;
      const uf = dados.uf;
      const treinador = dados.treinador;
      const jogador = dados.jogador;
      if (
        cpf &&
        senha &&
        userLevel &&
        nome &&
        dataNasc &&
        email &&
        tel &&
        sexo &&
        cidade &&
        uf &&
        treinador &&
        jogador
      ) {
        const usuario = new Usuario(
          cpf,
          senha,
          userLevel,
          nome,
          dataNasc,
          email,
          tel,
          sexo,
          cidade,
          uf,
          treinador,
          jogador
        );

        usuario
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe TODOS os dados!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  excluir(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "DELETE") {
      const dados = requisicao.body;
      const cpf = dados.cpf;

      if (cpf) {
        const usuario = new Usuario(cpf);

        usuario
          .removerDoBancoDados()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Usuario removido com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o cpf!",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido ou usuário JSON não fornecido!",
      });
    }
  }

  consultar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "GET") {
      const usuario = new Usuario();

      usuario
        .consultar("")
        .then((usuarios) => {
          resposta.status(200).json(usuarios);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido!",
      });
    }
  }

  consultarPeloCPF(requisicao, resposta) {
    resposta.type("application/json");
    const cpf = requisicao.params["cpf"];

    if (requisicao.method === "GET") {
      const usuario = new Usuario();
      usuario
        .consultarCPF(cpf)
        .then((usuarios) => {
          resposta.status(200).json(usuarios);
        })
        .catch((erro) => {
          resposta.status(500).json({
            status: false,
            mensagem: erro.message,
          });
        });
      console.log(cpf);
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Método não permitido!",
      });
    }
  }
}
