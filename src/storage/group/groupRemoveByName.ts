import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storageConfig"; 

import { groupGetAll } from "@storage/group/groupGetAll";

export async function groupRemoveByName(group: string) {
    try {
        const storedGroups = await groupGetAll();

        const filteredGroups = storedGroups.filter(groups => groups !== group);

        const groups = JSON.stringify(filteredGroups);

        await AsyncStorage.setItem(GROUP_COLLECTION, groups);

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${group}`);

    } catch (error) {
        throw error;
    }
}