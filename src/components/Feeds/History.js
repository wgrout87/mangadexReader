import React, { useState, useEffect } from "react";
import { useSiteContext } from "../../utils/GlobalState";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation, FreeMode } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import MangaCard from "../MangaCard";
import { findObjByType } from "../../utils/helpers";

export default function History() {
    const [state] = useSiteContext();
    const [historyObtained, setHistoryObtained] = useState(false);

    useEffect(() => {
        if (state.history) {
            setHistoryObtained(true);
        }
    }, [setHistoryObtained, state])

    console.log(state.history);

    return (
        <>
            <h2>History</h2>
            <Swiper
                modules={[Navigation, Mousewheel, FreeMode]}
                tag="section"
                wrapperTag="ul"
                spaceBetween={20}
                slidesPerView={2.5}
                loop={true}
                navigation
                mousewheel
                freeMode={{ minimumVelocity: .02 }}
                breakpoints={{
                    768: {
                        slidesPerView: 6.5
                    }
                }}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {!historyObtained ? (
                    <h2>Loading...</h2>
                ) : (
                    state.history.map((manga, index) =>
                        <SwiperSlide key={index + findObjByType(manga.relationships, "manga").id} tag="li">
                            <a href={`/manga?${manga.id}`}>
                                <MangaCard id={findObjByType(manga.relationships, "manga").id} index={index} />
                            </a>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </>
    )
}