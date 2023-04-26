import React, { useState, useEffect } from "react";
import { useSiteContext } from "../../utils/GlobalState";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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

    return (
        <>
            <h2>History</h2>
            <Swiper
                spaceBetween={20}
                slidesPerView={2.5}
            // onSlideChange={() => console.log('slide change')}
            // onSwiper={(swiper) => console.log(swiper)}
            >
                {!historyObtained ? (
                    <h2>Loading...</h2>
                ) : (
                    state.history.map((manga, index) =>
                        <SwiperSlide key={index + findObjByType(manga.relationships, "manga").id}>
                            <MangaCard id={findObjByType(manga.relationships, "manga").id} index={index} />
                        </SwiperSlide>
                    )
                )}
                {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide> */}
            </Swiper>
        </>
    )
}