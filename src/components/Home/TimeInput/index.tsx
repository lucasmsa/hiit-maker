import React from 'react';
import { Input, InputContainer, InputSurroundings, SecondsText } from './styles';

interface TimeInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput = ({ value, onChange }: TimeInputProps) => {
  return (
    <InputContainer>
      <InputSurroundings>
        <Input
          min={0}
          max={999}
          maxLength={3}
          value={value}
          onFocus={(event) => event.target.select()}
          onChange={(event) => onChange(event)}
        />
      </InputSurroundings>
      <SecondsText>seg</SecondsText>
    </InputContainer>
  );
};

export default TimeInput;
