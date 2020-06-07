import React, { FunctionComponent, useState } from 'react';

interface Props {
  onChange: (name: string) => void,
}


const NameControls: FunctionComponent<Props> = ({
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const onSubmit= (e: React.FormEvent) => {
    e.preventDefault();
    onChange(name);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Your name" value={name} onChange={(e) => {setName(e.target.value)}} />
      <button type="submit">Play</button>
    </form>
  );
};

export default NameControls;
