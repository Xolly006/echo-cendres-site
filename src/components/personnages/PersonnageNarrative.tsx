import Link from 'next/link';
import type { AnchorHTMLAttributes, ComponentType, HTMLAttributes, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import styles from './PersonnageNarrative.module.css';

type PersonnageNarrativeProps = {
  Content: ComponentType<{ components?: MDXComponents }> | null;
};

type TextElementProps = HTMLAttributes<HTMLElement> & {
  children?: ReactNode;
};

function HeadingOne({ children, ...props }: TextElementProps) {
  return (
    <h1 className={styles.headingOne} {...props}>
      {children}
    </h1>
  );
}

function HeadingTwo({ children, ...props }: TextElementProps) {
  return (
    <h2 className={styles.headingTwo} {...props}>
      {children}
    </h2>
  );
}

function HeadingThree({ children, ...props }: TextElementProps) {
  return (
    <h3 className={styles.headingThree} {...props}>
      {children}
    </h3>
  );
}

function Paragraph({ children, ...props }: TextElementProps) {
  return (
    <p className={styles.paragraph} {...props}>
      {children}
    </p>
  );
}

function Blockquote({ children, ...props }: TextElementProps) {
  return (
    <blockquote className={styles.blockquote} {...props}>
      {children}
    </blockquote>
  );
}

function UnorderedList({ children, ...props }: TextElementProps) {
  return (
    <ul className={styles.list} {...props}>
      {children}
    </ul>
  );
}

function OrderedList({ children, ...props }: TextElementProps) {
  return (
    <ol className={styles.list} {...props}>
      {children}
    </ol>
  );
}

function ListItem({ children, ...props }: TextElementProps) {
  return (
    <li className={styles.listItem} {...props}>
      {children}
    </li>
  );
}

function Rule(props: HTMLAttributes<HTMLHRElement>) {
  return <hr className={styles.rule} {...props} />;
}

function NarrativeLink({ href = '', children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const normalizedHref = href.trim().toLowerCase();
  const isHashLink = href.startsWith('#');
  const isInternal = href.startsWith('/');
  const isExternal = normalizedHref.startsWith('https://') || normalizedHref.startsWith('http://');

  if (!isHashLink && !isInternal && !isExternal) {
    throw new Error(`Lien MDX non autorisé dans un récit personnage: "${href}".`);
  }

  if (isHashLink) {
    return (
      <a className={styles.link} href={href} {...props}>
        {children}
      </a>
    );
  }

  if (isInternal) {
    return (
      <Link className={styles.link} href={href} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a className={styles.link} href={href} rel="noreferrer" target="_blank" {...props}>
      {children}
    </a>
  );
}

const narrativeComponents = {
  h1: HeadingOne,
  h2: HeadingTwo,
  h3: HeadingThree,
  p: Paragraph,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: Rule,
  a: NarrativeLink,
} satisfies MDXComponents;

export function PersonnageNarrative({ Content }: PersonnageNarrativeProps) {
  if (!Content) return null;

  return (
    <section className={styles.narrative} aria-labelledby="personnage-narrative-title">
      <p className={styles.kicker}>Récit</p>
      <div id="personnage-narrative-title" className={styles.content}>
        <Content components={narrativeComponents} />
      </div>
    </section>
  );
}
