import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageHelper {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (e) {
      console.error(`Failed to fetch data for key "${key}":`, e);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Data saved successfully for key "${key}"`);
    } catch (e) {
      console.error(`Failed to save data for key "${key}":`, e);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed successfully for key "${key}"`);
    } catch (e) {
      console.error(`Failed to remove data for key "${key}":`, e);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log("Storage cleared successfully");
    } catch (e) {
      console.error("Failed to clear storage:", e);
    }
  }
}

export default StorageHelper;
