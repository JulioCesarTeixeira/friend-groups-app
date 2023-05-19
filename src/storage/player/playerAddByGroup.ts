import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@utils/AppError";

import { PLAYER_COLLECTION } from "@storage/storageConfig";

import { PlayerStorageDTO } from "./PlayerStorageDTO";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(
  newPlayer: PlayerStorageDTO,
  groupName: string
) {
  try {
    // get players from storage
    const players = await playersGetByGroup(groupName);

    // check if group name already exists
    const doesPlayerAlreadyExists = players.find(
      (player) => player.name === newPlayer.name
    );

    if (doesPlayerAlreadyExists) {
      throw new AppError("Player is already added to a team.");
    }

    // add new group to list
    players.push(newPlayer);

    // save groups to storage
    await AsyncStorage.setItem(
      `${PLAYER_COLLECTION}-${groupName}`,
      JSON.stringify(players)
    );

    // return updated group list
    return players;
  } catch (error: any) {
    throw error;
  }
}
