import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Text, Pressable} from 'react-native';

import {CheckBoxPaper, DeletePopup, RenderIcon} from '@components/atoms';
import {formatDate} from '@utils';
import ImportantTodo from '../ImportantTodo/Important';
import Icons from '@assets/icon/Icons';
import {colors} from '@constants/colors';
import {useFormStore, useTaskStore} from '@redux/taskStore';
import {useNavigation} from '@react-navigation/native';

import {useStyles} from './TodoList.useStyles';

const TodoList = ({allToDO}: any) => {
  const {navigate} = useNavigation();

  const [checked, setChecked] = useState(true);

  const [deletePopupVisible, setDeletePopupVisible] = useState(false);

  const {
    setCurrentEditedTodo,
    setIsEditedTodo,
    todoNewList,
    deleteTask,
    updateTask,
  } = useTaskStore();

  const {styles} = useStyles();

  const handleCancelDelete = () => {
    setDeletePopupVisible(false);
  };

  const onEditedTodoHandler = (item: any) => {
    setIsEditedTodo(true);
    setCurrentEditedTodo(item);
    navigate('AddTodo', {item});
  };

  const toggleCheckbox = (item: any) => {
    let payload = {
      id: item?.id,
      title: item?.title,
      description: item?.description,
      isImportant: item?.isImportant,
      isCompleted: !item?.isCompleted,
      date: item?.date,
    };

    updateTask(payload);
  };

  const handleDeleteItem = async (item: any) => {
    setDeletePopupVisible(false);

    deleteTask(item.id);
  };

  const todoItem = ({item}: any) => {
    const {title, date, isCompleted, description, isImportant} = item || {};

    return (
      <View style={styles.containerItem}>
        <View>
          <View style={styles.containerWrapper}>
            <Text
              style={[
                styles.title,
                {
                  textDecorationLine: isCompleted ? 'line-through' : 'none',
                },
              ]}>
              {title}
            </Text>
            <ImportantTodo isImportant={isImportant} />
          </View>

          <Text style={styles.description}>{description}</Text>

          <View style={styles.containerCheck}>
            <CheckBoxPaper
              checked={checked}
              setChecked={() => toggleCheckbox(item)}
              label={''}
            />
          </View>

          <View style={styles.containerTime}>
            <Text style={styles.margin}>{formatDate(date)}</Text>
            <Pressable
              onPress={() => onEditedTodoHandler(item)}
              style={styles.margin}>
              <RenderIcon icon={Icons.EDIT} width={22} height={20} />
            </Pressable>

            <TouchableOpacity onPress={() => setDeletePopupVisible(true)}>
              <RenderIcon icon={Icons.DELETE} fill={colors.red} />
              <DeletePopup
                visible={deletePopupVisible}
                onDelete={() => handleDeleteItem(item)}
                onCancel={handleCancelDelete}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={todoNewList}
        renderItem={todoItem}
        keyExtractor={(item, index) => item?.id?.toString() + index}
      />
    </View>
  );
};

export default TodoList;
