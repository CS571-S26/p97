export default function PageHeader(props) {
  return (
    <section className="page-header" aria-labelledby={props.headingId}>
      <h1 id={props.headingId}>{props.title}</h1>

      {props.description && <p>{props.description}</p>}
    </section>
  );
}
