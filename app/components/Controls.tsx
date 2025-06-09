"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ToggleGroupItem } from "@/components/ui/toggle-group";
import { ToggleGroup } from "@radix-ui/react-toggle-group";
import { Download, LayoutGrid, Table } from "lucide-react";

type Props = {
    showTable: boolean;
    locale: string;
    seed: number;
    likes: number;
    reviews: number;
    onShowTableChange: (value: boolean) => void;
    onLocaleChange: (value: string) => void;
    onSeedChange: (value: number) => void;
    onLikesChange: (value: number) => void;
    onReviewsChange: (value: number) => void;
    onRandomizeSeed: () => void;
    onExportClick: () => void;
};

export default function Controls({
    showTable,
    locale,
    seed,
    likes,
    reviews,
    onShowTableChange,
    onLocaleChange,
    onSeedChange,
    onLikesChange,
    onReviewsChange,
    onRandomizeSeed,
    onExportClick,
}: Props) {
    return (
        <div className="mb-4 flex flex-col md:flex-row gap-4">
            <LocaleInput
                className="!h-16 basis-1 grow"
                value={locale}
                onValueChange={(value) => onLocaleChange(value)}
            />

            <SeedInput
                className="h-16 basis-1 grow"
                seed={seed}
                onSeedChange={onSeedChange}
                onRandomizeSeed={onRandomizeSeed}
            />

            <LikesInput
                className="h-16 basis-1 grow"
                likes={likes}
                onLikesChange={onLikesChange}
            />

            <ReviewInput
                className="h-16 basis-1 grow"
                reviews={reviews}
                onReviewsChange={onReviewsChange}
            />

            <ViewInput
                className="h-16 basis-1 grow"
                showTable={showTable}
                onShowTableChange={onShowTableChange}
            />

            <div className="h-16 basis-1 grow flex justify-center items-center">
                <Button onClick={onExportClick}> <Download className="w-4 h-4" /> Export</Button>
            </div>
        </div>
    );
}

function LocaleInput({
    className,
    value,
    onValueChange,
}: {
    className: string;
    value: string;
    onValueChange: (value: string) => void;
}) {
    return (
        <div className={`${className} py-2 flex flex-col gap-1 border rounded-md`}>
            <Label className="px-3">Language</Label>
            <Select value={value} onValueChange={onValueChange}>
                <SelectTrigger className="border-none">
                    <SelectValue placeholder="Select a Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="en-US">English (USA)</SelectItem>
                    <SelectItem value="de-DE">German (Germany)</SelectItem>
                    <SelectItem value="ja-JP">Japanese (Japan)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

function SeedInput({
    className,
    seed,
    onSeedChange,
    onRandomizeSeed,
}: {
    className: string;
    seed: number;
    onSeedChange: (value: number) => void;
    onRandomizeSeed: () => void;
}) {
    return (
        <div
            className={`${className} px-4 py-2 flex gap-1 items-center border rounded-md`}
        >
            <div className="w-full h-full flex flex-col gap-1">
                <Label htmlFor="seed">Seed</Label>
                <Input
                    className="border-none"
                    id="seed"
                    type="number"
                    value={seed}
                    onChange={(e) => onSeedChange(Number(e.target.value))}
                    placeholder="Seed"
                />
            </div>
            <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={onRandomizeSeed}
            >
                🔀
            </Button>
        </div>
    );
}

function LikesInput({
    className,
    likes,
    onLikesChange,
}: {
    className: string;
    likes: number;
    onLikesChange: (value: number) => void;
}) {
    return (
        <div
            className={`${className} px-4 py-2 flex flex-col gap-1 border rounded-md`}
        >
            <Label>Likes: {likes}</Label>
            <Input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={likes}
                onChange={(e) => onLikesChange(Number(e.target.value))}
            />
        </div>
    );
}

function ReviewInput({
    className,
    reviews,
    onReviewsChange,
}: {
    className: string;
    reviews: number;
    onReviewsChange: (value: number) => void;
}) {
    return (
        <div
            className={`${className} px-4 py-2 flex flex-col gap-1 border rounded-md`}
        >
            <Label>Reviews:</Label>
            <Input
                className="border-none"
                type="number"
                min="0"
                step="0.1"
                value={reviews}
                onChange={(e) => onReviewsChange(Number(e.target.value))}
            />
        </div>
    );
}

function ViewInput({
    className,
    showTable,
    onShowTableChange,
}: {
    className: string;
    showTable: boolean;
    onShowTableChange: (value: boolean) => void;
}) {
    return (
        <div className={`${className} flex justify-center md:justify-end items-center`}>
            <ToggleGroup
                type="single"
                value={showTable ? "table" : "grid"}
                onValueChange={(value) => {
                    if (value === "table") {
                        onShowTableChange(true);
                    } else if (value === "grid") {
                        onShowTableChange(false);
                    }
                }}
                className="scale-3d"
            >
                <ToggleGroupItem
                    value="table"
                    aria-label="Table view"
                    className="h-16 w-16"
                >
                    <Table className="h-12 w-12" />
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="grid"
                    aria-label="Grid view"
                    className="h-16 w-16"
                >
                    <LayoutGrid className="h-12 w-12" />
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    );
}
