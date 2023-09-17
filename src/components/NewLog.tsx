"use client";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import DatePicker from "./DatePicker"
import { useLogStore } from "@/store"
import { useToast } from "@/components/ui/use-toast"
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const NewLog = () => {
  const log = useLogStore((state) => state.log);
  const logs = useLogStore((state) => state.logs);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);
  const { toast } = useToast();

  const supabase = createClientComponentClient();

  const closeDialog = () => {
    document.getElementById("dialog-close-btn")?.click();
  }

  const validateLog = () => {
    if (!log.note || !log.hour || log.hour === 0) {
      throw "Date or Hour can't be empty!";
    } else if (log.hour >= 24) {
      throw "Please enter a valid hour!";
    }
  }

  const handleSubmitLog = async () => {
    try {

      validateLog();

      const date = log.date as Date;

      const { error } = await supabase
        .from("logs")
        .upsert({ ...log, date: dayjs(date).format("YYYY-MM-DD") })
        .select("*")
        .single()

      if (!error) {
        setLogs(log, dayjs(date).format("YYYY-MM-DD"));

        toast({
          duration: 1500,
          title: "Successfully created Log!",
          description: `${log.hour}h on ${date.toDateString()}`,
        })

        closeDialog();
      } else {
        toast({
          variant: "destructive",
          duration: 1500,
          title: "Failed to create Log!",
          description: error?.message as string,
        })
      }

    } catch (error) {

      toast({
        variant: "destructive",
        duration: 1500,
        title: "Failed to create Log!",
        description: error as string,
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Log</Button>
      </DialogTrigger>
      <div className="">
        <DialogContent className="max-w-xs rounded-md">
          <DialogHeader>
            <DialogTitle>Create New Log</DialogTitle>
            <DialogDescription>
              {
                "Remember, time is your most valuable asset - invest it wisely with our Time Log App!"
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <DatePicker />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="hour" className="text-right">
                Hour
              </Label>
              <Input id="hour" placeholder="Set hour of work" type="number" className="col-span-3" value={log.hour} onChange={
                (e) => setLog({ ...log, hour: parseInt(e.target.value) })
              } />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="note" className="text-right">
                Note
              </Label>
              <Input id="note" placeholder="Note of the log" className="col-span-3" value={log.note} onChange={
                (e) => setLog({ ...log, note: e.target.value })
              } />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit"
              onClick={handleSubmitLog}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default NewLog;