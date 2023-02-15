import { useState } from "react";
import { Alert, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { Container, Form, HeaderList, PlayersAmount } from "./style";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppError";
import { playerGetByGroup } from "@storage/player/playerGetByGroup";

type RouteParams = {
    group: string;

}

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');

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
            const players = await playerGetByGroup(group);      
            console.log(players);
        } catch (error) {
            if(error instanceof AppError){
                Alert.alert('Novo jogador', error.message);
            } else {
                Alert.alert('Novo jogador', 'Não foi possível adicionar');
            }
        }
    };

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
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item}
                        onRemove={() => {}}
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
            />

        </Container>
    )
}