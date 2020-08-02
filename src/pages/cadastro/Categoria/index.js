import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('alo alo w brasil');
    // aqui vai passar a url para pegar os dados
    const URL_TOP = 'http://localhost:8080/categorias';
    //
    fetch(URL_TOP)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        setCategorias([
          ...resposta,
        ]);
      });

    /* setTimeout(() => {
      setCategorias([
        ...listaDeCategorias,
        {
          id: 1,
          nome: 'Front End',
          descricao: 'Uma categoria bacanudassa',
          cor: '#6bd1ff',
        },
        {
          id: 2,
          nome: 'Back End',
          descricao: 'Outra categoria bacanudassa',
          cor: '#6bd1ff',
        },
      ]);
    }, 4 * 1000); */
  }, []);

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
          tituloLabel="Cor"
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

      {listaDeCategorias.length === 0
        && (
          <div>
            Loading...
          </div>
        )}

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
