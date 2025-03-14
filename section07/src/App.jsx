import './App.css';
import Viewer from './components/Viewer';
import Controller from './components/Controller';
import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  //원하는 값이 바뀔때만 callback함수를 실행
  useEffect(() => {
    console.log(`count:${count}`);
  }, [count]);
  //[count]의 값이 바뀔때마다 console에 count값 출력(${count})
  const onClickButton = (value) => {
    setCount(count + value);
  };

  return (
    <div className="App">
      <h1>Simple counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
