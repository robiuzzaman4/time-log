"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const supabase = createClientComponentClient();
    const router = useRouter();
    const pathname = usePathname();
    const isAuthPage = pathname === "/auth";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <nav className="flex items-center justify-between gap-4 py-6">
            <Link href="/" className="text-xl font-bold">
                Time Log
            </Link>

            {
                !isAuthPage &&
                <Button onClick={handleLogout} variant="destructive">
                    Logout
                </Button>
            }
        </nav >
    );
};

export default Navbar;