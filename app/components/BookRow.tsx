import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Book } from "../lib/definitions";
import Image from "next/image";
import { ThumbsUp } from "lucide-react";

type Review = {
    author: string;
    text: string;
};

export default function BookRow({ book }: { book: Book }) {
    return (
        <AccordionItem value={`item-${book.index}`}>
            <AccordionTrigger className="flex-row-reverse data-[state=open]:bg-accent">
                <div className="w-full flex">
                    <span className="w-10 ">{book.index}</span>
                    <span className="basis-3 grow">{book.isbn}</span>
                    <span className="basis-2 grow">{book.title}</span>
                    <span className="basis-2 grow">{book.author}</span>
                    <span className="basis-2 grow">{book.publisher}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <BookDetail book={book} />
            </AccordionContent>
        </AccordionItem>
    );
}

function BookDetail({ book }: { book: Book }) {
    return (
        <div className="w-full px-8 py-4 flex gap-3">
            <div className="w-30 flex flex-col">
                <BookCoverAndLikes book={book} />
            </div>
            <div className="flex flex-col">
                <BookDescription book={book} className="mb-2" />
                <ReviewDetail reviewDetail={book.reviewDetail} />
            </div>
        </div>
    );
}

function BookCoverAndLikes({
    book,
    className,
}: {
    book: Book;
    className?: string;
}) {
    return (
        <div className={className}>
            <img
                className="w-full mb-2 object-contain"
                src={book.image}
                alt="Book Image"
            />
            <div className=" rounded-md flex justify-center">
                <div className="bg-foreground px-2 py-1 border rounded-xl flex justify-center items-center">
                    <span className="text-background font-bold mr-1">{book.likes}</span>{" "}
                    <ThumbsUp className="w-4 h-4 font-bold text-background" />{" "}
                </div>
            </div>
        </div>
    );
}

function BookDescription({
    book,
    className,
    ...props
}: {
    book: Book;
    className?: string;
}) {
    return (
        <div className={className} {...props}>
            <h3 className="text-md">
                <span className="text-lg font-bold">{book.title}</span>
                <br />
                <span className="text-md font-bold italic">
                    by {book.author}
                </span>
            </h3>
            <p className="mt-1 text-muted-foreground">{book.publisher}</p>
        </div>
    );
}

function ReviewDetail({ reviewDetail, ...props }: { reviewDetail: Review[] }) {
    return (
        <div {...props}>
            <h4 className="mb-2 text-sm font-bold">Review</h4>
            {reviewDetail?.map((review) => (
                <Review className="my-2" review={review} key={review.author} />
            ))}
        </div>
    );
}

function Review({
    review,
    className,
    ...props
}: {
    review: Review;
    className?: string;
}) {
    return (
        <div className={className} {...props}>
            <p className="text-sm text-foreground font-medium text-wrap">
                {review.text}
            </p>
            <span className="text-xs text-muted-foreground italic">
                - {review.author}
            </span>
        </div>
    );
}
