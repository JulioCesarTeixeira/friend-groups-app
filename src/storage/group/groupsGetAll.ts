import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  // get groups from storage
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    console.log("getGroups from storage: ", storage);

    const groups = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
