import { Container, NotFound } from './styled';

const Error = () => {
  return (
    <Container
      key="error"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 1 }}
    >
      <NotFound>
        <span>404</span>
        Não foi possível encontrar a página!
      </NotFound>
    </Container>
  );
};

export default Error;