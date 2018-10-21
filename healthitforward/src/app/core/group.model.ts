export class GroupModel {
  groupDescription: string;
  groupID: string;
  groupName: string;
  mods: string[];
  threads: string[];
  users: string[];

  constructor(description: string, groupid: string, name: string, m: string[], t: string[], u: string[]) {
    this.groupDescription = description;
    this.groupID = groupid;
    this.groupName = name;
    this.mods = m;
    this.threads = t;
    this.users = u;
  }
}
