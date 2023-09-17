import Calendar from "@/components/Calendar";
import InitLog from "@/components/InitLog";
import Logs from "@/components/Logs";
import NewLog from "@/components/NewLog";
import ThemeButton from "@/components/ThemeButton";
import {  ILog } from "@/store";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Home = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return redirect("/auth");
  }

  const { data: logs, } = await supabase
    .from("logs")
    .select("*")
    .order("date", { ascending: true })

    // console.log("logs from supabase", logs);
    

  return (
    <div className="space-y-12">
      <InitLog logs={logs as ILog[]} />
      <div className="w-full flex items-center justify-between gap-4">
        <NewLog />
        <ThemeButton />
      </div>
      <Calendar />
      <Logs />
    </div>
  );
};

export default Home;