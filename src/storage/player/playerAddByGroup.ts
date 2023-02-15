import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';
import { PLAYER_COLLECTION } from '../storageConfig';
import { PlayerStorageDTO } from './PlayerStorageDTO';

import { playerGetByGroup } from './playerGetByGroup';

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
    try {
        const storedPlayers = await playerGetByGroup(group);

        const playerAlreadyExists = storedPlayers.find(player => player.name === newPlayer.name)

        if(playerAlreadyExists){
            throw new AppError("Já existe um(a) jogador(a) com esse nome cadastrado nesse time.");
        }

        const newPlayers = JSON.stringify([...storedPlayers, newPlayer]);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, newPlayers);
    } catch (error) {
        throw error;
    }
}