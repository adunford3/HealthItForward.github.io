export class FirebaseUserModel {
  name: string;
  height: number;
  weight: number;
  provider: string;

constructor(){
    this.name = "";
    this.provider = "";
    this.height = 0;
    this.weight = 0;
  }
}
