import { useState } from "react";

import { FlatList } from "react-native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";

import { Container, Form, HeaderList, PlayersAmount } from "./style";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);

    return (
        <Container>
            <Header showBackButton />

            <Highlight 
                title='Nome da turma'
                subtitle='adicione a galera e separe os times'
            />

            <Form>
                <Input 
                    placeholder="Nome da pessoa"
                    autoCorrect={false}
                    />

                <ButtonIcon 
                    name='add'
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