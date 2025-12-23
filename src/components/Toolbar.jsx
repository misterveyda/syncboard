const Toolbar = ({ color, setColor, brushSize, setBrushSize }) => {
  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "0 16px",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={{ marginLeft: "8px" }}
        />
      </label>

      <label>
        Brush Size:
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          style={{ marginLeft: "8px" }}
        />
      </label>

      <span>{brushSize}px</span>
    </div>
  );
};

export default Toolbar;
