import "./App.css";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [light, setLight] = useState("OFF");

  return (
    <>
      <div>
        <h1>{light}</h1>
        <button
          onClick={() => {
            setLight(light === "ON" ? "OFF" : "ON");
          }}
          // 클릭 이벤트를 진행하면, light가 ON이면 OFF로, OFF면 ON으로 setLight가 변화
        >
          {light === "ON" ? "끄기" : "켜기"}
          {/* light가 ON이면 끄기, 아니면 켜기로 버튼 text가 바뀜 */}
        </button>
      </div>
      <div>
        <h1>{count}</h1>
        {/* count를 h1으로 출력 */}
        <button
          onClick={() => {
            setCount(count + 1);
            // 클릭 시, setCount가 count에 +1되게 변화하는 버튼
          }}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App; //App을 기본값으로 export하겠다
