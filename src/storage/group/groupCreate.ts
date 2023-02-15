import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";

import { groupGetAll } from "./groupGetAll";

import { AppError } from "@utils/AppError";

export async function groupCreate(newGroupName: string) {
    try {
        const storedGroups = await groupGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroupName);

        if(groupAlreadyExists) {
            throw new AppError("Já existe um grupo cadastrado com esse nome.");
        }

        const newGroup = JSON.stringify([...storedGroups, newGroupName]);

        await AsyncStorage.setItem(GROUP_COLLECTION, newGroup);
    } catch (error) {
        throw error;
    }
}