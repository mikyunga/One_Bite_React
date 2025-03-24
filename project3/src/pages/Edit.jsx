import Header from '../components/Header';
import Button from '../components/button';
import Editor from '../components/Editor';
import { useContext, useEffect, useState } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';

const Edit = () => {
  // url 파라미터를 가져옴.
  const params = useParams();
  // Context 안에 있는 값을 꺼내오는 애 : useContext (리엑트훅)
  // 즉, context 안에 있는 데이터 중에 onCreate라는 함수만 꺼내온거
  const data = useContext(DiaryStateContext);
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const nav = useNavigate();
  const [curDiaryItem, setCurrentDiaryItem] = useState();

  // useEffect에 의해서 컴퍼넌트가 마운트 된 이후이거나
  // params.id나 data state가 바뀐 경우에는
  // currentDiaryItem에 의해 해당 데이터를 꺼내와서,
  // setCurrentDiaryItem이라는 함수를 통해 useState에 보관
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(params.id)
    );
    if (!currentDiaryItem) {
      window.alert('존재하지 않는 일기입니다.');
      nav('/', { replace: true });
    }

    setCurrentDiaryItem(currentDiaryItem);
  }, [params.id]);

  // 확인 누르면 true, 취소 누르면 false 값이 됨
  const onClickDelete = () => {
    if (window.confirm('일기를 정말 삭제할까요?')) {
      onDelete(params.id);
      nav('/', { replace: true });
    }
  };

  // Editor의 onClickSubmitButton에서 호출됨
  const onSubmit = (input) => {
    if (window.confirm('일기를 정말 수정할까요?')) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content
      );
      nav('/', { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={'일기 수정하기'}
        // -1하면 뒤로가기가 됨 useNavigate를 활용하여 클릭 시 뒤로가기.
        leftChild={<Button onClick={() => nav(-1)} text={'< 뒤로 가기'} />}
        rightChild={
          <Button onClick={onClickDelete} text={'삭제하기'} type={'NEGATIVE'} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};
export default Edit;
