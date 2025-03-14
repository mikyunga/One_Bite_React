import './List.css';
import TodoItem from './TodoItem';
import { useState } from 'react';

const List = ({ todos, onUpdate, onDelete }) => {
  const [search, setSearch] = useState('');

  //search state가 바뀔때마다 리랜더링됨
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  //필터링함수
  const getFilteredDate = () => {
    //아무것도 안 입력되어 있으면 걍 반환
    if (search === '') {
      return todos;
    }
    //해당 content가 포함되어있으면 true, 없으면 false를 반환, LowerCase는 모두 소문자로 변환하여 검색하는 기능
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const filteredTodos = getFilteredDate();

  return (
    <div className="List">
      <h4>Todo List☘️</h4>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="todos_wrapper">
        {/* todos를 반복적으로(List형태로) 랜더링하기 위함(map) */}
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
