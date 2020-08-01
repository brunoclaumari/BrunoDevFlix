import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

function CadastroCategoria() {
  /*
            1º-criar a constante que vai receber o estado (sintaxe exemp. abaixo)
            --[nomeDaConstante, metodo1,metodo2]=useState('Valor desejado');
            2º-depois atribuir no 'value' o nome da const;
            3º-para que a página aceite alterações, é necessário criar
            uma função dentro do evento 'onChange' que faça com que algum
            método receba o valor digitado
        */
  // classe para atribuição de valores da categoria;
  const valoresIniciais = {
    nome: '',
    descricao: '',
    cor: '',
  };
  const [listaDeCategorias, setCategorias] = useState([]);
  const [valuesCateg, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...valuesCateg,
      [chave]: valor, // nome: 'valor'
    });
  }

  function handleChange(infosDoEvento) {
    // const { getAttribute, value } = infosDoEvento.target;
    setValue(
      infosDoEvento.target.getAttribute('name'),
      infosDoEvento.target.value,
    );
  }

  return (
    <PageDefault>
      <h1>
        {' '}
        Cadastro de Categoria:
        {valuesCateg.nome}
      </h1>
      <form onSubmit={function handleSubmit(infoDoSubmit) {
        infoDoSubmit.preventDefault();
        setCategorias([
          ...listaDeCategorias,
          valuesCateg,
        ]);

        setValues(valoresIniciais);
      }}
      >

        <FormField
          tituloLabel="Nome da Categoria"
          type="text"
          tipoDeTag="input"
          categAtributo={valuesCateg.nome}
          campo="nome"
          funcaoHandleChange={handleChange}
        />

        <FormField
          tituloLabel="Descrição da Categoria"
          type="text"
          tipoDeTag="textarea"
          categAtributo={valuesCateg.descricao}
          campo="descricao"
          funcaoHandleChange={handleChange}
        />

        <FormField
          tituloLabel="Cor da Categoria"
          type="color"
          tipoDeTag="input"
          categAtributo={valuesCateg.cor}
          campo="cor"
          funcaoHandleChange={handleChange}
        />
        <Button>
          Cadastrar
        </Button>
      </form>

      <ul>
        {listaDeCategorias.map((categoria, indice) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${categoria}${indice}`}>
            {categoria.nome}
          </li>
        ))}
      </ul>
      <Link to="/">
        Ir para home
      </Link>
    </PageDefault>
  );
}

export default CadastroCategoria;
