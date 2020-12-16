import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import useForm from '../../../hooks/useForm';

// let ultId = 0;
let limparPressionado = true;

function CadastroCategoria() {
  /* r
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
    titulo: '',
    cor: '#000',
  };

  // constante que usa valores retornados da função
  const {
    handleChange, values, clearForm,
  } = useForm(valoresIniciais);

  function handlePost() {
    limparPressionado = false;
    // const url = '../../../../db.json';
    const url = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://brunodevflix.herokuapp.com/categorias';

    if (!limparPressionado && values.titulo !== '') {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        },
      }).then((data) => data.json())
        .catch((erro) => console.log(erro.message))
        .then((response) => console.log('Success:', response));
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-console
    const URL_TOP = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://brunodevflix.herokuapp.com/categorias';
      // aqui vai passar a url para pegar os dados
    fetch(URL_TOP)
      .then(async (respostaServidor) => {
        const resposta = await respostaServidor.json();
        /* ultId = resposta[resposta.length - 1].id;
        valoresIniciais.id = ultId + 1; */
        setCategorias([
          ...resposta,
        ]);
      });
    // limparPressionado = true;
  }, []);

  function actLimpar() {
    limparPressionado = true;
    // valoresIniciais.id = listaDeCategorias[listaDeCategorias.length - 1].id + 1;

    clearForm();
  }

  return (
    <PageDefault>
      <h1>
        {' '}
        Cadastro de Categoria:
        {values.titulo}
      </h1>
      <form onSubmit={function handleSubmit(infoDoSubmit) {
        /* ultId = listaDeCategorias[listaDeCategorias.length - 1].id;
        values.id = ultId + 1; */
        // values.id = listaDeCategorias[listaDeCategorias.length - 1].id + 1;
        infoDoSubmit.preventDefault();

        if (!limparPressionado) {
          // valoresIniciais.id = values.id + 1;
          setCategorias([
            ...listaDeCategorias,
            values,
          ]);
        } else {
          // valoresIniciais.id = listaDeCategorias[listaDeCategorias.length - 1].id + 1;
          setCategorias([
            ...listaDeCategorias,
          ]);
        }

        clearForm();
        // actLimpar();
        limparPressionado = false;
      }}
      >

        <FormField
          tituloLabel="Titulo da Categoria"
          type="text"
          tipoDeTag="input"
          atributo={values.titulo}
          campo="titulo"
          funcaoHandleChange={handleChange}
        />

        {/*
        <FormField
          tituloLabel="Descrição da Categoria"
          type="text"
          tipoDeTag="textarea"
          atributo={values.descricao}
          campo="descricao"
          funcaoHandleChange={handleChange}
        />
        */}

        <FormField
          tituloLabel="Cor"
          type="color"
          tipoDeTag="input"
          atributo={values.cor}
          campo="cor"
          funcaoHandleChange={handleChange}
        />
        <div>
          <Button
            name="enviar"
            onClick={handlePost}
            style={{
              backgroundColor: '#FFA500',
              marginRight: '15px',
              width: '150px',
              position: 'relative',
            }}

          >
            Cadastrar
          </Button>
          <Button
            onClick={actLimpar}
            style={{
              backgroundColor: 'gray',
              marginRight: '15px',
              width: '150px',
              position: 'relative',
            }}
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
            {categoria.titulo}
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

/*
if (!limparPressionado) {
            valoresIniciais.id = values.id + 1;
            setCategorias([
              ...listaDeCategorias,
              values,
            ]);
          } else {
            // valoresIniciais.id = values.id;
            valoresIniciais.id = listaDeCategorias[listaDeCategorias.length - 1].id + 1;
            setCategorias([
              ...listaDeCategorias,
            ]);
          }

          // clearForm();
          actLimpar();
          limparPressionado = false;
*/

// começa com 'use' pois é um padrão dos 'custom kooks'
/* function useForm(valoresIniciais) {
  const [valuesCateg, setValues] = useState(valoresIniciais);

  function setValue(chave, valor) {
    setValues({
      ...valuesCateg,
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
    limparPressionado = true;
    setValues(valoresIniciais);
  }

  // valores que a função retorna para usar
  return {
    valuesCateg,
    handleChange,
    clearForm,
    // handlePost,
  };
} */

// Estava dentro do useForm e eu tirei
/* function handlePost() {
    // const url = '../../../../db.json';
    const url = window.location.hostname.includes('localhost')
      ? 'http://localhost:8080/categorias'
      : 'https://brunodevflix.herokuapp.com/categorias';

    if (!limparPressionado) {
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
  } */

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
