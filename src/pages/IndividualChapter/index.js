import React from "react";

export default function IndividualChapter() {

    const chapterId = (window.location.search.replace(/^./, ""));
    console.log(chapterId);

    return (
        <div>
            Manga page
        </div>
    )
}