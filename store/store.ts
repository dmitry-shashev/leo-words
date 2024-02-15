import { combineReducers, configureStore } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import wordsReducer from './slices/wordsSlice'
import { useDispatch } from 'react-redux'
import storage from 'redux-persist/lib/storage'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
  persistReducer,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  settingsReducer,
  wordsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export { store, persistor }
