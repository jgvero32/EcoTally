const UsageSetter = ({ usage, setUsage }) => {
  return (
    <input
      type="number"
      value={usage}
      onChange={(e) => setUsage(parseInt(e.target.value))}
    />
  );
};
export default UsageSetter;
