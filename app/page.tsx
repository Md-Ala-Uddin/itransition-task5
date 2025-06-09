"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import BookTable from "./components/BookTable";
import Controls from "./components/Controls";
import { Book } from "./lib/definitions";
import Papa from "papaparse";
import BookGrid from "./components/BookGrid";

export default function HomePage() {
    const [locale, setLocale] = useState("en-US");
    const [seed, setSeed] = useState(42);
    const [avgLikes, setAvgLikes] = useState(5);
    const [avgReviews, setAvgReviews] = useState(2);
    const [showTable, setShowTable] = useState<boolean>(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const loaderRef = useRef<HTMLDivElement>(null!);
    const loaderParentRef = useRef<HTMLDivElement>(null!);

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

    const fetchBooks = useCallback(
        async (page: number): Promise<Book[]> => {
            const params = new URLSearchParams({
                locale,
                seed: seed.toString(),
                page: page.toString(),
                avgLikes: avgLikes.toString(),
                avgReviews: avgReviews.toString(),
            });

            const res = await fetch(`/api/books?${params}`);
            if (!res.ok) {
                console.error("Failed to fetch books");
                return [];
            }
            return await res.json();
        },
        [locale, seed, avgLikes, avgReviews]
    );

    const loadMore = useCallback(async () => {
        if (isLoading) return;
        setIsLoading(true);
        const newPage = page + 1;
        const newBooks = await fetchBooks(newPage);
        setBooks((prev: Book[]) => [...prev, ...newBooks]);
        setPage(newPage);
        setIsLoading(false);
    }, [page, fetchBooks, isLoading, setBooks, setIsLoading]);

    useEffect(() => {
        setPage(0);
        fetchBooks(0).then(setBooks);
    }, [locale, seed, avgLikes, avgReviews, fetchBooks, setBooks]);

    useEffect(() => {
        const currentRef = loaderRef.current;

        if (!loaderParentRef.current || !currentRef) return;

        const observer = new IntersectionObserver(
            (entries) => entries[0].isIntersecting && loadMore(),
            { root: loaderParentRef.current }
        );

        observer.observe(currentRef);

        return () => {
            observer.unobserve(currentRef);
        };
    }, [loadMore, showTable]);

    return (
        <div className="p-4 w-screen h-screen overflow-hidden">
            <Controls
                showTable={showTable}
                locale={locale}
                seed={seed}
                likes={avgLikes}
                reviews={avgReviews}
                onShowTableChange={setShowTable}
                onLocaleChange={setLocale}
                onSeedChange={setSeed}
                onLikesChange={setAvgLikes}
                onReviewsChange={setAvgReviews}
                onRandomizeSeed={handleRandomSeed}
                onExportClick={handleExportClick}
            />
            {showTable ? (
                <BookTable
                    books={books}
                    isLoading={isLoading}
                    loaderRef={loaderRef}
                    loaderParentRef={loaderParentRef}
                />
            ) : (
                <BookGrid
                    books={books}
                    isLoading={isLoading}
                    loaderRef={loaderRef}
                    loaderParentRef={loaderParentRef}
                />
            )}
        </div>
    );
}
