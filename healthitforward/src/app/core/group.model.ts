export class GroupModel {
  groupDescription: string;
  groupID: string;
  groupName: string;
  mods: string[];
  threads: string[];
  users: string[];

  constructor(name: string, description: string) {
    this.groupDescription = description;
    this.groupName = name;
  }
}
