export class GroupModel {
  groupDescription: string;
  groupID: string;
  groupName: string;
  mods: string[];
  threads: string[];
  users: string[];

  constructor(description: string, groupId: string, name: string, m: string[], t: string[], u: string[]) {
    this.groupDescription = description;
    this.groupID;
    this.groupName = name;
    this.mods = m;
    this.threads = t;
    this.users = u;
  }
}
