export function SectionHead({ id, eyebrow, title, lead }: { id: string; eyebrow: string; title: string; lead?: string }) {
  return (
    <div className={`section-head${lead ? '' : ' section-head--solo'}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="h2">{title}</h2>
      </div>
      {lead && <p className="lead section-head__lead">{lead}</p>}
    </div>
  );
}
