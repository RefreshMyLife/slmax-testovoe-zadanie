import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default function Note({ title, description, date, handleDelete }) {
  const [expanded, setExpanded] = React.useState(false);
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{ transform: [{ scale: scale }] }}>Delete</Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ListItem.Accordion
      style={styles.test}
      isExpanded={expanded}
      onPress={() => {
        setExpanded(!expanded);
      }}
      noIcon
      content={
        <Swipeable renderLeftActions={leftSwipe}>
          <ListItem.Content style={styles.note}>
            <Text style={styles.noteTitle}> {title}</Text>
            <Text numberOfLines={1} style={styles.noteShortDescribe}>
              {description}
            </Text>
            <Icon leftRotate={true} name="chevron-down" size={30} color="black" type="evilicon" />
          </ListItem.Content>
        </Swipeable>
      }>
      <View style={styles.noteDescriptionBlock}>
        <Text style={styles.noteDate}>{date}</Text>
        <Text style={styles.noteDescription}>{description}</Text>
      </View>
    </ListItem.Accordion>
  );
}

const styles = StyleSheet.create({
  note: {
    width: 333,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 17,
    paddingVertical: 11,
    marginHorizontal: 15,
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 80,
  },
  noteTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 16,
    borderRightWidth: 1,
    borderColor: 'black',
    paddingRight: 13,
  },

  noteShortDescribe: {
    paddingLeft: 10,
    flex: 1,
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
  },
  noteDescription: {
    width: 290,

    textAlign: 'left',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteDescriptionBlock: {
    width: 333,
    paddingLeft: 17,
    paddingRight: 26,
    paddingBottom: 27,
    paddingTop: 0,
    marginHorizontal: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#D2D2D2',
  },
  noteDate: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    color: '#8F8F8F',
    fontWeight: '300',
    fontSize: 8,
    lineHeight: 9,
  },
});
