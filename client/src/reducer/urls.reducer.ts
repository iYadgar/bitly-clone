import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import * as api from '../api'
import {IUrl} from '../types';


interface UrlsState {
	urls: IUrl[],
	isLoading: boolean,

}

const initialState: UrlsState = {
	urls: [],
	isLoading: false,

}

export const saveNewUrl = createAsyncThunk('saveNewUrl', async ({
	url,
	id,
	cb = () => {
	}
}: { url: string, id: string, cb?: () => any }): Promise<{ url: IUrl | undefined, cb: () => any }> => {
	const urlId = await api.saveNewUrl({url, id})
	if (urlId) {
		const url = await api.getOneUrl(urlId)
		return {url, cb};
	}
	return {cb, url: undefined}

})

export const getUrlsList = createAsyncThunk('getUrlsList', async (): Promise<IUrl[] | undefined> => {
	return api.getUrlsList()
})

export const deleteUrl = createAsyncThunk('deleteUrl', async (id: string): Promise<string> => {
	await api.deleteUrl(id)
	return id
})


export const urlsSlice = createSlice({
	name: 'urls',
	initialState,
	reducers: {
		updateUrlClickAmount(state, action: { payload: string }) {
			const id = action.payload;
			state.urls = state.urls.map((url) => url._id === id ? {...url, clicksAmount: url.clicksAmount + 1} : url)
		}

	},
	extraReducers(builder) {
		builder.addCase(saveNewUrl.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(saveNewUrl.fulfilled, (state, action) => {
			const {url, cb} = action.payload || {}
			if (url) {
				state.urls.push(url)
			}
			state.isLoading = false
			alert('Url saved')
			cb()
		})
		builder.addCase(saveNewUrl.rejected, (state, action) => {
			state.isLoading = false
			alert('failed saving url please try again')

		})
		builder.addCase(getUrlsList.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(getUrlsList.fulfilled, (state, action) => {
			const urls = action.payload
			if (urls?.length) {
				state.urls = urls
			}
			state.isLoading = false
		})
		builder.addCase(getUrlsList.rejected, (state, action) => {
			state.isLoading = false
			alert('failed fetching urls please try again')
		})
		builder.addCase(deleteUrl.pending, (state, action) => {
			state.isLoading = true
		})
		builder.addCase(deleteUrl.fulfilled, (state, action) => {
			const id = action.payload
			state.urls = state.urls.filter(url => url._id !== id)
			state.isLoading = false
		})
		builder.addCase(deleteUrl.rejected, (state, action) => {
			alert('failed deleting url please try again')
			state.isLoading = false
		})

	}
})
export const {updateUrlClickAmount} = urlsSlice.actions

export default urlsSlice.reducer
