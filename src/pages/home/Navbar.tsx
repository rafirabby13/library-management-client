import { Menu } from "lucide-react";

import {
    Accordion,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link, NavLink } from "react-router";

interface MenuItem {
    title: string;
    url: string;
    description?: string;
    icon?: React.ReactNode;
    items?: MenuItem[];
}

interface Navbar1Props {
    logo?: {
        url: string;
        src: string;
        alt: string;
        title: string;
    };
    menu?: MenuItem[];
    auth?: {
        login: {
            title: string;
            url: string;
        };
        signup: {
            title: string;
            url: string;
        };
    };
}

const Navbar = ({
    logo = {
        url: "/logo.png",
        src: "/logo.png",
        alt: "logo",
        title: "LIbrary",
    },

    auth = {
        login: { title: "Login", url: "#" },
        signup: { title: "Sign up", url: "#" },
    },
}: Navbar1Props) => {

    const menu = [
        { title: "Home", url: "/" },
        {
            title: "All Books",
            url: "/allBooks"
        },
        {
            title: "Add Book",
            url: "/addBooks"
        },
        {
            title: "Borrow Summary",
            url: "/borrowSummary",
        },

    ]
    return (
        <section className="py-4 bg-lib-orange text-lib-white">
            <div className=" max-w-[85%] mx-auto">
                {/* Desktop Menu */}
                <nav className="hidden justify-between lg:flex">
                    <div className="flex items-center gap-36">
                        {/* Logo */}
                        <Link to='/' className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8 drop-shadow-lib-gray fill-white drop-shadow-xl/50" alt={logo.alt} />

                        </Link>
                        <div className="flex items-center gap-5">
                            {menu.map((item, i) => (<NavLink key={i} to={item.url} className={({ isActive }) =>
                                isActive
                                    ? "text-lib-green font-semibold border-b-2 border-lib-green hover:text-lib-blue hover:transition-normal"
                                    : "text-lib-black font-semibold hover:text-lib-green hover:text-lib-blue"
                            }>{item.title}</NavLink>))}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" size="sm" className="bg-lib-background text-lib-orange border-none">
                            <a href={auth.login.url}>{auth.login.title}</a>
                        </Button>
                        <Button asChild size="sm">
                            <a href={auth.signup.url}>{auth.signup.title}</a>
                        </Button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <div className="block lg:hidden">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to='/'  className="flex items-center gap-2">
                            <img src={logo.src} className="max-h-8" alt={logo.alt} />
                        </Link>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="bg-lib-background text-lib-orange">
                                    <Menu className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="overflow-y-auto">
                                <SheetHeader>
                                    <SheetTitle>
                                        <a href={logo.url} className="flex items-center gap-2">
                                            <img src={logo.src} className="max-h-8" alt={logo.alt} />
                                        </a>
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-6 p-4">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="flex w-full flex-col gap-4"
                                    >

                                        {menu.map((item) => (<NavLink to={item.url} className={({ isActive }) =>
                                            isActive
                                                ? "text-lib-green font-semibold border-b-2 border-lib-orange text-lib-orange"
                                                : "text-lib-black font-semibold hover:text-lib-green"
                                        }>{item.title}</NavLink>))}

                                    </Accordion>

                                    <div className="flex flex-col gap-3">
                                        <Button asChild variant="outline" className="bg-lib-background text-lib-orange ">
                                            <a href={auth.login.url}>{auth.login.title}</a>
                                        </Button>
                                        <Button asChild>
                                            <a href={auth.signup.url}>{auth.signup.title}</a>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </section>
    );
};







export { Navbar };
