import './DiaryList.css';
import Button from './button';
import DiaryItem from './DiaryItem';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DiaryList = ({ data }) => {
  const nav = useNavigate();
  // 초기값 latest
  const [sortType, setSortType] = useState('latest');
  // select를 onChange할 때 마다, setSortType을 통해 sortType의 값이 선택한 select option의 value값으로 변경됨
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };

  //정렬하는 함수
  const getSortedDate = () => {
    // 새로운 배열을 반환해주는 toSorted함수
    return data.toSorted((a, b) => {
      if (sortType === 'oldest') {
        return Number(a.createdDate) - Number(b.createdDate);
      } else {
        return Number(b.createdDate) - Number(a.createdDate);
      }
    });
  };

  const sortedData = getSortedDate();

  return (
    <div className="DiaryList">
      {/* 정렬하기 */}
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={'latest'}>최신순</option>
          <option value={'oldest'}>오래된 순</option>
        </select>

        {/* 새 일기 추가 버튼 */}
        <Button
          onClick={() => nav('/new')}
          text={'새 일기 쓰기'}
          type={'POSITIVE'}
        />
      </div>

      {/* DiaryItem 호출 */}
      <div className="list_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
