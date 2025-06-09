import { useEffect, useRef, useState, useCallback } from "react";
import { Accordion } from "@/components/ui/accordion";
import BookRow from "./BookRow";
import { Book } from "@/app/lib/definitions";
import { LoaderCircle } from "lucide-react";

interface BookTableProps {
    books: Book[];
    isLoading: boolean;
    loaderParentRef: React.RefObject<HTMLDivElement>;
    loaderRef: React.RefObject<HTMLDivElement>;
}

export default function BookTable({
    books,
    isLoading,
    loaderRef,
    loaderParentRef,
}: BookTableProps) {
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
