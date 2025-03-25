import './App.css';
import { useReducer, useRef, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Diary from './pages/Diary';
import New from './pages/New';
import Edit from './pages/Edit';
import Notfound from './pages/Notfound';

function reducer(state, action) {
  let nextState;

  switch (action.type) {
    case 'INIT': {
      // dispatch가 넘긴 data값 (parsedData)
      return action.data;
    }
    // 방금 생성된 일기(action.data)를 배열 맨 앞에 추가하여 반환
    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item
      );
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('diary', JSON.stringify(nextState));
  return nextState;
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
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem('diary');
    if (!storedData) {
      return;
      // undefined면 즉시종료
    }
    const parsedData = JSON.parse(storedData);

    // parsedData가 배열인지 아닌지
    if (!Array.isArray(parsedData)) {
      // 배열이면 강제 종료
      return;
    }
    // 로컬스토리지에서 불러온 기존 일기들을 기준으로 시작할 id값을 구하여 저장
    // ID값 중 가장 높은 값이 maxId에 저장됨
    let maxId = 0;
    // 모든 item들을 순회하며
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    // parsedData값을 dataState의 초기값이 되도록 전달
    dispatch({
      type: 'INIT',
      data: parsedData,
    });
  }, []);

  //새로운 일기 추가 (data에)
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: 'CREATE',
      data: {
        // 새로운 일기 하나 생성할 때마다 자동으로 id 증가
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
