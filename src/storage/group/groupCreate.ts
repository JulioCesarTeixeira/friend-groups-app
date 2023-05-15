import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

export async function groupCreate(newGroupName: string) {
  try {
    const value = await AsyncStorage.getItem(GROUP_COLLECTION);

    console.log("groupCreate", value);

    const groupList = value ? JSON.parse(value) : [];

    console.log("groupCreate from storage or form: ", groupList);

    if (groupList.includes(newGroupName)) {
      throw new Error("Group name already exists");
    }

    groupList.push(newGroupName);

    console.log("groupCreate to be stored: ", groupList);

    await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groupList));

    return groupList;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
