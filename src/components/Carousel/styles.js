import styled from 'styled-components';

export const VideoCardGroupContainer = styled.section`
  color: var(--white);
  min-height: 197px;
  margin-left: 5%;
  margin-bottom: 16px;  
`;

export const Title = styled.h3` 
  
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 35px;
  line-height: 1;
  margin-bottom: 16px;
  padding: 20px;
  background: red;
  line-height: 1;
  border-radius: 4px;

  @media (max-width: 800px) {
    font-size: 18px;
    padding: 10px;
  }
`;

export const ExtraLink = styled.a`  

  margin-left: 16px;
  text-decoration: none;  
  transition: opacity .3s;
  &:hover,
  &:focus {
    z-index:1;
    opacity: .5;
    zoom: 105%;
  }
  @media (max-width: 800px) {
    display: block;
    margin-bottom: 16px;
    margin-left: 0;
  }
`;

export const VideoCardList = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-bottom: 32px;
  list-style: none;
  display: flex;/* um elemento ao lado do outro */
  overflow-x: auto;/*impede a quebra da pagina (carrossel)*/
  flex-direction: row;
  
  li {
    margin-right: 16px;
  }  
`;


/**
 * export const VideoCardList = styled.ul`
  margin: 0;
  padding-left: 0;
  padding-bottom: 32px;
  list-style: none;
  display: flex;
  overflow-x: auto;
  flex-direction: row;

  li {
    margin-right: 16px;
  }
`;
 */
