import styled from "styled-components";
import { useState } from "react";

const Label = styled.label`
  cursor: pointer;
`;

const Switch = styled.div`
  position: relative;
  width: 42px;
  height: 26px;
  background: #b3b3b3;
  border-radius: 15px;
  transition: 300ms all;

  &:before {
    transition: 300ms all;
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 15px;
    top: 50%;
    left: 4px;
    background: ${({ theme }) => theme.colors.white};
    transform: translate(0, -50%);
  }
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + ${Switch} {
    background: #4cbb17;

    &:before {
      transform: translate(16px, -50%);
    }
  }
`;

const ToggleSwitch = ({ onToggle, initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    onToggle(e.target.checked);
  };

  return (
    <Label>
      <Input checked={checked} type="checkbox" onChange={handleChange} />
      <Switch />
    </Label>
  );
};

export default function ToggleButton({ onToggle, initialChecked = false }) {
  return (
    <div>
      <ToggleSwitch onToggle={onToggle} initialChecked={initialChecked} />
    </div>
  );
}
