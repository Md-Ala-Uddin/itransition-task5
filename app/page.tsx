"use client";

import { useState } from "react";
import BookTable from "./components/BookTable";
import Controls from "./components/Controls";
import { Book } from "./lib/definitions";
import Papa from "papaparse";

export default function HomePage() {
    const [locale, setLocale] = useState("en-US");
    const [seed, setSeed] = useState(42);
    const [likes, setLikes] = useState(5);
    const [reviews, setReviews] = useState(2);
    const [showTable, setShowTable] = useState<boolean>(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRandomSeed = () => {
        const newSeed = Math.floor(Math.random() * 1000000);
        setSeed(newSeed);
    };

    const handleExportClick = () => {
        const csv = Papa.unparse(books, {
            columns: ["index", "isbn", "title", "author", "publisher"],
        });

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `books_seed${seed}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                onExportClick={handleExportClick}
            />
            {showTable ? (
                <BookTable
                    locale={locale}
                    seed={seed}
                    avgLikes={likes}
                    avgReviews={reviews}
                    books={books}
                    isLoading={isLoading}
                    setBooks={setBooks}
                    setIsLoading={setIsLoading}
                />
            ) : (
                "grid"
            )}
        </div>
    );
}
