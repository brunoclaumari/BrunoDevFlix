import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// configurações para qualquer Button
const Button = styled.button`
    color: var(--white);
    border: 1px solid var(--white);
    background: var(--background);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;
  
  &:hover,
  &:focus {
    opacity: .5;
  }
  
  @media(max-width: 800px) {    
    background-color: var(--primary);    
    border: 0;
    border-radius: 0;
    bottom: 0;
    color: var(--white);
    position: fixed;
    left: 0;
    right: 0;
    outline: 0;
    text-align: center;
  }
`;

export default Button;

/*
const Button = styled(Link)`
    color: var(--white);
    border: 1px solid var(--white);
    box-sizing: border-box;
    cursor: pointer;
    padding: 16px 24px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    outline: none;
    border-radius: 5px;
    text-decoration: none;
    display: inline-block;
    transition: opacity .3s;

    &:hover,
    &:focus {
        opacity: .5;
    }
`;
*/
