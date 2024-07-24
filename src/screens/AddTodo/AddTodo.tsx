import React, {useState} from 'react';
import {View, Pressable, Text} from 'react-native';
import ImportantTodo from '@components/molecule/ImportantTodo/Important';
import {useFormStore, useTaskStore} from '@redux/taskStore';
import {InputText} from '@components/atoms';

import {useStyles} from './AddTodo.useStyles';

const AddTodo = ({navigation}: any) => {
  const {styles} = useStyles();

  const {addTask, isEditedTodo, currentEditedTodo, updateTask} = useTaskStore();
  const {isImportant, title, description} = useFormStore();

  const [inputTitle, setInputTitle] = useState(
    isEditedTodo ? currentEditedTodo?.title : title,
  );
  const [inputDescription, setInputDescription] = useState(
    isEditedTodo ? currentEditedTodo?.description : description,
  );
  const [inputImportant, setInputImportant] = useState(
    isEditedTodo ? currentEditedTodo?.isImportant : isImportant,
  );

  const handleAddTask = () => {
    if (isEditedTodo) {
      let payload = {
        id: currentEditedTodo?.id,
        title: inputTitle,
        description: inputDescription,
        isImportant: inputImportant,
        isCompleted: currentEditedTodo?.isCompleted,
        date: currentEditedTodo?.date,
      };
      updateTask(payload);
    } else {
      let payload = {
        id: Date.now(),
        title: inputTitle,
        description: inputDescription,
        isImportant: inputImportant,
        isCompleted: false,
        date: Date.now(),
      };

      addTask(payload);
    }

    if (inputTitle && inputDescription) {
      setInputTitle(null);
      setInputImportant(null);
      setInputDescription(null);

      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.important}>
        <ImportantTodo
          onChangeText={setInputImportant}
          isImportant={inputImportant}
        />
      </View>

      <InputText
        description={inputTitle}
        placeholder={'Title'}
        onChangeText={setInputTitle}
      />

      <InputText
        description={inputDescription}
        placeholder={'Description'}
        onChangeText={setInputDescription}
        padding={30}
      />

      <Pressable style={styles.button} onPress={handleAddTask}>
        <Text style={styles.text}>{isEditedTodo ? 'Edit' : 'Add'}</Text>
      </Pressable>
    </View>
  );
};

export default AddTodo;
