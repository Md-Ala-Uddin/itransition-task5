import { NextRequest, NextResponse } from "next/server";
import { generateBooks } from "@/app/lib/bookGenerator";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const locale = searchParams.get("locale") || "en-US";
    const seed = parseInt(searchParams.get("seed") || "42");
    const avgLikes = parseFloat(searchParams.get("avgLikes") || "0");
    const avgReviews = parseFloat(searchParams.get("avgReviews") || "0");
    const page = parseInt(searchParams.get("page") || "0");

    const books = generateBooks({ seed, page, locale, avgLikes, avgReviews });

    return NextResponse.json(books);
}
