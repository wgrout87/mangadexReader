import { useReducer } from "react";
import {
    UPDATE_USERNAME_AND_PASSWORD,
    UPDATE_SESSION_TOKEN_ETC,
    UPDATE_HISTORY,
    UPDATE_EVERYTHING,
} from "./actions";

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_USERNAME_AND_PASSWORD:
            console.log("Username and password updated!");
            return {
                ...state,
                username: action.username,
                password: action.password,
            };

        case UPDATE_SESSION_TOKEN_ETC:
            console.log("Session token, etc. updated!");
            return {
                ...state,
                sessionToken: action.sessionToken,
                expires: action.expires,
                refreshToken: action.refreshToken,
            };

        case UPDATE_HISTORY:
            console.log("History updated!");
            return {
                ...state,
                history: action.history
            };

        case UPDATE_EVERYTHING:
            console.log("Everything updated!");
            return {
                ...state,
                username: action.username,
                password: action.password,
                sessionToken: action.sessionToken,
                expires: action.expires,
                refreshToken: action.refreshToken,
            };

        default:
            return {
                ...state,
            };
    }
};

export function useSiteReducer(initialState) {
    return useReducer(reducer, initialState)
}