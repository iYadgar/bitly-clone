import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Route, Routes} from 'react-router-dom';
import CreateNewUrl from './views/CreateNewUrl';
import UrlsList from './views/UrlsList';
import {ENDPOINTS} from './constants';
import Navbar from './features/Navbar';
import Loader from './components/Loader';
import {useAppDispatch, useAppSelector} from './app/hooks';
import {getUrlsList} from './reducer/urls.reducer';

const AppWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

`

function App() {
	const {isLoading} = useAppSelector(({url}) => url);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getUrlsList())
	},[])
	return (
		<AppWrapper>
			<Navbar/>
			<Routes>
				<Route path={ENDPOINTS.new} element={<CreateNewUrl/>}/>
				<Route path={ENDPOINTS.list} element={<UrlsList/>}/>
			</Routes>
			{isLoading && <Loader/>}
		</AppWrapper>
	);
}

export default App;
