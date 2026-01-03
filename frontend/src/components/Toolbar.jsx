const Toolbar = ({ color, setColor, size, setSize, clearBoard }) => {
  return (
    <div className="toolbar">
      <label>
        Color
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>

      <label>
        Size
        <input
          type="range"
          min="1"
          max="10"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </label>

      <button onClick={clearBoard}>Clear</button>
    </div>
  );
};

export default Toolbar;
