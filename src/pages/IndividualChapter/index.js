import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSiteContext } from "../../utils/GlobalState";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Create a root reference
const storage = getStorage();

export default function IndividualChapter() {
    const [state, dispatch] = useSiteContext();
    const [chapterFetched, setChapterFetched] = useState(false);

    const chapterId = (window.location.search.replace(/^./, ""));
    const baseUrl = state.baseUrl;

    const getChapterInfo = (async () => {
        const resp = await axios({
            method: 'GET',
            url: `${baseUrl}/at-home/server/${chapterId}`,
        });

        setChapterFetched(true);
        console.log(chapterFetched);

        return {
            host: resp.data.baseUrl,
            hash: resp.data.chapter.hash,
            dataSaver: resp.data.chapter.dataSaver
        }
    });

    const downloadChapter = async (obj) => {
        for (const page of obj.dataSaver) {
            const resp = await axios({
                method: 'GET',
                url: `${obj.host}/dataSaver/${obj.hash}/${page}`,
                responseType: 'arraybuffer'
            });

            const pageRef = ref(storage, `Mangadex/${chapterId}/${page}`);

            console.log(resp);
            console.log(pageRef);

            // uploadBytes(pageRef, resp.data).then((snapshot) => {
            //     console.log('Uploaded a blob or file! ', snapshot);
            // });
        };

        console.log(`Downloaded ${obj.dataSaver.length} pages.`);
    };

    // useEffect(() => {
    //     getChapterInfo().then((resp) => {
    //         console.log(resp.host, resp.hash, resp.dataSaver);
    //         downloadChapter(resp);
    //     });
    // }, []);

    return (
        <div>
            <iframe title={`${chapterId}`} type="text/html" src={`https://mangadex.org/chapter/${chapterId}`} width="800px" height="600px" >
            </iframe>
        </div>
    )
}