import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Redirect, useHistory } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../services/api";
import Input from "../../components/Input";
import Button from "../../components/Button"
import { Container, Content} from "./styles";
import Logo from "../../assets/logo.svg"

const Login = ({ autentication, setAutentication }) => {
  const schema = yup.object().shape({
    email: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo 6 dígitos")
      .required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const history = useHistory();

  const onSubmit = (data) => {
    api
      .post("/sessions", data)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("@KenzieHub:token", JSON.stringify(token));
        localStorage.setItem("@KenzieHub:user", JSON.stringify(user));
        setAutentication(true);
        toast.success("Logado com sucesso (:")
        return history.push("/dashboard");
      })
      .catch((err) => {
        toast.error("Algo deu errado ):")
      });
  };

  if (autentication) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Container>
        <img src={Logo} alt="logo"/>
      <Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <Input
            register={register}
            name="email"
            icon={FiMail}
            label="Email"
            placeholder="Email"
            error={errors.email?.message}
          />
          <Input
            name="password"
            register={register}
            icon={FiLock}
            label="Senha"
            placeholder="Senha"
            type="password"
            error={errors.password?.message}
          />
          <Button type="submit" graySchema>Entrar</Button>
          <span>Ainda não possui uma conta?</span>
          <Button type="button" onClick={() => history.push("/signup")}>
            {" "}
           Cadastre-se
          </Button>
        </form>
      </Content>
    </Container>
  );
};

export default Login;
