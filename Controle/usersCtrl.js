import Users from "../Modelo/Users.js";
import Usuario from "../Modelo/Usuario.js";

export default class UsersCTRL {
  async gravar(req, res) {
    res.type("application/json");

    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const cpf = dados.usuario.cpf;
      const password = dados.password;
      const accessLevel = dados.accessLevel;

      const usuario = new Usuario(0, "");

      const existeUsuario = await usuario.consultarCPF(cpf);

      if (existeUsuario) {
        try {
          const users = new Users(0, cpf, password, accessLevel);
          await users.gravar();

          res.json({ message: "Usuario registrado" });
        } catch {
          res.json({
            status: false,
            mensagem: "Usuário não encontrado!",
          });
        }
      } else {
        res.json({
          status: false,
          mensagem: "Usuário não encontrado!",
        });
      }
    }
  }

  async verificarUser(req, res) {
    res.type("application/json");

    if (req.method === "POST" && req.is("application/json")) {
      const dados = req.body;
      const id = dados.id;
      const password = dados.password;

      const idUsuario = new Users(0, "");
      const passwordUsuario = new Users("")

      const existeId = await idUsuario.consultarId(id);
      const correctPassword = await passwordUsuario.consultarId(id).then((senha) => {
        
      })

      if (existeId) {
        // Se o usuário for encontrado e a senha estiver correta, retorne o nível de acesso
        res.json({ accessLevel: user.accessLevel });
      } else {
        res.json({
          status: false,
          mensagem: "Credenciais inválidas!",
        });
      }
    }
  }

  consultar(req, resp) {
    resp.type("application/json");
    if (req.method === "GET") {
      const users = new Users();
      users
        .consultar("")
        .then((users) => {
          resp.status(200).json(users);
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

  consultarId(req, resp) {
    resp.type("application/json");

    const id = req.params["id"];

    if (req.method === "GET") {
      const users = new Users();
      users
        .consultarId(id)
        .then((users) => {
          resp.status(200).json(users);
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
