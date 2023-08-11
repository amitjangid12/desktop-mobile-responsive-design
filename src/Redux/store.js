import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"
import saga from "./saga";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware()
const store = configureStore(
    {
        reducer: rootReducer,
        middleware: () => [sagaMiddleware]
    }
)

sagaMiddleware.run(saga)
export default store;