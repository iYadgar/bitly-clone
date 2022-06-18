import axios from 'axios';
import {IUrl} from '../../../shared/types';


export const saveNewUrl = async ({
	url,
	id
}: { url: string, id: string }): Promise<string> => {
	const {data} = (await axios.post('/api/urls', {url, id}))
	return data.response

}
export const getOneUrl = async (id: string): Promise<IUrl> => {
	const {data} = (await axios.get(`/api/urls/${id}`))
	return data.response
}
export const getUrlsList = async (): Promise<IUrl[]> => {
	const {data} = (await axios.get(`/api/urls`))
	return data.response
}

export async function deleteUrl(id: string) {
	const {data} = await axios.delete(`/api/urls/${id}`)
	return data.response
}
