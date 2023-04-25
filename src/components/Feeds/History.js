import React, { useState, useEffect } from "react";
import { useSiteContext } from "../../utils/GlobalState";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import MangaCard from "../MangaCard";

export default function History() {
    const [state, dispatch] = useSiteContext();
    const [historyObtained, setHistoryObtained] = useState(false);

    useEffect(() => {
        if (state.history) {
            setHistoryObtained(true);
        }
    }, [setHistoryObtained, state])

    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {!historyObtained ? (
                <h2>Loading...</h2>
            ) : (
                state.history.map((manga, index) =>
                    <SwiperSlide>
                        <MangaCard key={manga.id + index} id={manga.id} />
                    </SwiperSlide>
                )
            )}
            {/* <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide> */}
        </Swiper>
    )
}