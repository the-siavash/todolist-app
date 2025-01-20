function SortTodos({ sortedBy, onSort }) {
  return (
    <select
      className="select"
      value={sortedBy}
      onChange={(event) => onSort(event.target.value)}
    >
      <option value="newest">Newest</option>
      <option value="oldest">Oldest</option>
    </select>
  );
}
export default SortTodos;
