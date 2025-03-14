import { useParams } from 'react-router-dom';

const Diary = () => {
  const params = useParams();

  return <div>{params.id}번 Diary</div>;
};
export default Diary;
