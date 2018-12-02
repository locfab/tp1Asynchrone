import { LevelDb } from "./leveldb";
import WriteStream from "level-ws";
export class Metric {
    public timestamp: string;
    public value: number;
    constructor(ts: string, v: number) {
        this.timestamp = ts;
        this.value = v;
    }
}
export class MetricsHandler {
    private db: any;
    constructor(path: string) {
        this.db = LevelDb.open(path);
    }
    public close(){
       this.db.close()
    }
    public save(key: string, met: Metric[], callback: (error: Error | null) => void)
    {
        console.log(met);
        const stream = WriteStream(this.db);
        stream
            .on('close', ()=>{
                callback(null)
            })

            .on("end", () => {
                callback(null);
            })
        met.forEach(m => {
            stream.write({ key: `metric:${key}:${m.timestamp}`, value: m.value });
        });
        stream.end();
    }
    public get(key: string, callback: (err: Error | null, result?: Metric[]) => void)
    {
        const stream = this.db.createReadStream();
        var met: Metric[] = [];
        stream
            .on("error",(err: Error) => {
                callback(err);
            })
            .on("end", () => {
                callback(null);
            })
            .on("data", (data: any) => {
                const [, k, timestamp] = data.key.split(":");
                const value = data.value;
                if (key != k) {
                    console.log(`Level DB error: ${data} does not match key ${key}`);
                }
                else {
                    met.push(new Metric(timestamp, value));
                }
            });
    }
    delete(key, callback) {const stream = this.db.createReadStream();
        var met = [];
        stream
            .on("error",(err: Error) => {
                callback(err);
            })

            .on("end", () => {
                callback(null);
            })
            .on("data", (data) => {
                const [, k, timestamp] = data.key.split(":");
                const value = data.value;
                if (key != k) {
                    console.log(`Level DB error: ${data} does not match key ${key}`);
                }
                else {
                    this.db.del(data.key, function (err) {
                        if (err)
                            callback(err);
                    });
                }
            });
    }
}