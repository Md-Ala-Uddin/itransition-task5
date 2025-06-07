export type Book = {
    index: number;
    image: string;
    isbn: string;
    title: string;
    author: string;
    publisher: string;
    likes: number;
    reviews: number;
    reviewDetail: {
        author: string,
        text: string
    }[]
};
