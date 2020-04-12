import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, CheckBox } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function App() {

  const [tasks, setTask] = useState([
    { title: 'react', key: '1', isFinish: true },
    { title: 'os', key: '2', isFinish: true },
    { title: 'network', key: '3', isFinish: true },
    { title: 'reactNative', key: '4', isFinish: false },
  ]);
  const [tempTasks, setTempTask] = useState([
    { title: 'react', key: '1', isFinish: true },
    { title: 'os', key: '2', isFinish: true },
    { title: 'network', key: '3', isFinish: true },
    { title: 'reactNative', key: '4', isFinish: false },
  ]);
  const [text, setText] = useState('');
  const [incrementedID, setID] = useState('5');


  const addTodo = (incrementedID, text, tasks, tempTasks) => {
    setID((parseInt(incrementedID) + 1).toString());
    setTask(() => {
      // console.log({ title: text, key:incrementedID, isFinish: false } );
      return [...tasks, { title: text, key: incrementedID, isFinish: false }];
    })
    setTempTask(() => {
      // console.log(tempTasks)
      return [...tempTasks, { title: text, key: incrementedID, isFinish: false }];
    })
  }

  const checkBoxChange = (id, tasks, tempTasks) => {
    newTasks = tasks
    // console.log(newTasks[id-1]);

    setTask(() => {
      newTasks = tasks
      newTasks.map((item) => {
        if (item.key == id)
          item.isFinish = !item.isFinish

      })
      return newTasks
    })
    setTempTask(() => {
      newTasks = tempTasks
      newTasks.map((item) => {
        if (item.key == id)
          item.isFinish = !item.isFinish

      })
      console.log(newTasks)
      return newTasks
    })
  }

  const getSearchText = (value) => setText(value)
  const clickHandlerAll = (tasks) => {
    setTempTask(() => {
      return tasks;
    })
  }
  const clickHandlerActive = (tasks) => {
    setTempTask(() => {
      { return tasks.filter(todo => todo.isFinish == false); }
    })
  }
  const clickHandlerDone = (tasks) => {
    setTempTask(() => {
      { return tasks.filter(todo => todo.isFinish == true); }
    })
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>BABY SHARK</Text>
      </View>
      <View style={styles.addTaskBar}>
        <TextInput style={styles.searchInput} placeholder="Add a To-Do" onChangeText={getSearchText}></TextInput>
        <TouchableOpacity onPress={() => addTodo(incrementedID, text, tasks, tempTasks)}>
          <MaterialIcons name="add" style={styles.addIcone} ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <View style={styles.addTaskBar}>
        <TouchableOpacity onPress={() => clickHandlerAll(tasks)}>
          <Text style={styles.buttonText}>
            All
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickHandlerActive(tasks)}>
          <Text style={styles.buttonText}>
            Active
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickHandlerDone(tasks)}>
          <Text style={styles.buttonText}>
            Done
            </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tempTasks}
        renderItem={({ item }) => (
          <View style={styles.tasksContainer}>

            <TouchableOpacity key={item.key} onPress={() => { checkBoxChange(item.key, tasks, tempTasks) }} >

              <MaterialIcons name="check" style={item.isFinish == true ? styles.checkIcone : styles.uncheckIcone} ></MaterialIcons>
            </TouchableOpacity>

            {/* <CheckBox
              // style={{backgroundColor: item.isFinish ? 'orange':'white'}}
              value={item.isFinish}
              title="hello"
              id={item.key}
              onChange={(event)=> checkBoxChange(event,tasks,tempTasks)}
              />    */}
            <Text style={styles.task}>{item.title} </Text>
          </View>
        )} />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#010F3D',
  },
  header:
  {
    fontSize: 30,
    color: 'orange',
    fontWeight: 'bold',
  },
  searchInput: {
    margin: 10,
    width: 250,
    padding: 8,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#777',
    backgroundColor: 'white',
  },
  addIcone: {
    width: 50,
    padding: 5,
    height: 50,
    fontSize: 40,
    borderRadius: 100,
    backgroundColor: 'orange',
  },
  checkIcone: {
    width: 30,
    padding: 5,
    margin: 5,
    height: 30,
    fontSize: 20,
    color: 'orange',
    borderColor: 'orange',
    borderWidth: 2,
  },
  uncheckIcone: {
    width: 30,
    padding: 5,
    margin: 5,
    height: 30,
    fontSize: 20,
    color: '#010F3D',
    borderColor: 'white',
    borderWidth: 2,
  },
  addTaskBar: {
    display: 'flex',
    flexDirection: 'row'
  },
  tasksContainer:
  {
    display: 'flex',
    flexDirection: 'row'
  },
  buttonText: {
    width: 80,
    height: 30,
    margin: 10,
    padding: 5,
    fontSize: 15,
    color: 'black',
    borderRadius: 25,
    textAlign: 'center',
    backgroundColor: 'white',
    // backgroundColor: 'orange',
  },
  task: {
    width: 300,
    margin: 5,
    fontSize: 20,
    color: 'white',
  },
  checkBx: {
    backgroundColor: "black"
    // checkedColor: 'orange'

  }
});
