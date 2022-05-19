function Paper({ title, children }) {
  return (
    <div className="paper-container">
      <h2>{title}</h2>
      <div className="paper-content">{children}</div>
    </div>
  );
}
export default Paper;
