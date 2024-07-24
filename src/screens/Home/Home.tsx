import React, {useState} from 'react';
import {View} from 'react-native';

import {ImagesAssets} from '@assets/images/ImagesAssets';
import {CheckBoxPaper, RoundButton} from '@components/atoms';
import {TodoList} from '@components/molecule';

import {useTaskStore} from '@redux/taskStore';

import {useStyles} from './Home.useStyles';

const Home = ({navigation}: any) => {
  const {styles} = useStyles();

  const {setCurrentEditedTodo, setIsEditedTodo, todoNewList, setTodoList} =
    useTaskStore();

  const [checked, setChecked] = useState({
    allData: true,
    importantData: false,
  });

  const handleFilterImportantTodo = () => {
    setChecked({allData: false, importantData: true});
    const filterTodo = todoNewList?.filter((todo: any) => todo?.isImportant);
    setTodoList(filterTodo);
  };

  const handleFilterAllData = async () => {
    setChecked({allData: true, importantData: false});
    setTodoList(todoNewList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <CheckBoxPaper
          checked={checked?.importantData}
          setChecked={handleFilterImportantTodo}
          label="Important"
        />

        <CheckBoxPaper
          checked={checked?.allData}
          setChecked={handleFilterAllData}
          label="All ToDo"
        />
      </View>

      <View style={styles.wrapperTop}>
        <TodoList allToDO={todoNewList} />
      </View>

      <View style={styles.wrapperBottom}>
        <RoundButton
          onPress={() => {
            setIsEditedTodo(false);
            setCurrentEditedTodo(null);
            navigation.navigate('AddTodo');
          }}
          imageSource={ImagesAssets.plus_btn}
        />
      </View>
    </View>
  );
};

export default Home;
