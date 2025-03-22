import './App.css';
import { useReducer, useRef, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

const mockData = [
  {
    id: 1,
    createdDate: new Date('2025-03-22').getTime(),
    emotionId: 1,
    content: '1번 일기 내용',
  },
  {
    id: 2,
    createdDate: new Date('2025-03-21').getTime(),
    emotionId: 2,
    content: '2번 일기 내용',
  },
  {
    id: 3,
    createdDate: new Date('2025-02-08').getTime(),
    emotionId: 3,
    content: '3번 일기 내용',
  },
];

function reducer(state, action) {
  switch (action.type) {
    // 방금 생성된 일기(action.data)를 배열 맨 앞에 추가하여 반환
    case 'CREATE':
      return [action.data, ...state];
    case 'UPDATE':
      return state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
    case 'DELETE':
      return state.map((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
// 여러 컴포넌트가 공유할 수 있는 데이터를 담아두는 곳
export const DiaryDispatchContext = createContext();

function App() {
  // 데이터 스테이트 보관, 모든 페이지에서 이용하기 위하여 모든 컴퍼넌트의 부모인 App에 위치
  // 여기의 data가 모든 일기 데이터의 배열임
  // data : 현재 상태의 값(현재 일기 목록 상태)

  // dispatch : 상태를 바꾸기 위한 함수 (useReducer를 쓸 때 자동 제공됨, 상태 바꿔달라는 명령을 전달하는 애.)
  // type: '어떤 동작인지 구분하는 문자열',
  // data: 필요한 추가 정보

  // reducer : 상태를 어떻게 바꿀지 정의한 함수
  // mockData : 상태의 초기값
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  //새로운 일기 추가 (data에)
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: 'UPDATE',
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: 'DELETE',
      id,
    });
  };

  return (
    <>
      {/* Context객체를 통해 프롭스 드릴링을 방지 */}
      <DiaryStateContext.Provider value={data}>
        {/* onCreate, onUpdate, onDelete를 묶어서 value로 전달하여 데이터를 담아둠 */}
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
