import Link from 'next/link';

type SectionPlaceholderProps = {
  title: string;
  description: string;
  nextStep: string;
};

export function SectionPlaceholder({ title, description, nextStep }: SectionPlaceholderProps) {
  return (
    <main className="placeholder-page">
      <div className="placeholder-panel">
        <p className="eyebrow">Section préparée</p>
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="placeholder-next">
          <strong>Prochaine pièce à emboîter :</strong>
          <span>{nextStep}</span>
        </div>
        <Link className="ghost-link" href="/">← Revenir au portail</Link>
      </div>
    </main>
  );
}
