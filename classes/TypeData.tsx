import uuid from "react-native-uuid";

export class TypeData {
  type: string;
  color: string;
  // total time logged for type, needs to stay as `value` as PieChart references the data by that name
  value: number;

  constructor(type: string, totalDuration: number, color: string) {
    this.type = type;
    this.value = totalDuration;
    this.color = color;
  }

  toString(): string {
    return `type: ${this.type},\nvalue" ${this.value},\ncolor: ${this.color}`;
  }
}
