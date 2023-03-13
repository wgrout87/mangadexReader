import { useReducer } from "react";
import {
    UPDATE_PAGE,
    UPDATE_USERNAME_AND_PASSWORD
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page,
            };

        case UPDATE_USERNAME_AND_PASSWORD:
            return {
                ...state,
                username: action.username,
                password: action.password,
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