import {
  combineReducers,
  configureStore,
  EnhancedStore,
} from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import wordsReducer from './slices/wordsSlice'
import { useDispatch } from 'react-redux'
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
import sessionStorage from 'redux-persist/es/storage/session'

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
}

const reducer = combineReducers({
  settingsReducer,
  wordsReducer,
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
