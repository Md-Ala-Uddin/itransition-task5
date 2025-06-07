"use client";

import { useState, useEffect, useRef } from "react";
import BookTable from "./components/BookTable";
import Controls from "./components/Controls";

export default function HomePage() {
    const [locale, setLocale] = useState("en-US");
    const [seed, setSeed] = useState(42);
    const [likes, setLikes] = useState(5);
    const [reviews, setReviews] = useState(2);
    const [randomizeTrigger, setRandomizeTrigger] = useState(0);
    const [showTable, setShowTable] = useState<boolean>(true);

    const handleRandomSeed = () => {
        const newSeed = Math.floor(Math.random() * 1000000);
        setSeed(newSeed);
        setRandomizeTrigger((prev) => prev + 1);
    };

    return (
        <div className="p-4 w-screen h-screen overflow-hidden">
            <Controls
                showTable={showTable}
                locale={locale}
                seed={seed}
                likes={likes}
                reviews={reviews}
                onShowTableChange={setShowTable}
                onLocaleChange={setLocale}
                onSeedChange={setSeed}
                onLikesChange={setLikes}
                onReviewsChange={setReviews}
                onRandomizeSeed={handleRandomSeed}
            />
            {showTable ? (
                <BookTable
                    locale={locale}
                    seed={seed}
                    avgLikes={likes}
                    avgReviews={reviews}
                />
            ) : (
                "grid"
            )}
        </div>
    );
}
