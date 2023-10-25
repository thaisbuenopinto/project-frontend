import { useState } from 'react';
import PropTypes from 'prop-types';

import { TextAreaStyled } from './styled';

const AutoExpandTextArea = (props) => {
  const { value, change } = props;
  const [textareaHeight, setTextareaHeight] = useState('30px');

  const handleTextChange = (e) => {
    change(e.target.value);

    
    const lineHeight = 30; 
    const minRows = 1; 
    const maxRows = 10; 

    const lines = e.target.value.split('\n').length;
    const newHeight = Math.min(
      maxRows * lineHeight,
      Math.max(minRows * lineHeight, lines * lineHeight),
    );

    setTextareaHeight(`${newHeight}px`);
  };

  return (
    <TextAreaStyled
      $textareaHeight={textareaHeight}
      value={value}
      onChange={handleTextChange}
      placeholder="Edite seu Post digitando aqui..."
    />
  );
};

export default AutoExpandTextArea;

AutoExpandTextArea.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};