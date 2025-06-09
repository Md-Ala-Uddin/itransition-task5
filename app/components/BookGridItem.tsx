import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Book } from "../lib/definitions";
import Image from "next/image";

export default function BookGridItem({ book }: { book: Book }) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex-none">
                <CardTitle className="line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="line-clamp-1">by {book.author}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="relative aspect-[3/4] w-full mb-4">
                    <Image
                        className="object-cover rounded-md"
                        src={book.image}
                        alt={`${book.title} cover`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <p className="text-sm text-muted-foreground">{book.publisher}</p>
                <p className="text-sm text-muted-foreground">ISBN: {book.isbn}</p>
            </CardContent>
            <CardFooter className="flex-none flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Reviews: {book.reviews}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Likes: {book.likes}</span>
                </div>
            </CardFooter>
        </Card>
    );
}
