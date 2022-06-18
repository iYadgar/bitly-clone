import {configureStore} from '@reduxjs/toolkit';
import urlsReducer from '../reducer/urls.reducer';

export const store = configureStore({
		reducer: {
			url: urlsReducer,
		},
		middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
	}
);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
