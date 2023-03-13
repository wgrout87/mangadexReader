import React, { createContext, useContext } from "react";
import { useSiteReducer } from "./reducers";

const SiteContext = createContext();
const { Provider } = SiteContext;

const SiteProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useSiteReducer({
        page: "home",
        baseUrl: 'https://api.mangadex.org',
    });

    return <Provider value={[state, dispatch]} {...props} />;
}

const useSiteContext = () => {
    return useContext(SiteContext);
};

export { SiteProvider, useSiteContext };