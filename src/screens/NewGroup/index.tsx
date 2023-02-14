import { useState } from "react";

import { Container, Content, Icon } from "./style";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import { useNavigation } from '@react-navigation/native';

export function NewGroup() {

    const [groupName, setGroupName] = useState('');

    const navigation = useNavigation();

    const handleNewGroup = () => {
        navigation.navigate("players", { group: groupName })
    }

    return (
        <Container>
            <Header showBackButton/>

            <Content>
                <Icon />

                <Highlight 
                    title="Nova turma"
                    subtitle="Crie a turma para adicionar as pessoas"
                />

                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroupName}
                />

                <Button 
                    title="Criar"
                    onPress={handleNewGroup}
                />
            </Content>

        </Container>
    )
}