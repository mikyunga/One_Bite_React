import { useParams } from 'react-router-dom';

const Edit = () => {
  const params = useParams();
  return <>{params.id}번 일기 수정</>;
};
export default Edit;
