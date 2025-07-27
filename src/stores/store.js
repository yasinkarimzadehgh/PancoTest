// src/stores/store.js

import { createStore, applyMiddleware } from 'redux';
const createSagaMiddleware = require('redux-saga').default;
import rootSaga from './sagas';

// یک ردیوسر خالی، چون state اصلی توسط Zustand مدیریت می‌شود
const dummyReducer = (state = {}) => state;

// ساخت میدل‌ویر ساگا
const sagaMiddleware = createSagaMiddleware();

// ساخت استور Redux با میدل‌ویر ساگا
const store = createStore(dummyReducer, applyMiddleware(sagaMiddleware));

// اجرای روت ساگا
sagaMiddleware.run(rootSaga);

export default store;