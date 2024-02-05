import Link from "next/link";
import { navLinks } from "~/data/navLinks";
import Logo from "./logo";
import { ThemeSwitch } from "./themeSwitch";
import { HamburgerNav } from "./hamburgerNav";
import { UserButtonWrapper } from "./userButtonWrapper";

export default function Header() {
    return (
        <header className="flex items-center justify-between py-10">
            <div>
                <Link href="/">
                    <div className="flex items-center justify-between">
                        <div className="mr-3">
                            <Logo />
                        </div>
                        <div className="hidden h-6 text-2xl font-semibold sm:block">
                            <h1>Collectify</h1>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
                {navLinks
                    .filter((link) => link.href !== "/")
                    .map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="hidden sm:block font-medium"
                        >
                            {link.title}
                        </Link>
                    ))}
                {/* <SearchButton /> */}
                <ThemeSwitch />
                <UserButtonWrapper />
                <HamburgerNav />
            </div>
        </header>
    );
}
