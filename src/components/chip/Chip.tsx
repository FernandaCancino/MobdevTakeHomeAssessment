import { typeColors } from "../../utils/typeColors";

export const Chip = ({ text }: { text: string }) => {
  const colorClass = typeColors[text] || 'bg-gray-400';
  return (
    <div
      className={`flex flex-col items-start p-0.5 px-2 ${colorClass} rounded-[10px] w-[55px] h-[20px] sm:w-[70px] sm:h-[25px]`}>
      <span
        className="font-poppins font-bold text-[10px] leading-[16px] text-white flex items-center justify-center w-full h-full">
        {text}
      </span>
    </div>
  )
};