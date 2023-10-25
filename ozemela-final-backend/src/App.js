import { ChakraProvider } from '@chakra-ui/react';

import GlobalState from '../src/contexts/GlobalState';
import AppRoutes from './routes/router';
import GlobalStyle from './themes/GlobalStyle';

function App() {
  return (
    <ChakraProvider>
      <GlobalState>
        <GlobalStyle />
        <AppRoutes />
      </GlobalState>
    </ChakraProvider>
  );
}

export default App;
