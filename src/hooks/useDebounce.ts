import React from "react";

const useDebounce = (value: string, delay: number): [string, () => void] => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };

  React.useEffect(() => {
    clearTimer();
    const newTimer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    setTimer(newTimer);

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return [debouncedValue, clearTimer];
};

export default useDebounce;
