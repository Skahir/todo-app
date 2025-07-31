import { FlatList, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Checkbox } from 'expo-checkbox';

type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};

const todoData: Todo[] = [
  { id: 1, title: "Buy groceries", isDone: false },
  { id: 2, title: "Finish TypeScript project", isDone: true },
  { id: 3, title: "Read 10 pages of a book", isDone: false },
  { id: 4, title: "Call Mom", isDone: true },
  { id: 5, title: "Go for a 30-minute walk", isDone: false },
  { id: 6, title: "Clean the kitchen", isDone: true },
  { id: 7, title: "Reply to emails", isDone: false },
  { id: 8, title: "Plan weekend trip", isDone: true },
  { id: 9, title: "Water the plants", isDone: false },
  { id: 10, title: "Organize desk", isDone: true },
];

const Index: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todoData);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(t => t.id), 0) + 1,
        title: newTodoText.trim(),
        isDone: false,
      };
      setTodos([...todos, newTodo]);
      setNewTodoText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name='menu' size={24} color={'#333'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{uri: 'https://picsum.photos/200'}} style={{width: 40, height: 40, borderRadius: 20}} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchBar}>
        <Ionicons name='search' size={24} color={'#333'} />
        <TextInput 
          placeholder='Search' 
          style={styles.searchInput} 
          clearButtonMode='always'
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.spacer} />

      <FlatList 
        data={filteredTodos} 
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({item}) => (
          <View style={styles.todoContainer}>
            <View style={styles.todoInfoContainer}>
              <Checkbox 
                value={item.isDone} 
                color={item.isDone ? '#4630EB' : undefined}
                onValueChange={() => toggleTodo(item.id)}
              />
              <Text style={[
                styles.todoText,
                item.isDone && {textDecorationLine: 'line-through'}
              ]}>
                {item.title}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Ionicons name='trash' size={24} color={'red'} />
            </TouchableOpacity>
          </View>
        )} 
      />

      <KeyboardAvoidingView style={styles.footer} behavior='padding' keyboardVerticalOffset={10}>
        <TextInput 
          placeholder='Add new todo' 
          style={styles.newTodoInput}
          value={newTodoText}
          onChangeText={setNewTodoText}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Ionicons name='add' size={34} color={'#fff'} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    backgroundColor: '#f5f5f5' 
  },
  header: {
    marginBottom: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    marginHorizontal: '10%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 30,
    gap: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
  },
  spacer: {
    margin: '5%'
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10, 
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
    color: '#333',
  },
  footer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  newTodoInput: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4630EB',
    padding: 8,
    borderRadius: 10,
    marginLeft: 20,
  },
});

export default Index;