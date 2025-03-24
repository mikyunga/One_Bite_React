import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 배열 안에 객체를 만들어 준 뒤에 랜더링 시키는 방식
const emotionList = [
  {
    emotionId: 1,
    emotionName: '완전 좋음',
  },
  {
    emotionId: 2,
    emotionName: '좋음',
  },
  {
    emotionId: 3,
    emotionName: '보통',
  },
  {
    emotionId: 4,
    emotionName: '나쁨',
  },
  {
    emotionId: 5,
    emotionName: '완전 나쁨',
  },
];

const getStringDate = (targetDate) => {
  // YYYY-MM-DD 형태
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  // 문자열이니까 1의자리는 01로 출력이 안되므로 강제로 형태 맞춤
  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};

const Editor = ({ initData, onSubmit }) => {
  const [input, setInput] = useState({
    createdDate: new Date(),
    emotionId: 3,
    content: '',
  });

  const nav = useNavigate();

  // initData가 들어오면, 기본값을 initData로 설정
  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createdDate: new Date(Number(initData.createdDate)),
      });
    }
  }, [initData]);

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'createdDate') {
      // input 요소에서 받아온 날짜는 문자열이므로,
      // 이번엔 date로 변환해서 value에 집어넣어야함. 바꾸기 전 list를 수정하는것이므로
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onClickSubmitButton = () => {
    onSubmit(input);
  };

  return (
    <div className="Editor">
      {/* 오늘의 날짜 섹션 */}
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        {/* 문자열로 변환하여 날짜를 집어넣어야 반영됨 */}
        <input
          name="createdDate"
          onChange={onChangeInput}
          value={getStringDate(input.createdDate)}
          type="date"
        />
      </section>

      {/* 오늘의 감정 섹션 */}
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        {/* map : emotionList 배열 안에 있는 값을 꺼내서 새로운 배열로 변형 */}
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              //각 감정 아이템마다 onClick함수를 가짐
              //클릭한 경우에만 onClick함수가 실행되어 emotionId를 전달
              onClick={() =>
                onChangeInput({
                  target: {
                    name: 'emotionId', //바꿀 항목은 emotionId
                    value: item.emotionId, //내가 클릭한 emotion의 Id를 value로 전달
                  },
                })
              }
              key={item.emotionId}
              {...item}
              //item.emotionId가 input.emotionId(선택된 애)랑 같은 값이면 isSelected를 true로 전달
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>

      {/* 오늘의 일기 섹션 */}
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea
          // 텍스트 내용이 변경될 때(onChange) input 상태의 content 값이 함께 업데이트됨
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button_section">
        {/* 취소하기 버튼 클릭하면 뒤로가기 */}
        <Button onClick={() => nav(-1)} text={'취소하기'} />
        {/* 작성완료 버튼 클릭하면 해당함수호출하여 새일기생성 */}
        <Button
          onClick={onClickSubmitButton}
          text={'작성완료'}
          type={'POSITIVE'}
        />
      </section>
    </div>
  );
};
export default Editor;
