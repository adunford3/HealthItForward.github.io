export class ThreadModel {
  body: string;
  creatorID: string;
  replyChain: string[];
  threadID: string;
  title: string;
  upvotes: string;

  constructor(title: string, body: string, creatorID: string) {
    this.title = title;
    this.body = body;
    this.creatorID = creatorID;
  }
}
