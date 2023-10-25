import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled(motion.main)`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 6rem;

  h1 {
    font-family: 'IBM Plex Sans';
    font-size: 36px;
    font-weight: 700;
    line-height: 47px;
    letter-spacing: 0em;
    text-align: left;
    color: #373737;
  }

  p {
    font-family: 'IBM Plex Sans';
    font-size: 16px;
    font-weight: 300;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: center;
  }
`;

export const Form = styled.form`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

export const ButtonStyled = styled.button`
  margin-top: 1.5rem;
  background: transparent;
  padding: 0.5rem 1rem;
  border: 1px solid #fe7e02;
  border-radius: 10rem;
  color: #fe7e02;
  font-size: 18px;
  font-family: 'Noto Sans';
  font-weight: 700;
  width: 100%;
`;