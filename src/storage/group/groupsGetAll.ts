import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupsGetAll() {
  // get groups from storage
  try {
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    const groups = storage ? JSON.parse(storage) : [];

    return groups;
  } catch (error: any) {
    throw error;
  }
}
