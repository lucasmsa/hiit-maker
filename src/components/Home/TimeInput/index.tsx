import React from 'react';
import { Input, InputContainer, InputSurroundings, SecondsText } from './styles';

interface TimeInputProps {
  value: number;
  label?: 'SET_RELATED' | 'EXERCISE_RELATED';
  onFocusOut: (event: any) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ value, onChange, onFocusOut, label }: TimeInputProps) => {
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
          onKeyPress={(event) => (event.key === 'Enter' ? onFocusOut(event) : undefined)}
          onBlur={label !== 'SET_RELATED' ? onFocusOut : undefined}
          onChange={(event) => {
            onChange(event);
            label === 'SET_RELATED' && onFocusOut(event);
          }}
        />
      </InputSurroundings>
      <SecondsText>{SET_CONDITIONAL_LABEL}</SecondsText>
    </InputContainer>
  );
};

export default TimeInput;
