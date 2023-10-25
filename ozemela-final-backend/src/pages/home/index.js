import { useContext } from 'react';
import { Input } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/button';
import Line from '../../components/line';
import { GlobalContext } from '../../contexts/GlobalContext';
import { goToSignUp } from '../../routes/coordinator';

import { ButtonStyled, Container, Form } from './styled';

import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/authorization';

const Home = () => {
  const context = useContext(GlobalContext);
  const { email, setEmail, password, setPassword } = context;
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);
  };

  return (
    <Container
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
    >
      <figure>
        <img src={logo} alt="Logo LabEddit" />
      </figure>

      <h1>LabEddit</h1>

      <p>O projeto de rede social da Labenu</p>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="email"
          id="email"
          variant="outline"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          isRequired={true}
        />
        <Input
          type="password"
          id="password"
          variant="outline"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isRequired={true}
        />

        <Button value={'Continuar'} />
      </Form>

      <Line />

      <ButtonStyled onClick={() => goToSignUp(navigate)}>
        Crie uma conta!
      </ButtonStyled>
    </Container>
  );
};

export default Home;