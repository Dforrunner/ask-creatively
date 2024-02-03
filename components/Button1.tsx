interface Props {
  text: string;
  [key: string]: any;
}
export default function Button1({ text, ...rest }: Props) {
  if (!text) return null;
  return (
    <div
      className={`px-5 py-2 border-[1px] border-[rgb(100,100,100)] rounded flex justify-center items-center
                  hover:bg-[rgba(0,0,0,0.3)] cursor-pointer bg-[lightgray]
            `}
      {...rest}
    >
      {text}
    </div>
  );
}
