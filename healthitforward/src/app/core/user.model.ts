export class UserModel {
    email: string;
    healthForm: string[];
    myGroups: string[];
    mySurveys: string[];
    myThreads: string[];
    password: string;
    role: string;
    userID: string;
    username: string;

    constructor(e: string, h: string[], mG: string[], mS: string[], mT: string[], p: string, r: string, uID: string, uN: string) {
        this.email = e;
        this.healthForm = h;
        this.myGroups = mG;
        this.mySurveys = mS;
        this.myThreads = mT;
        this.password = p;
        this.role = r;
        this.userID = uID;
        this.username = uN;
    }
}
