import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.section)`
  padding: 1rem;

  h2 {
    font-family: 'IBM Plex Sans';
    font-size: 33px;
    font-weight: 700;
    line-height: 43px;
    letter-spacing: 0em;
    text-align: left;
    margin-top: 1rem;
  }
`;

export const Form = styled.form`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  p {
    font-family: 'Noto Sans';
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: left;

    span {
      color: #4088cb;
    }
  }

  .first {
    margin-top: 2rem;
  }
`;