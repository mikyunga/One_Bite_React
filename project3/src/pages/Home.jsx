import { useState, useContext } from 'react';
import { DiaryStateContext } from '../App';

import Header from '../components/Header';
import Button from '../components/Button';
import DiaryList from '../components/DiaryList';

// 컴퍼넌트 내부에 선언해도 문제가 없음! 가독성과 불필요한 함수의 재생성을 방지하기 위해 외부에 선언한 것
// 매개변수 만으로도 필요한 데이터를 전달할 수 있기 때문
const getMonthlyData = (pivotDate, data) => {
  // 이 달의 일기 Data만 return하기 위한 함수
  // pivotDate의 년 월의 1일 0시 0분 0초
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0, //이렇게 하면 이전 달의 마지막 날로 설정이 됨!
    23,
    59,
    59
  ).getTime(); //타임스탬프 형태로 저장
  //item : 모든
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  // 년 월 함수
  const [pivotDate, setPivotDate] = useState(new Date());
  // pivotDate값을 기준으로 이번달에 해당하는 일기데이터만 반환하는 함수
  // 이 컴퍼넌트가 리랜더링 될 때마다 호출하는 형식
  const monthlyData = getMonthlyData(pivotDate, data);

  // 기존 월에 + 1 하는 함수
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  // 기존 월에 -1 하는 함수
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={'<'} />}
        rightChild={<Button onClick={onIncreaseMonth} text={'>'} />}
      />
      {/* monthlyData를 data라는 이름의 props로 DiaryList에 넘김 */}
      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;
