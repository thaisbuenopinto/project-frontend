import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.section)`
  padding: 1rem;
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const NotFound = styled.p`
  font-size: 1.1rem;

  span {
    margin-top: 2rem;
    display: block;
    font-size: 6rem;
    font-weight: bold;
    color: #fe7e02;
    text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.2);
    font-family: 'Pacifico';
    letter-spacing: 10px;
  }
`;