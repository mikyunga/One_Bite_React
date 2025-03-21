import { useState, useContext } from 'react';
import { DiaryStateContext } from '../App';

import Header from '../components/Header';
import Button from '../components/button';
import DiaryList from '../components/DiaryList';
import Diary from './Diary';

const getMonthlyData = (pivotDate, data) => {
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
  // 년 월 불러오는? 함수
  const [pivotDate, setPivotDate] = useState(new Date());

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
      <DiaryList data={monthlyData} />
    </div>
  );
};
export default Home;
