import uuid from "react-native-uuid";

export class Activity {
  uuid: string;
  name: string;
  type: string;
  startTime: number;
  duration: number;

  constructor(name: string, type: string, startTime: number, duration: number) {
    this.uuid = uuid.v4();
    this.name = name;
    this.type = type;
    this.startTime = startTime;
    this.duration = duration;
  }

  toString(): string {
    return `uuid: ${this.uuid},\nname: ${this.name},\ntype: ${this.type},\nstartTime: ${this.startTime},\nduration: ${this.duration}}`;
  }
}
