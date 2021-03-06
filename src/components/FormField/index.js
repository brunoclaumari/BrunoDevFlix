import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const FormFieldWrapper = styled.div`
  position: relative; 
  textarea {
    min-height: 150px;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active,    
  input:-webkit-autofill:hover { 
    transition: all 5000s ease-in-out 0s;
    transition-property: #53585D, #F5F5F5;
  }
   
  input[type="color"] {
    padding-left: 56px;
    color: #000;
  }
`;

const Label = styled.label``;
Label.Text = styled.span`
  color: #E5E5E5;
  height: 57px;
  position: absolute; 
  top: 0;
  left: 16px;
  
  display: flex;
  align-items: center;
  
  transform-origin: 0% 0%;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  
  transition: .1s ease-in-out;  
`;

const MyTag = styled.input`
  background-color: #53585D;
  color: #F5F5F5;
  display: block;
  width: 100%;
  height: 57px;
  font-size: 18px;
  
  outline: 0;
  border: 0;
  border-top: 4px solid transparent;
  border-bottom: 4px solid #53585D;  
  
  padding: 16px 16px;
  margin-bottom: 45px;
  
  resize: none;
  border-radius: 4px;
  transition: border-color .3s;
  
}
  
  &:focus {
    border-bottom-color: var(--primary);        
  }
  &:focus:not([type='color']) + ${Label.Text} {
    transform: scale(.6) translateY(-10px);       
  }
  ${({ value }) => {
    const hasValue = value.length > 0;
    // eslint-disable-next-line no-undef
    return hasValue && css`
        &:not([type='color']) + ${Label.Text} {
          transform: scale(.6) translateY(-10px);        
        }
      `;
  }
}
`;

function FormField({
  tituloLabel,
  type,
  tipoDeTag,
  atributo,
  campo,
  funcaoHandleChange,
  suggestions,
}) {
  const fieldId = `id_${campo}`;
  const tag = tipoDeTag;
  const hasSuggestions = Boolean(suggestions.length);

  return (
    <FormFieldWrapper>
      <Label
        htmlFor={fieldId}
      >
        <MyTag
          as={tag}
          id={fieldId}
          type={type}
          value={atributo}
          name={campo}
          onChange={funcaoHandleChange}
          list={`suggestionFor_${fieldId}`}
          autoComplete={hasSuggestions ? 'off' : 'on'}
          required
        />
        <Label.Text>
          {tituloLabel}
          :
        </Label.Text>
        {hasSuggestions && (
        <datalist id={`suggestionFor_${fieldId}`}>
          {
            suggestions.map((suggest) => (
              <option value={suggest} key={`suggestionFor_${fieldId}option${suggest}`}>
                {suggest}
              </option>
            ))
          }
        </datalist>
        )}
      </Label>
    </FormFieldWrapper>
  );
}

FormField.defaultProps = {
  type: 'text',
  atributo: '',
  tipoDeTag: 'input',
  suggestions: [],
  // funcaoHandleChange: () => { },
};

FormField.propTypes = {
  tituloLabel: PropTypes.string.isRequired,
  type: PropTypes.string,
  tipoDeTag: PropTypes.string,
  atributo: PropTypes.string,
  campo: PropTypes.string.isRequired,
  funcaoHandleChange: PropTypes.func.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.string),
};

export default FormField;
