export class UserModel {
  email: string;
  myGroups: string[];
  myThreads: string[];
  password: string;
  role: string;
  userID: string;
  username: string;

constructor(e: string, mG: string[], mT: string[], p: string, r: string, uID: string, uN: string){
    this.email = e;
    this.myGroups = mG;
    this.myThreads = mT;
    this.password = p;
    this.role = r;
    this.userID = uID;
    this.username = uN;
  }
}
