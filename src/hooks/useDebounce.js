import { useEffect, useState } from "react";

// useDebounce 훅: 입력 값이 변경될 때 일정 시간 후에 반영되는 디바운스 값을 반환합니다.
const useDebounce = (value, delay) => {
  // 디바운스된 값을 저장할 상태 변수를 선언합니다.
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 입력 값이 변경되면 지정된 시간(delay) 후에 디바운스된 값을 업데이트합니다.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 클린업 함수: 컴포넌트가 언마운트되거나 value 또는 delay가 변경되기 전에 타이머를 취소합니다.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // value 또는 delay가 변경될 때마다 useEffect 훅이 실행됩니다.

  // 디바운스된 값을 반환합니다.
  return debouncedValue;
};

export default useDebounce; // useDebounce 훅을 export 합니다.
