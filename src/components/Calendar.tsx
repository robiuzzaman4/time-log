"use client";

import dayjs from "dayjs";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { cn } from "@/lib/utils";
import {useLogStore} from "@/store";


const Calendar = () => {
    const logs = useLogStore((state) => state.logs);

    const getDateInMonth = (year = dayjs().year(), month = dayjs().month()) => {
        const startDate = dayjs().year(year).month(month).date(1);
        const endDate = startDate.endOf("month");

        const dateArray = []
        for (let i = startDate.date(); i <= endDate.date(); i++) {
            dateArray.push(startDate.date(i).format("YYYY-MM-DD"));

        }
        return dateArray;
    }

    const getColor = (value: number) => {
        if (value === 0) {
            return "bg-secondary";
        } else if (value < 5) {
            return "bg-green-200";
        } else if (value < 10) {
            return "bg-green-400";
        } else {
            return "bg-green-600";
        }
    };

    // const hour = 10;

    return (
        <div className="border border-dashed p-4 rounded-md flex flex-wrap gap-4">
            {
                getDateInMonth()?.map((value, index) => {
                    const log = logs[value];

                    return (
                        <HoverCard key={index} openDelay={100} closeDelay={100} >
                            <HoverCardTrigger>
                                <div className={cn("w-5 h-5 rounded-md cursor-pointer", getColor(log?.hour || 0))}>
                                </div>
                            </HoverCardTrigger>
                            <HoverCardContent>
                                {log?.hour || 0} Hours on {value}
                            </HoverCardContent>
                        </HoverCard>
                    )
                })
            }
        </div >
    );
};

export default Calendar;