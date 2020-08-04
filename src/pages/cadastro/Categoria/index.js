import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';

let ultId = 0;
let limparPressionado = false;

function useForm(valoresIniciais) {
  const [valuesCateg, setValues] = useState(valoresIniciais);

  function handlePost() {
    // const url = '../../../../db.json';
    const url = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://brunodevflix.herokuapp.com/categorias';

    if (!limparPressionado) {
      // limparPressionado = false;
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(valuesCateg),
        headers: {
          'content-type': 'application/json',
        },
      }).then((data) => data.json())
        .catch((erro) => console.log(erro.message))
        .then((response) => console.log('Success:', response));
    }
  }

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

  function clearForm() {
    limparPressionado = true;
    setValues(valoresIniciais);
  }

  return {
    valuesCateg,
    handleChange,
    clearForm,
    handlePost,
  };
}

function CadastroCategoria() {
  /*
            1º-criar a constante que vai receber o estado (sintaxe exemp. abaixo)
            --[nomeDaConstante, metodo1,metodo2]=useState('Valor desejado');
            2º-depois atribuir no 'value' o nome da const;
            3º-para que a página aceite alterações, é necessário criar
            uma função dentro do evento 'onChange' que faça com que algum
            método receba o valor digitado
        */

  const [listaDeCategorias, setCategorias] = useState([]);

  // classe para atribuição de valores da categoria;
  const valoresIniciais = {
    id: 0,
    nome: '',
    descricao: '',
    cor: '#000',
  };

  const {
    handleChange, valuesCateg, clearForm,
    handlePost,
  } = useForm(valoresIniciais);

  useEffect(() => {
    // eslint-disable-next-line no-console
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://brunodevflix.herokuapp.com/categorias';
      // aqui vai passar a url para pegar os dados
    fetch(URL_TOP)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        ultId = resposta[resposta.length - 1].id;
        valoresIniciais.id = ultId + 1;
        setCategorias([
          ...resposta,
        ]);
      });
  }, []);

  return (
    <PageDefault>
      <h1>
        {' '}
        Cadastro de Categoria:
        {valuesCateg.nome}
      </h1>
      <form onSubmit={function handleSubmit(infoDoSubmit) {
        ultId = listaDeCategorias[listaDeCategorias.length - 1].id;
        valuesCateg.id = ultId + 1;
        valoresIniciais.id = valuesCateg.id + 1;

        // let idExiste = false;
        infoDoSubmit.preventDefault();
        /* for (let i = 0; i < listaDeCategorias.length; i += 1) {
          if (listaDeCategorias[i].id === valuesCateg.id) {
            idExiste = true;
            break;
          }
        } */

        if (!limparPressionado) {
          valoresIniciais.id = valuesCateg.id + 1;
          setCategorias([
            ...listaDeCategorias,
            valuesCateg,
          ]);
        } else {
          valoresIniciais.id = valuesCateg.id;
          setCategorias([
            ...listaDeCategorias,
          ]);
        }

        /*
        else {
          // valoresIniciais.id = valuesCateg.id + 1;
          limparPressionado = true;
          alert('Esse id já existe');
        }
        */

        // valoresIniciais.id = valuesCateg.id + 1;

        clearForm();
        limparPressionado = false;
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
        <div>
          <Button
            name="cadastro"
            onClick={handlePost}
            style={{ backgroundColor: '#FFA500' }}
          >
            Cadastrar
          </Button>
          <Button
            onClick={clearForm}
            style={{ backgroundColor: 'gray' }}
          >
            Limpar
          </Button>
        </div>
      </form>

      {listaDeCategorias.length === 0
        && (
          <div>
            Loading...
          </div>
        )}

      <ul>
        {listaDeCategorias.map((categoria) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={`${categoria.id}`}>
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

// lógica de ouro
/*
 if (!limparPressionado && !idExiste) {
          valoresIniciais.id = valuesCateg.id + 1;
          setCategorias([
            ...listaDeCategorias,
            valuesCateg,
          ]);
        } else if (limparPressionado && !idExiste) {
          valoresIniciais.id = valuesCateg.id;
          setCategorias([
            ...listaDeCategorias,
          ]);
        } else if (!limparPressionado && idExiste) {
          valoresIniciais.id = valuesCateg.id;
          setCategorias([
            ...listaDeCategorias,
            valuesCateg,
          ]);
        } else if (limparPressionado && idExiste) {
          valoresIniciais.id = valuesCateg.id + 1;
          setCategorias([
            ...listaDeCategorias,
          ]);
        }
*/

/*
if (!limparPressionado) {
          if (!idExiste) {
            valoresIniciais.id = valuesCateg.id + 1;
            setCategorias([
              ...listaDeCategorias,
              valuesCateg,
            ]);
          } else {
            valoresIniciais.id = valuesCateg.id + 1;
            setCategorias([
              ...listaDeCategorias,
            ]);
          }
        } else {
          valoresIniciais.id = ultId + 1;
        }
*/

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

/*
      const [items, setItems] = useState(listaDeCategorias);

    // fetch('../../../../db.json')
    useEffect(() => {
      fetch('../../../../db.json')
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.items);
          }
      )
  }, [])

     */

// método que estava dentro do form
/*
     {function handleSubmit(infoDoSubmit) {
        // valuesCateg.id += 1;
        valuesCateg.id = listaDeCategorias.length + 1;
        valoresIniciais.id = valuesCateg.id + 1;
        infoDoSubmit.preventDefault();
        setCategorias([
          ...listaDeCategorias,
          valuesCateg,
        ]);

        clearForm();
      }}
     */
