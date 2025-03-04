import { TypeData } from "@/classes/TypeData";
import { Activity } from "@/classes/Activity";

export class TypeDataHelper {
  static updateTypeData(
    newActivity: Activity,
    typeDataArray: TypeData[]
  ): TypeData[] {
    const activityTypeExists = typeDataArray.some(
      (item) => item.type === newActivity.type
    );

    if (activityTypeExists) {
      const updatedTypeData = typeDataArray.map((typeData) => {
        if (typeData.type === newActivity.type) {
          return { ...typeData, value: typeData.value + newActivity.duration };
        }
        return typeData;
      });
      return updatedTypeData;
    } else {
      const newTypeData = new TypeData(
        newActivity.type,
        newActivity.duration,
        "#AA55CC"
      ); // TODO: Look into setting default colors for types
      typeDataArray.push(newTypeData);
      console.log("Appended TypeData:", newTypeData);
    }

    return typeDataArray;
  }
}
