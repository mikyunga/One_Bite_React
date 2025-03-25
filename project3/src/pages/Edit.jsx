import Header from '../components/Header';
import Button from '../components/button';
import Editor from '../components/Editor';
import { useContext } from 'react';
import { DiaryDispatchContext, DiaryStateContext } from '../App';
import { useParams, useNavigate } from 'react-router-dom';
import useDiary from '../hooks/useDiary';

const Edit = () => {
  // url 파라미터를 가져옴.
  const params = useParams();
  const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
  const nav = useNavigate();

  const curDiaryItem = useDiary(params.id);

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
