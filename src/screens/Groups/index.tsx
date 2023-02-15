import { useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native'

import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { Container } from './style';

import { groupGetAll } from '@storage/group/groupGetAll';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  };

  const handleNewGroup = () => {
    navigation.navigate('newGroup')
  };

  const getAllGroups = async () => {
    try {
      const allGroups = await groupGetAll()
      setGroups(allGroups)
    } catch (error) {
      console.log(error)
    }
  };

  // useEffect(() => {
  //   getAllGroups();
  // }, [groups])

  useFocusEffect(useCallback(() => {
    getAllGroups();
  }, []));

  return (
    <Container>
      <Header />

      <Highlight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item}
            onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Que tal cadastrar a primeira turma?'
          />
        )}
        
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}