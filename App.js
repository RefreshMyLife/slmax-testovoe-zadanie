import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Icon } from 'react-native-elements';
import Note from './compents/Note';
export default function App() {
  const [title, onChangeTitle] = React.useState('');
  const [text, onChangeDescribe] = React.useState('');
  const [note, setNote] = React.useState([]);
  const [date, setDate] = React.useState();

  const setFullDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const fullDate = `${date}.${month}.${year} `;
    setDate(fullDate);
  };
  React.useEffect(() => {
    setFullDate();
  }, []);

  const handleAddNote = () => {
    setFullDate();
    setNote([...note, { title: title, description: text, date: date }]);
    onChangeTitle('');
    onChangeDescribe('');
  };
  const deleteItem = (index) => {
    const arr = [...note];
    arr.splice(index, 1);
    setNote(arr);
  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image source={require('./assets/bgLight.png')} style={styles.background} />
        <Text style={styles.mainTitle}>Заметки</Text>
      </View>
      {/**/}
      <View style={styles.noteContainer}>
        <SafeAreaView style={styles.notsContainer}>
          <FlatList
            style={styles.test}
            data={note}
            keyExtractor={(item) => item.index}
            renderItem={({ item, index }) => {
              return (
                <Note
                  key={index}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  handleDelete={() => deleteItem(index)}
                />
              );
            }}
          />
        </SafeAreaView>

        <View style={styles.noteTemplate}>
          <View style={styles.noteTemplateInner}>
            <TextInput
              maxLength={25}
              placeholderTextColor="black"
              placeholder="Название"
              style={styles.noteTemplateTitle}
              onChangeText={onChangeTitle}
              value={title}
            />
            <View style={styles.noteTemplateLine}></View>
            <View style={styles.noteTemplateContainerDiscibe}>
              <TextInput
                placeholderTextColor="black"
                placeholder="Текст описание"
                style={styles.noteTemplateDiscibe}
                onChangeText={onChangeDescribe}
                value={text}
              />
              <TouchableOpacity onPress={() => handleAddNote()}>
                <Icon name="chevron-right" size={30} color="black" type="evilicon" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  test: {},
  titleContainer: {
    height: 100,
    flex: 0.1,
    paddingHorizontal: 140,
    paddingVertical: 80,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  mainTitle: {
    color: '#fff',
    fontSize: 28,
  },
  noteContainer: {
    flex: 1,
  },
  notsContainer: {
    flex: 1,
  },
  noteTemplate: {
    width: 333,
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: '#D2D2D2',
    marginHorizontal: 30,
    paddingHorizontal: 17,
    paddingVertical: 21,
    marginBottom: 42,
  },
  noteTemplateTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
  },
  noteTemplateDiscibe: {
    flex: 1,
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '300',
  },
  noteTemplateLine: {
    borderColor: '#D2D2D2',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    width: 289,
  },
  noteTemplateContainerDiscibe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
