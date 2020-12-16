import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PageDefault from '../../../components/PageDefault';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import videosRepository from '../../../repositories/videos';
import categoriasRepository from '../../../repositories/categorias';

function CadastroVideo() {
  const history = useHistory();
  const [categorias, setCategorias] = useState([]);
  const categoryTitles = categorias.map((categ) => (
    categ.titulo
  ));

  const { handleChange, values } = useForm({
    titulo: 'Vídeo padrão',
    url: 'https://www.youtube.com/watch?v=4cEMgap9wpk',
    categoria: 'Front End',
  });

  useEffect(() => {
    categoriasRepository
      .getAll()
      .then((categoriasFromServer) => {
        setCategorias(categoriasFromServer);
      });
  }, []);

  console.log(categorias);

  return (
    <PageDefault>
      <h1>Cadastro de Vídeo</h1>

      <form onSubmit={(event) => {
        event.preventDefault();
        // alert('Video cadastrado com sucesso!!');

        const categoriaEscolhida = categorias.find((categoria) => categoria.titulo === values.categoria);

        console.log('categoriaEscolhida', categoriaEscolhida);

        videosRepository.create({
          titulo: values.titulo,
          url: values.url,
          categoriaId: categoriaEscolhida.id,
        }).then(() => {
          console.log('Cadastrou com sucesso!');
          history.push('/');
        });
      }}
      >
        <FormField
          tituloLabel="Titulo do Vídeo"
          type="text"
          tipoDeTag="input"
          atributo={values.titulo}
          campo="titulo"
          funcaoHandleChange={handleChange}
        />

        <FormField
          tituloLabel="URL do Vídeo"
          campo="url"
          type="text"
          tipoDeTag="input"
          atributo={values.url}
          funcaoHandleChange={handleChange}
        />

        <FormField
          tituloLabel="Categoria"
          campo="categoria"
          type="text"
          tipoDeTag="input"
          atributo={values.categoria}
          funcaoHandleChange={handleChange}
          suggestions={categoryTitles}
        />

        <div>
          <Button
            type="submit"
            style={{
              backgroundColor: '#FFA500',
              marginRight: '15px',
              marginBottom: '15px',
              width: '150px',
              position: 'relative',
            }}
          >
            Cadastrar
          </Button>
        </div>

      </form>

      <Link to="/cadastro/categoria">
        Cadastrar Categoria
      </Link>
    </PageDefault>
  );
}

export default CadastroVideo;
