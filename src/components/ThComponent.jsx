function ThComponent(props) {
  return (
    <th
      className={`text-[12px] uppercase tracking-wide text-sm font-medium py-3 px-4 text-left ${props.moreClasses}`}
    >
      {props.name}
    </th>
  );
}

export default ThComponent;
