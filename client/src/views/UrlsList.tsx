import React from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../app/hooks';
import {StyledButton} from '../styles';
import {getShortenedUrl} from '../utils';
import {deleteUrl, updateUrlClickAmount} from '../reducer/urls.reducer';
import {Title} from '../styles/Title';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 30px 10px;
`
const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1fr 2fr;
  border: 1px solid rgba(0, 0, 0, 0.5);

`


const GridBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 5px;
  text-align: center;
`
const EllipsisLink = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #228DFE;
  cursor: pointer;
`
const TitleGridBox = styled(GridBox)`
  background-color: rgba(0, 0, 0, 0.2);
`
const UrlsList = () => {
	const {urls} = useAppSelector(({url}) => url)
	const dispatch = useAppDispatch()
	const handleDelete = (id: string) => {
		dispatch(deleteUrl(id))
	}
	const handleShortURLClick = (shortenedUrl: string, id: string) => {
		window.open(shortenedUrl, '_blank')
		dispatch(updateUrlClickAmount(id))
	}
	const renderUrls = () => {
		if (urls.length) {
			return urls.map((url) => {
				const shortenedUrl = getShortenedUrl(url._id);
				return (
					<Row key={url._id}>
						<GridBox> {(new Date(url.createdAt)).toDateString()}</GridBox>
						<GridBox onClick={() => window.open(url.longUrl, '_blank')}>
							<EllipsisLink>{url.longUrl}</EllipsisLink></GridBox>
						<GridBox onClick={() => handleShortURLClick(shortenedUrl, url._id)}>
							<EllipsisLink>{shortenedUrl}</EllipsisLink>
						</GridBox>
						<GridBox>
							{url.clicksAmount}
						</GridBox>
						<GridBox><StyledButton onClick={() => handleDelete(url._id)}>Delete</StyledButton></GridBox>

					</Row>
				);
			})
		}
	}
	return (
		<Container>{
			urls.length ?
			<><Row>
				<TitleGridBox>Date</TitleGridBox>
				<TitleGridBox>Original URL</TitleGridBox>
				<TitleGridBox>Short URL</TitleGridBox>
				<TitleGridBox>Clicks</TitleGridBox>
				<TitleGridBox>Actions</TitleGridBox>
			</Row>
				{renderUrls()}</> : <Title>
				No URLs yet
			</Title>

		}</Container>
	);
};

export default UrlsList;
