import React from 'react';
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  border: 16px solid rgba(243, 243, 243, 0.53);
  border-top: 16px solid #ffd44c;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 1.5s linear infinite;
`




const Loader = () => {
	return (
		<Container>
			<Spinner/>
		</Container>
	);
};

export default Loader;
