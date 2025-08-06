import { FC } from "react";

interface Props {
  handle: (e: boolean) => void;
  turn: boolean;
  className?: string;
}

const TurnComponent: FC<Props> = ({ handle, turn, className }) => {
  const handleChange = () => {
    handle(!turn);
  };

  return (
    <div
      className={`toggle toggle-success ${turn ? "on" : "off"} ${className}`}
      onClick={handleChange}
    >
      <span></span>
    </div>
  );
};

export default TurnComponent;
