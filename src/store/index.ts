import { create } from 'zustand';

export type ILog = {
    note: string,
    hour: number,
    date: Date | string
}

interface LogStore {
    log: ILog;
    logs: {
        [key: string]: ILog
    };
    setDate: (date: Date) => void;
    setLog: (log: ILog) => void;
    setLogs: (log: ILog, key: string) => void;

}

export const useLogStore = create<LogStore>()((set) => ({
    log: {
        note: "",
        hour: 0,
        date: new Date()
    },
    logs: {},
    setDate: (date: Date) => set((state) => ({
        log: { ...state.log, date }
    })),
    setLog: (log: ILog) => set((state) => ({
        log: { ...state.log, ...log }
    })),
    setLogs: (log: ILog, key: string) => set((state) => {
        const updateLog = { ...state.logs, [key]: log };
        const sortedKyes = Object.keys(updateLog).sort();
        const sortedObject: { [key: string]: ILog } = {};

        for (let key of sortedKyes) {
            sortedObject[key] = updateLog[key]
        }

        return {logs: sortedObject };
    })
}))


