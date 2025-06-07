import seedrandom, { PRNG } from "seedrandom";
import { Faker } from "@faker-js/faker";
import { Book } from "@/app/lib/definitions";
import { getFakerForLocale } from "./getFakerForLocale";

export function generateBooks({
    seed,
    page,
    locale,
    avgLikes,
    avgReviews,
}: {
    seed: any;
    page: number;
    locale: string;
    avgLikes: number;
    avgReviews: number;
}): Book[] {
    const rng = seedrandom(`${seed}-${page}`);
    const faker = getFakerForLocale(locale);

    return Array.from({ length: 10 }, (_, i) => {
        const index = page * 10 + i + 1;
        faker.seed(rng() * 1e9);
        return {
            index,
            image: faker.image.dataUri({
                width: 30,
                height: 40,
                type: "svg-uri",
            }),
            isbn: faker.number
                .int({ min: 1000000000000, max: 9999999999999 })
                .toString(),
            title: capitalize(faker.lorem.words({ min: 2, max: 6 })),
            author: faker.person.fullName(),
            publisher: faker.company.name(),
            likes: calculateProvFraction(avgLikes, rng),
            reviews: calculateProvFraction(avgReviews, rng),
            reviewDetail: generateReviews(avgReviews, rng, faker),
        };
    });
}

function calculateProvFraction(avg: number, rng: PRNG) {
    if (avg < 1) return rng() < avg ? 1 : 0;
    return Math.floor(avg);
}

function generateReviews(avg: number, rng: PRNG, faker: Faker) {
    const count = calculateProvFraction(avg, rng);
    return Array.from({ length: count }, (_, i) => ({
        author: faker.person.fullName(),
        text: faker.lorem.paragraph(),
    }));
}

function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
