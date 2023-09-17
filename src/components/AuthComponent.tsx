"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthComponent = () => {
    const supabase = createClientComponentClient();

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${location.origin}/auth/callback`
            }
        })
    }

    return (
        <section className="h-[80vh] w-full grid place-items-center">
            <div className="flex flex-col items-center text-center gap-4">
                <p>
                    Remember, time is your most valuable asset <br /> invest
                    it wisely with our Time Log App!
                </p>
                <Button onClick={handleLogin}>Login with google</Button>
            </div>
        </section>
    );
};

export default AuthComponent;