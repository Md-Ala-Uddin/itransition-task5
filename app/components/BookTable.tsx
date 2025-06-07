import { useEffect, useRef, useState, useCallback } from "react";
import { Accordion } from "@/components/ui/accordion";
import BookRow from "./BookRow";
import { Book } from "@/app/lib/definitions";
import { LoaderCircle } from "lucide-react";

interface BookTableProps {
    locale: string;
    seed: number;
    avgLikes: number;
    avgReviews: number;
}

export default function BookTable({
    locale,
    seed,
    avgLikes,
    avgReviews,
}: BookTableProps) {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef(null);
    const loaderParentRef = useRef(null);

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
        setBooks((prev) => [...prev, ...newBooks]);
        setPage(newPage);
        setIsLoading(false);
    }, [page, fetchBooks, isLoading]);

    useEffect(() => {
        setPage(0);
        fetchBooks(0).then(setBooks);
    }, [locale, seed, avgLikes, avgReviews, fetchBooks]);

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
    }, [loadMore]);

    return (
        <div className="w-full">
            <Accordion type="single" collapsible className="w-full">
                <div className="w-full pl-8 flex shadow-md">
                    <span className="w-10  font-bold text-lg">#</span>
                    <span className="basis-3 grow font-bold text-lg">ISBN</span>
                    <span className="basis-2 grow font-bold text-lg">
                        Title
                    </span>
                    <span className="basis-2 grow font-bold text-lg">
                        Author
                    </span>
                    <span className="basis-2 grow font-bold text-lg">
                        Publisher
                    </span>
                </div>
                <div
                    className="md:h-[calc(100vh-125px)] overflow-auto"
                    ref={loaderParentRef}
                >
                    {books.map((book) => (
                        <BookRow book={book} key={book.isbn} />
                    ))}
                    {isLoading && (
                        <div className="p-5 w-full flex justify-center items-center">
                            <LoaderCircle className="w-10 h-10 animate-spin" />
                        </div>
                    )}
                    <div ref={loaderRef} className="h-1 bg-blue-500" />
                </div>
            </Accordion>
        </div>
    );
}
