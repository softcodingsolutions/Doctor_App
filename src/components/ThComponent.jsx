function ThComponent(props) {
  return (
    <th
      className={`text-xs uppercase tracking-wide  font-medium py-2 px-4 text-left ${props.moreClasses}`}
    >
      {props.name}
    </th>
  );
}

export default ThComponent;
