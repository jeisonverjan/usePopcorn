export function NumResults({ numPages }) {
  return (
    <p className="num-results">
      Found <strong>{numPages * 10}</strong> results
    </p>
  );
}
