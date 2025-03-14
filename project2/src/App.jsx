import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import { useState, useRef } from 'react';
const mockDate = [
  //하나의 todo item 임시데이터 배열
  //리랜더링 될 필요가 없으므로 함수 밖에서 선언
  {
    id: 0,
    isDone: false,
    content: 'React 공부하기',
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: '빨래하기',
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: '키보드 청소하기',
    date: new Date().getTime(),
  },
];
function App() {
  //이 todos에 모든 todo들을 보관하는 것, Todos는 상태변화함수
  const [todos, setTodos] = useState(mockDate);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]); //state값 업데이트
  };

  const onUpdate = (targetId) => {
    //todos State의 값들 중에 targetId와 일치하는 id를 갖는 요소의 isDone 변경
    // 인수: todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
    setTodos(
      todos.map(
        (
          todo //모든todo순회
        ) => (todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo)
      )
    );
  };

  const onDelete = (targetId) => {
    //인수: todos배열에서 targetId랑 일치하는 id인 요소만 없앤 새로운 배열
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
