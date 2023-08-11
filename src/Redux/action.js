import { ADD_BOOK, ADD_NEW_BOOK, FETCH_SUCCESS } from "./constant"

export const addBook = (data) => {
    return {
        type: ADD_BOOK,
        data
    }
}

export const fetchSuccess = (data) => {
    return {
        type: FETCH_SUCCESS,
        data
    }
}

export const addNewBook = (data) => {
    return {
        type: ADD_NEW_BOOK,
        data
    }
}