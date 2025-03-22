import Header from '../components/Header';
import Button from '../components/button';
import Editor from '../components/Editor';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DiaryDispatchContext } from '../App';

const New = () => {
  // Context 안에 있는 값을 꺼내오는 애 : useContext (리엑트훅)
  // 즉, context 안에 있는 데이터 중에 onCreate라는 함수만 꺼내온거
  const { onCreate } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  //수집된 일기 데이터를 onCreate에 넘기는 함수
  const onSubmit = (input) => {
    // onSubmit은 onCreate함수를 통해 새일기를 추가함 (onCreate가 새 일기 추가하는 함수임)
    onCreate(input.createdDate.getTime(), input.emotionId, input.content);

    //새 일기를 추가하면, 자동으로 Home으로 이동하고 이 때에 뒤로가기는 누를 수 없음 (뒤로가면 새 일기 추가하는 창으로 가니까 이를 방지)
    nav('/', { replace: true });
  };
  return (
    <div>
      <Header
        title={'새 일기쓰기'}
        // -1하면 뒤로가기가 됨 useNavigate를 활용하여 클릭 시 뒤로가기.
        leftChild={<Button onClick={() => nav(-1)} text={'뒤로 가기'} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;
