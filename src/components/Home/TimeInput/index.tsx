import React from 'react';
import { Input, InputContainer, InputSurroundings, SecondsText } from './styles';

interface TimeInputProps {
  value: number;
  label?: 'SET_RELATED' | 'EXERCISE_RELATED';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ value, onChange, label }: TimeInputProps) => {
  const SET_CONDITIONAL_LABEL = label === 'SET_RELATED' ? 'reps' : 'segs';

  const handleFocus = (event: any) => event.target.select();

  return (
    <InputContainer>
      <InputSurroundings>
        <Input
          type={label === 'SET_RELATED' ? 'number' : 'text'}
          min={0}
          max={999}
          maxLength={3}
          value={value}
          onFocus={handleFocus}
          onChange={(event) => onChange(event)}
        />
      </InputSurroundings>
      <SecondsText>{SET_CONDITIONAL_LABEL}</SecondsText>
    </InputContainer>
  );
};

export default TimeInput;
