import { Faker, en, de, ja } from "@faker-js/faker";

export function getFakerForLocale(locale: string) {
    switch (locale) {
        case "de-DE":
            return new Faker({ locale: [de] });
        case "ja-JP":
            return new Faker({ locale: [ja] });
        case "en-US":
        default:
            return new Faker({ locale: [en] });
    }
}
