export default function Card({backgroundColor, children}) {
  return (
    <div className={`${backgroundColor} flex flex-col p-4 py-30 m-5 flex-1/3 shadow-md justify-center items-center font-bold`}>
        {children}
    </div>
  );
}
