import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {StyledButton, StyledInput} from '../styles';
import {Title} from '../styles/Title';
import {nanoid} from 'nanoid';
import {useAppDispatch} from '../app/hooks';
import {saveNewUrl} from '../reducer/urls.reducer';
import {getShortenedUrl} from '../utils';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding: 50px;
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;
  @media (min-width: 768px) {
    width: 50%;
  }
`
const StyledTitle = styled(Title)`
  font-weight: 400;
  width: 100%;
  padding: 0;
  margin: 0;
`

const CreateNewUrl = () => {
	const dispatch = useAppDispatch();
	const [longURL, setLongURL] = useState('');
	const [shortenedURL, setShortenedURL] = useState('');
	const [shouldShortify, setShouldShortify] = useState(false);
	const urlId = useRef('');

	useEffect(() => {
		if (shouldShortify && longURL) {
			urlId.current = nanoid(10);
			setShortenedURL(getShortenedUrl(urlId.current));
		}
	}, [shouldShortify, longURL]);
	const initState = () => {
		setLongURL('');
		setShortenedURL('');
		setShouldShortify(false);
		urlId.current = '';

	}
	const handleSave = () => {
		dispatch(saveNewUrl({url: longURL, id: urlId.current, cb: initState}));

	}

	return (
		<Container>
			<FormWrapper>
				<StyledTitle>URL</StyledTitle>
				<StyledInput value={longURL} onChange={(e) => setLongURL(e.target.value)} type="text"
							 placeholder="Enter a URL to shorten"/>
				<StyledButton onClick={(e) => longURL && setShouldShortify(true)}>Shortify</StyledButton>
			</FormWrapper>
			<FormWrapper>
				<StyledTitle>Result</StyledTitle>
				<StyledInput value={shortenedURL} type="text" disabled={true}/>
				<StyledButton onClick={handleSave}>Save</StyledButton>
			</FormWrapper>

		</Container>
	);
};

export default CreateNewUrl;
