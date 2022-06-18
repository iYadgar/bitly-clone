import React from 'react';
import styled from 'styled-components';
import {useLocation, useNavigate} from 'react-router-dom';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  background-color: #FEF2CC;
  outline: none;
  border: none;
  font-family: 'Nunito', sans-serif;
  font-weight: bold;
  cursor: pointer;

  &.current {
    background-color: #ffd44c;
  }

`

interface Props {
	endpoint: string
}

const LinkButton = ({endpoint, children}: React.PropsWithChildren<Props>) => {
	const location = useLocation()
	const navigate = useNavigate()

	return (
		<Button onClick={() => navigate(endpoint)} className={location.pathname === endpoint ? 'current' : ''}>
			{children}
		</Button>
	);
};

export default LinkButton;
