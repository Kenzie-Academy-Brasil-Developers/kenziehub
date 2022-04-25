import { Link, Redirect, useHistory } from "react-router-dom";
import api from "../../services/api";
import { Container, Header, Content, ContentUser, ContentAdd } from "./styles";
import Logo from "../../assets/logo.svg";
import ButtonLogout from "../../components/ButtonLogout";
import React, { useState, useEffect } from "react";
import ModalAdd from "../../components/ModalAdd";
import ModalTech from "../../components/ModalTech";
import Card from "../../components/Card";

const Dashboard = ({ autentication, setAutentication }) => {
  const user = JSON.parse(localStorage.getItem("@KenzieHub:user"));

  const [id, setId] = useState("")

  const [title, setTitle] = useState("")

  const [getTech, setGetTech] = useState([]);

  const catchTech = () => {
    api.get(`/users/${user.id}`).then((res) => setGetTech(res.data.techs));
  };

  useEffect(() => {
    catchTech();
  }, []);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const history = useHistory()

  const logout = () => {
    localStorage.clear();
    history.push("/")
    return setAutentication(false);
  };

  const [openTech, setOpenTech] = useState(false);

  const onOpenTech = () => {
    setOpenTech(true);
  };

  const onCloseTech = () => {
    setOpenTech(false);
  };

  if (!autentication) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Content>
        <Header>
          <img src={Logo} alt="logo" />
          <ButtonLogout onClick={logout}>
           Sair
          </ButtonLogout>
        </Header>
        <hr />
        <ContentUser>
          <h1>Olá, {user.name}</h1>
          <span>{user.course_module}</span>
        </ContentUser>
        <hr />
        <ContentAdd>
          <h3>Tecnologias</h3>
          <button onClick={onOpenModal}>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path
                  fill="currentColor"
                  d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                ></path>
              </svg>{" "}
            </span>
          </button>
          {open && (
            <ModalAdd onOpenModal={onOpenModal} onCloseModal={onCloseModal}/>
          )}
          {openTech && (
            <ModalTech onOpenModal={onOpenTech} onCloseModal={onCloseTech} id={id} catchTech={catchTech} title={title} setOpenTech={setOpenTech}/>
          )}
        </ContentAdd>
        <Card getTech={getTech} openTech={onOpenTech} setId={setId} setTitle={setTitle}/>
      </Content>
    </Container>
  );
};

export default Dashboard;
