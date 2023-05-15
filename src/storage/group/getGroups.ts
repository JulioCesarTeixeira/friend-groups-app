import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function getGroups() {
  // get groups from storage
  try {
    const groupList = await AsyncStorage.getItem(GROUP_COLLECTION);

    console.log("getGroups from storage: ", groupList);

    return groupList ? JSON.parse(groupList) : [];
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
