import styled from 'styled-components';

export const TextAreaStyled = styled.textarea`
  background-color: white;
  border: 1px solid black;
  padding: 0 7px;
  resize: none;
  border-radius: 7px;
  overflow: hidden;
  height: ${(props) => props.$textareaHeight || 'auto'};
  width: 100%;
`;