import { ADD_BOOK, ADD_NEW_BOOK, FETCH_SUCCESS } from "./constant";

export const addBookReducer = (state = [], action) => {

    switch (action.type) {
        case ADD_BOOK:
            return state
        case FETCH_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case ADD_NEW_BOOK:
            return action.data
        default:
            return state;
    }
}