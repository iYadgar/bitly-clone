import React from 'react';
import styled from 'styled-components';
import {ENDPOINTS} from '../constants';
import LinkButton from '../components/LinkButton';
import startCase from 'lodash.startcase';
import {Title} from '../styles/Title';

const Container = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  background-color: #FEF2CC;
  padding: 0 10px;
`
const ButtonsContainer = styled.div`
  display: flex;
  width: 30%;
  height: 100%;
`

const Navbar = () => {
	const renderLinks = () => Object.entries(ENDPOINTS).map(([title, endpoint]) => <LinkButton
			key={title}
			endpoint={endpoint}>
			{startCase(title)}
		</LinkButton>
	)
	return (
		<Container>
			<Title>Shortify</Title>
			<ButtonsContainer>{renderLinks()}</ButtonsContainer>
		</Container>
	);
};

export default Navbar;
