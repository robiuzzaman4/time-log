"use client";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useLogStore } from "@/store";



const Logs = () => {
    // get lists form supabase
    const logs = useLogStore((state) => state.logs);
    // console.log("Logs.tsx - 18", logs);

    return (
        <Table>
            <TableCaption>List of Logs</TableCaption>
            <TableHeader>
                <TableRow className="font-medium">
                    <TableHead className="w-1/3 whitespace-nowrap py-3 px-4">Date</TableHead>
                    <TableHead className="w-1/3 whitespace-nowrap py-3 px-4">Hours</TableHead>
                    <TableHead className="w-1/3 whitespace-nowrap py-3 px-4">Note</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    Object.keys(logs)?.map((key) => {
                        const log = logs[key];
                        const date = log.date as Date;

                        return (
                            <TableRow key={key}>
                                <TableCell className="w-1/3 whitespace-nowrap py-3 px-4">
                                    {date?.toDateString()}
                                </TableCell>
                                <TableCell className="w-1/3 whitespace-nowrap py-3 px-4">
                                    {log?.hour <= 9 ? "0" + log?.hour : log?.hour}
                                </TableCell>
                                <TableCell className="w-1/3 whitespace-nowrap py-3 px-4">
                                    {log?.note}
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    );
};

export default Logs;