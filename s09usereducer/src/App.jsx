import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';
import Exam from './components/exam';
import { useRef, useReducer } from 'react';
const mockData = [
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
function reducer(state, action) {
  switch (action.type) {
    case 'create':
      return [action.data, ...state];
    case 'update':
      return state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case 'delete':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  //이 todos에 모든 todo들을 보관하는 것, Todos는 상태변화함수
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: 'create',
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        data: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: 'update',
      targetId: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: 'delete',
      targetId: targetId,
    });
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
