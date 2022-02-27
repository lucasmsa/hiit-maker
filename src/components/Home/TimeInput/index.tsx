import React from 'react';
import { Input, InputContainer, InputSurroundings, SecondsText } from './styles';

interface TimeInputProps {
  value: number;
  label?: 'SET_RELATED' | 'EXERCISE_RELATED';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ value, onChange, label }: TimeInputProps) => {
  const SET_CONDITIONAL_MIN = label === 'SET_RELATED' ? 1 : 0;
  const SET_CONDITIONAL_MAX = label === 'SET_RELATED' ? 60 : 59;
  const SET_CONDITIONAL_LABEL = label === 'SET_RELATED' ? 'reps' : 'segs';

  return (
    <InputContainer>
      <InputSurroundings>
        <Input
          min={SET_CONDITIONAL_MIN}
          max={SET_CONDITIONAL_MAX}
          maxLength={3}
          value={value}
          onFocus={(event) => event.target.select()}
          onChange={(event) => onChange(event)}
        />
      </InputSurroundings>
      <SecondsText>{SET_CONDITIONAL_LABEL}</SecondsText>
    </InputContainer>
  );
};

export default TimeInput;
