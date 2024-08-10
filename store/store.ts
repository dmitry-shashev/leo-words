import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import wordsReducer from './slices/wordsSlice'
import irregularWordsReducer from './slices/irregularWordsSlice'
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
  irregularWordsReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export function createStore(): EnhancedStore {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  })
}

const store = createStore()
let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export { store, persistor }
