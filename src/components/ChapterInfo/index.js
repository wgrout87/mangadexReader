import React from "react";

export default function ChapterInfo(props) {
    return (
        <div className="bg-less-dark m-4">
            <h4>{`Chapter ${props.chapter.attributes.chapter}`}</h4>
            <p>{`Language: ${props.chapter.attributes.translatedLanguage}`}</p>
            <h5>{`${props.chapter.attributes.title}`}</h5>
            <p>{`${props.chapter.relationships[0].id}`}</p>
        </div>
    )
}