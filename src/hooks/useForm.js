import { useState } from 'react';

// começa com 'use' pois é um padrão dos 'custom kooks'
function useForm(valoresIniciais) {
  const [values, setValues] = useState(valoresIniciais);
  // const [actLimpar, setActLimpar] = useState(limparPres);

  function setValue(chave, valor) {
    setValues({
      ...values,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  function clearForm() {
    setValues(valoresIniciais);
  }

  // valores que a função retorna para usar
  return {
    values,
    handleChange,
    clearForm,
    // handlePost,
  };
}

export default useForm;
