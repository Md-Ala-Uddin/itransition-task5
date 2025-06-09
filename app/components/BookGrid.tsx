import { LoaderCircle } from "lucide-react";
import { Book } from "../lib/definitions";
import BookGridItem from "./BookGridItem";
import { useRef } from "react";


interface BookGridProps {
    books: Book[];
    isLoading: boolean;
    loaderParentRef: React.RefObject<HTMLDivElement>;
    loaderRef: React.RefObject<HTMLDivElement>;
}


export default function BookGrid({
    books,
    isLoading,
    loaderParentRef,
    loaderRef
}: BookGridProps) {
    return (
        <div
            className="w-full md:h-[calc(100vh-125px)] overflow-auto"
            ref={loaderParentRef}
        >
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {books.map((book) => (
                    <BookGridItem book={book} key={book.isbn} />
                ))}
            </div>
            {isLoading && (
                <div className="p-5 w-full flex justify-center items-center">
                    <LoaderCircle className="w-10 h-10 animate-spin" />
                </div>
            )}
            <div ref={loaderRef} className="h-1 bg-blue-500" />
        </div>
    );
}
