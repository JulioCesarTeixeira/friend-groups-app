import AsyncStorage from "@react-native-async-storage/async-storage";
import { playersGetByGroup } from "./playersGetByGroup";
import { PLAYER_COLLECTION } from "@storage/storageConfig";

export async function playerDeleteByGroup(
  playerName: string,
  groupName: string
) {
  try {
    // get players from storage
    const players = await playersGetByGroup(groupName);

    // find player to delete
    const remainingPlayers = players.filter(
      (player) => player.name !== playerName
    );

    // save groups to storage
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify(remainingPlayers)
    );
  } catch (error: any) {
    throw error;
  }
}
