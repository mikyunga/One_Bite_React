import './Editor.css';
import EmotionItem from './EmotionItem';
import Button from './button';

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

const Editor = () => {
  //item.emotionId가 emotionId(선택된 애)랑 같은 값이면 isSelected를 true로 전달
  const emotionId = 1;

  return (
    <div className="Editor">
      <section className="date_section">
        <h4>오늘의 날짜</h4>
        <input type="date" />
      </section>
      <section className="emotion_section">
        <h4>오늘의 감정</h4>
        {/* map : emotionList 배열 안에 있는 값을 꺼내서 새로운 배열로 변형 */}
        <div className="emotion_list_wrapper">
          {emotionList.map((item) => (
            <EmotionItem
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <textarea placeholder="오늘은 어땠나요?" />
      </section>
      <section className="button_section">
        <Button text={'취소하기'} />
        <Button text={'작성완료'} type={'POSITIVE'} />
      </section>
    </div>
  );
};
export default Editor;
