function ThComponent(props) {
  return (
    <th
      className={`text-sm uppercase tracking-wide  font-medium py-3 px-4 text-left ${props.moreClasses}`}
    >
      {props.name}
    </th>
  );
}

export default ThComponent;
