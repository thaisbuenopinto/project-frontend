import styled from 'styled-components';

export const Container = styled.nav`
  display: ${(props) => (props.$showMenu ? 'grid' : 'none')};
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  background-color: #ededed;
  padding: 0.5rem 2rem;
  align-items: center;

  figure {
    text-align: center;
    margin: 0 auto;
    width: 35%;
  }

  figure img {
    width: 100%;
  }

  p {
    font-family: 'Noto Sans';
    font-weight: 600;
    color: #4088cb;
    text-align: right;
  }

  .close {
    color: #a3a3a3;
    text-align: left;
    font-size: 1.5rem;
  }
`;