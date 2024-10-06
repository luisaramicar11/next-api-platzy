import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import { createWrapper } from 'next-redux-wrapper';
import { IProduct } from '../../types/productInterface';
import favoritesReducer from './slices/favoritesSlice';

// Interfaz del estado del carrito
interface CartState {
  items: IProduct[];
  totalQuantity: number;
  totalPrice: number;
}

// Configuración de la persistencia
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['items'], // Añadimos totalQuantity y totalPrice
};


// Reducer persistido
const persistedReducer = persistReducer(persistConfig, cartReducer);
const persistedReducerFavorites = persistReducer(persistConfig, favoritesReducer);

// Función para crear la store
export const createStore = () =>
  configureStore({
    reducer: {
      cart: persistedReducer,
      favorites: persistedReducerFavorites,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Desactivar serializableCheck para evitar advertencias
      }),
  });

// Tipos para TypeScript
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Creación del wrapper para Next.js
export const wrapper = createWrapper<AppStore>(createStore);

// Creación de la store y persistor
export const store = createStore(); // Ahora es una instancia de la tienda
export const persistor = persistStore(store);
