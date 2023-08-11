import { put, takeEvery } from 'redux-saga/effects';
import { ADD_BOOK, ADD_NEW_BOOK, FETCH_SUCCESS } from './constant';

function* getProduct() {
    let data = yield fetch('https://amitjangid12.github.io/book-library-api/db.json');
    data = yield data.json();
    yield put({ type: FETCH_SUCCESS, data })
}

function* addNew(data) {
    yield fetch("https://amitjangid12.github.io/book-library-api/db.json",
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