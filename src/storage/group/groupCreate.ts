import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
  try {
    // get groups from storage
    const storedGroups = await groupsGetAll();

    // check if group name already exists
    if (storedGroups.includes(newGroupName)) {
      throw new AppError("Group name already exists");
    }

    // add new group to list
    storedGroups.push(newGroupName);

    // save groups to storage
    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(storedGroups));

    // return updated group list
    return storedGroups;
  } catch (error: any) {
    throw error;
  }
}
