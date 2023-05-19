import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig";

export async function groupDeleteByName(deletedGroup: string) {
  try {
    // delete group from storage
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    if (storage) {
      const groups = JSON.parse(storage);

      const remainingGroups = groups.filter(
        (group: string) => group !== deletedGroup
      );

      await AsyncStorage.setItem(
        GROUP_COLLECTION,
        JSON.stringify(remainingGroups)
      );

      // remove players from group
      await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${deletedGroup}`);

      return remainingGroups;
    }
  } catch (error: any) {
    throw error;
  }
}
