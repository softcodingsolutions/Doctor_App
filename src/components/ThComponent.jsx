function ThComponent(props) {
  return (
    <th
      className={`text-xs uppercase tracking-wide  font-semibold py-3 px-1 text-left ${props.moreClasses}`}
    >
      {props.name}
    </th>
  );
}

export default ThComponent;
