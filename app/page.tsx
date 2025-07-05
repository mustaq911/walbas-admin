import { Button } from "@/components/ui/button";
import ImageSrc from "@/constants/image";
import CustomThemeProvider from "@/providers/CustomThemeProvider";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <CustomThemeProvider>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
            <div className="flex gap-3">
            <Image
                className="dark:invert"
                src={ImageSrc.logo}
                alt="Next.js logo"
                width={100}
                height={100}
                priority
            />
            </div>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li>
            <span className="font-bold text-3xl">Walbase Admin</span></li>
            <li className="">
                This page is currently under development.
            </li>
            <li className="">
            Start by logging in
            </li>
            </ol>

            <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Link href="/login">
                <Button size="lg" className="rounded-full">Login</Button>
            </Link>
            </div>
        </main>
        </div>
        </CustomThemeProvider>
    );
}
