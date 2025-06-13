import React from 'react';

interface CounterProps {
  count: number;
  setCount: (value: number) => void;
}

export const Counter: React.FC<CounterProps> = ({ count, setCount }) => {
  return (
    <div className="card">
      <button onClick={() => setCount(count + 1)}>
        count is {count}
      </button>
      <p>
        Click the button to increment the counter!
      </p>
    </div>
  );
};