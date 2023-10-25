import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

import { ButtonStyled } from './styled';

const Button = ({ value }) => {
  return (
    <ButtonStyled
      as={motion.button}
      initial={{
        background: 'linear-gradient(90deg, #ff6489 0%, #f9b24e 100%)',
      }}
      animate={{
        background: 'linear-gradient(90deg, #f9b24e 0%, #ff6489 100%)',
        transition: {
          repeat: Infinity,
          duration: 3,
        },
      }}
    >
      {value}
    </ButtonStyled>
  );
};

Button.propTypes = {
  value: PropTypes.string.isRequired,
};

export default Button;