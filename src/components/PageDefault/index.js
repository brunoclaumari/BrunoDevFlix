import React from 'react';
import styled, { css } from 'styled-components';
import Menu from '../Menu';
import Footer from '../Footer';

const Main = styled.main`       
    background-color: var(--black);
    color: var(--white);
    flex:1;
    padding-top: 94px;   
    
    padding-left: 5%;
    padding-right: 5%; 
    ${({ paddingAll }) => css`
      padding: ${paddingAll};
    `}

    @media (max-width: 800px) {      
        padding-bottom:16px;
  }   

`;

function PageDefault({ children, paddingAll }) {
  return (
    <>
      <Menu />
      <Main paddingAll={paddingAll}>
        {children}
      </Main>
      <Footer />
    </>

  );
}

export default PageDefault;

/*
function PageDefault({ children }) {
    return (
        <React.Fragment>
            <Menu />
            <Main>
                {children}
            </Main>
            <Footer />
        </React.Fragment>
    );
}
*/

/*
const Main = styled.main`

    background-color: var(--black);
    color: var(--white);
    flex:1;
    padding-top: 100px;

    padding-left: 5%;
    padding-right: 5%;

`;
*/
