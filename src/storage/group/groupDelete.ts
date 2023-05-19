import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupDelete(groupName: string) {
  try {
    // delete group from storage
    await AsyncStorage.removeItem(`${GROUP_COLLECTION}-${groupName}`);
  } catch (error: any) {
    throw error;
  }
}
