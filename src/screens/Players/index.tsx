import { useState, useEffect } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Container, Form, HeaderList, PlayersAmount } from "./style";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playerGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
    group: string;

}

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const [playerName, setPlayerName] = useState('');

    const navigation = useNavigation();

    const route = useRoute();
    const { group } = route.params as RouteParams;

    const handleSetNewPlayer = async () => {
        if(playerName.trim().length === 0) {
            return Alert.alert('Novo jogador', 'Informe o nome do jogador.');
        }

        const newPlayer = {
            name: playerName,
            team,
        }

        try {
            await playerAddByGroup(newPlayer, group);
            getPlayersByTeam();     
            setPlayerName('');
            
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Novo jogador', error.message);
            } else {
                Alert.alert('Novo jogador', 'Não foi possível adicionar');
            }
        }
    };

    const getPlayersByTeam = async () => {
        try {
            const playersByTeam = await playerGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error)
        }
    }

    const removePlayer = async (playerName: string) => {
        try {
            await playerRemoveByGroup(playerName, group);
            getPlayersByTeam();
        } catch (error) {
            console.log(error)
        }
    }

    const handleGroupRemove = () => {
        Alert.alert('Remover', 'Deseja remover o grupo?', [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => deleteGroup() }
        ])
    }

    const deleteGroup = async () => {
        try {
            await groupRemoveByName(group);
            navigation.navigate('groups');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPlayersByTeam();
    }, [team])

    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title={group}
                subtitle='adicione a galera e separe os times'
            />

            <Form>
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    onChangeText={playerName => setPlayerName(playerName)}
                    value={playerName}

                    onSubmitEditing={handleSetNewPlayer}
                    returnKeyType="done"
                />
                <ButtonIcon 
                    name='add'
                    onPress={handleSetNewPlayer}
                />
            </Form>

            <HeaderList>
                <FlatList 
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter 
                        title={item}
                        isActive={item === team}
                        onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal
                />

                <PlayersAmount>
                    {players.length}
                </PlayersAmount>
            </HeaderList>

            <FlatList
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item.name}
                        onRemove={() => removePlayer(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não há pessoas nesse time."
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 },
                    players.length === 0 && {flex: 1}
                ]}
            />

            <Button 
                title="Remover Turma"
                type="SECONDARY"
                onPress={handleGroupRemove}
            />

        </Container>
    )
}