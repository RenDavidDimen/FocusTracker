import uuid from "react-native-uuid";

export class TypeData {
  id: string;
  type: string;
  color: string;
  // total time logged for type, needs to stay as `value` as PieChart references the data by that name
  value: number;

  constructor(type: string, totalDuration: number, color: string) {
    this.id = uuid.v4();
    this.type = type;
    this.value = totalDuration;
    this.color = color;
  }
}
