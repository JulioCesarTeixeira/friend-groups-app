import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupDelete(groupName: string) {
  try {
    // delete group from storage
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    if (storage) {
      const groups = JSON.parse(storage);

      const remainingGroups = groups.filter(
        (group: string) => group !== groupName
      );

      await AsyncStorage.setItem(
        GROUP_COLLECTION,
        JSON.stringify(remainingGroups)
      );

      return remainingGroups;
    }
  } catch (error: any) {
    throw error;
  }
}
