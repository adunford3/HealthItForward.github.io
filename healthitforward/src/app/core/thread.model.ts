export class ThreadModel {
    body: string;
    creatorID: string;
    replyChain: string[];
    threadID: string;
    title: string;
    upvotes: string;

    constructor(b: string, c: string, rC: string[], tID: string, t: string, upV: string) {
        this.body = b;
        this.creatorID = c;
        this.replyChain = rC;
        this.threadID = tID;
        this.title = t;
        this.upvotes = upV;
    }
}
