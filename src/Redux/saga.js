import { put, takeEvery } from 'redux-saga/effects';
import { ADD_BOOK, ADD_NEW_BOOK, FETCH_SUCCESS } from './constant';

function* getProduct() {
    let data = yield fetch('http://localhost:4401/product');
    data = yield data.json();
    yield put({ type: FETCH_SUCCESS, data })
}

function* addNew(data) {
    yield fetch("http://localhost:4401/product",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.data),
        })
        .then((response) => response.json())
       
        .catch((error) => console.error(error));
}

function* saga() {
    yield takeEvery(ADD_BOOK, getProduct)
    yield takeEvery(ADD_NEW_BOOK, addNew)
}

export default saga;