import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Input } from '@chakra-ui/react';
import Swal from 'sweetalert2';

import { GlobalContext } from '../../contexts/GlobalContext';
import Button from '../../components/button';
import { createNewUser } from '../../services/api';
import { goToHome } from '../../routes/coordinator';

import { Container, Form } from './styled';

const SignUp = () => {
  const context = useContext(GlobalContext);
  const { nickname, setNickname, email, setEmail, password, setPassword } =
    context;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await createNewUser(nickname, email, password);

    if (!result) return;

    if (result.status === 201) {
      Swal.fire({
        text: `${result.data.message}`,
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then((result) => {
        if (result.isConfirmed) {
          goToHome(navigate);
        }
      });
    }
  };

  return (
    <Container
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
    >
      <h2>Olá, boas vindas ao LabEddit ;)</h2>

      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          type="text"
          id="nickname"
          variant="outline"
          placeholder="Apelido"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          isRequired={true}
        />
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

        <p className="first">
          Ao continuar, você concorda com o nosso{' '}
          <span>Contrato de usuário</span> e nossa{' '}
          <span>Política de Privacidade</span>
        </p>

        <Checkbox colorScheme="green" id="check">
          <p>Eu concordo em receber emails sobre coisas legais no Labeddit</p>
        </Checkbox>

        <Button value={'Cadastrar'} />
      </Form>
    </Container>
  );
};

export default SignUp;