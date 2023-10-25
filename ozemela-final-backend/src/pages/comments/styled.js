import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Stack, Textarea } from '@chakra-ui/react';

export const Container = styled(motion.section)`
  padding: 1rem;
`;

export const TextareaStyled = styled(Textarea)`
  margin-top: 1rem;
  font-family: 'IBM Plex Sans';
  font-size: 18px;
  font-weight: 400;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  border-radius: 12px;
`;

export const StackStyled = styled(Stack)`
  background-color: #fbfbfb;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 10px;

  .top {
    display: flex;
    justify-content: space-between;

    p {
      color: #6f6f6f;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
    }
  }

  p:nth-child(2) {
    font-family: 'IBM Plex Sans';
    font-size: 18px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
  }

  .bottom {
    display: flex;
    gap: 1rem;
    width: 100%;

    .left {
      display: flex;
      gap: 1rem;
      align-items: center;
      border: 1px solid #ececec;
      border-radius: 28px;
      padding: 5px;

      p {
        font-size: 12px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0em;
        text-align: center;
        color: #6f6f6f;
      }
    }

    .middle {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      border: 1px solid #ececec;
      border-radius: 28px;
      padding: 5px 10px;

      p {
        font-size: 12px;
        font-weight: 700;
        line-height: 12px;
        letter-spacing: 0em;
        text-align: center;
        color: #6f6f6f;
      }
    }

    .right {
      margin-left: auto;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  button {
    margin-top: 1rem;
    border-radius: 12px;
  }
`;

export const EditPostArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid black;
  padding-top: 1rem;
`;