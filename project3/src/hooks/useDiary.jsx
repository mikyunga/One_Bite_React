// 함수 이름 앞에 use가 붙으면 커스텀훅
import { useContext, useState, useEffect } from 'react';
import { DiaryStateContext } from '../App';
import { useNavigate } from 'react-router-dom';

const useDiary = (id) => {
  // Context 안에 있는 값을 꺼내오는 애 : useContext (리엑트훅)
  // 즉, context 안에 있는 데이터 중에 onCreate라는 함수만 꺼내온거
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurrentDiaryItem] = useState();
  const nav = useNavigate();

  // useEffect에 의해서 컴퍼넌트가 마운트 된 이후이거나
  // params.id나 data state가 바뀐 경우에는
  // currentDiaryItem에 의해 해당 데이터를 꺼내와서,
  // setCurrentDiaryItem이라는 함수를 통해 useState에 보관
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
    }

    setCurrentDiaryItem(currentDiaryItem);
  }, [id]);

  return curDiaryItem;
};
export default useDiary;
