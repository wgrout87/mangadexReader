import { useReducer } from "react";
import {
    UPDATE_PAGE
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
            };

        default:
            return {
                ...state,
                page: "/",
            };
    }
};

export function useSiteReducer(initialState) {
    return useReducer(reducer, initialState)
}