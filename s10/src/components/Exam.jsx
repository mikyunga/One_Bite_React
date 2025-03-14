import { useReducer } from 'react';

//상태를 실제로 변환시키는 역할을 하는 함수
function reducer(state, action) {
  //매개변수 : state, action객체
  switch (action.type) {
    case 'INCREASE':
      return state + action.data;
    case 'DECREASE':
      return state - action.data;
    default:
      return state;
  }
}

const Exam = () => {
  //dispatch : 발송하다 (상태변화가 있어야 한다는 사실을 알리고 이를 처리하는 함수를 호출)
  const [state, dispatch] = useReducer(reducer, 0);
  const onClickPlus = () => {
    dispatch({
      //1만큼 increase해달라고 요청하는 액션객체
      type: 'INCREASE',
      data: 1,
    });
  };

  const onClickMinus = () => {
    dispatch({
      type: 'DECREASE',
      data: 1,
    });
  };
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
