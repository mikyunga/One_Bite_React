import './DiaryItem.css';
import { getEmotionImage } from '../util/get-emotion-image';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const DiaryItem = ({ id, emotionId, createdDate, content }) => {
  const nav = useNavigate();
  return (
    <div className="DiaryItem">
      {/* 일기 이미지 */}
      {/* 동적으로 className이 img_section_id넘버(1)로 설정이되는것*/}
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>

      {/* 일기 상세정보 */}
      <div onClick={() => nav(`/diary/${id}`)} className="info_section">
        <div className="created_date">
          {new Date(createdDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>

      {/* 수정하기 버튼 */}
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={'수정하기'} />
      </div>
    </div>
  );
};
export default DiaryItem;
