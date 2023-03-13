import { useReducer } from "react";
import {
    UPDATE_PAGE,
    UPDATE_USERNAME_AND_PASSWORD,
    UPDATE_SESSION_TOKEN_ETC,
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

        case UPDATE_SESSION_TOKEN_ETC:
            return {
                ...state,
                sessionToken: action.sessionToken,
                expires: action.expires,
                refreshToken: action.refreshToken,
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