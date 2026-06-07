import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Personnage } from '@/types/personnage';

type RawPersonnage = Omit<Personnage, 'slug' | 'hasNarrative'> & {
  slug?: never;
  hasNarrative?: never;
};

const personnagesDirectory = path.join(process.cwd(), 'src/content/personnages');

function resolvePersonnagePath(slug: string, fileName: string): string {
  const resolvedPath = path.resolve(personnagesDirectory, slug, fileName);
  const safeRoot = path.resolve(personnagesDirectory) + path.sep;

  if (!resolvedPath.startsWith(safeRoot)) {
    throw new Error(`Chemin de personnage invalide pour le slug "${slug}".`);
  }

  return resolvedPath;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRequiredString(value: unknown, fieldName: string, fileName: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "${fieldName}" est obligatoire.`);
  }

  return value;
}

function readOptionalString(value: unknown, fieldName: string, fileName: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "${fieldName}" doit être une chaîne.`);
  }

  return value;
}

function readOptionalTags(value: unknown, fileName: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((tag) => typeof tag !== 'string')) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "tags" doit être une liste de chaînes.`);
  }

  return value;
}

function readOptionalStringList(value: unknown, fieldName: string, fileName: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "${fieldName}" doit être une liste de chaînes.`);
  }

  return value;
}

function readOptionalIdentity(value: unknown, fileName: string): Personnage['identity'] {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "identity" doit être un objet.`);
  }

  return {
    aliases: readOptionalStringList(value.aliases, 'identity.aliases', fileName),
    nature: readOptionalString(value.nature, 'identity.nature', fileName),
    origin: readOptionalString(value.origin, 'identity.origin', fileName),
    status: readOptionalString(value.status, 'identity.status', fileName),
    era: readOptionalString(value.era, 'identity.era', fileName),
  };
}

function readOptionalMagic(value: unknown, fileName: string): Personnage['magic'] {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "magic" doit être un objet.`);
  }

  return {
    concept: readOptionalString(value.concept, 'magic.concept', fileName),
    domain: readOptionalString(value.domain, 'magic.domain', fileName),
    artifact: readOptionalString(value.artifact, 'magic.artifact', fileName),
    anchor: readOptionalString(value.anchor, 'magic.anchor', fileName),
    abilities: readOptionalStringList(value.abilities, 'magic.abilities', fileName),
    limits: readOptionalStringList(value.limits, 'magic.limits', fileName),
  };
}

function readOptionalLinks(value: unknown, fileName: string): Personnage['links'] {
  if (value === undefined) return undefined;
  if (!isRecord(value)) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "links" doit être un objet.`);
  }

  return {
    characters: readOptionalStringList(value.characters, 'links.characters', fileName),
    factions: readOptionalStringList(value.factions, 'links.factions', fileName),
    events: readOptionalStringList(value.events, 'links.events', fileName),
    places: readOptionalStringList(value.places, 'links.places', fileName),
    artifacts: readOptionalStringList(value.artifacts, 'links.artifacts', fileName),
    concepts: readOptionalStringList(value.concepts, 'links.concepts', fileName),
  };
}

function readPublicationStatus(value: unknown, fileName: string): Personnage['publicationStatus'] {
  if (value !== 'draft' && value !== 'published') {
    throw new Error(
      `Personnage invalide dans ${fileName}: le champ "publicationStatus" doit valoir "draft" ou "published".`,
    );
  }

  return value;
}

function parsePersonnage(rawValue: unknown, fileName: string): RawPersonnage {
  if (!isRecord(rawValue)) {
    throw new Error(`Personnage invalide dans ${fileName}: le contenu JSON doit être un objet.`);
  }

  if ('slug' in rawValue) {
    throw new Error(`Personnage invalide dans ${fileName}: le slug est dérivé du nom du fichier JSON.`);
  }

  if ('hasNarrative' in rawValue) {
    throw new Error(`Personnage invalide dans ${fileName}: le champ "hasNarrative" est calculé automatiquement.`);
  }

  return {
    nom: readRequiredString(rawValue.nom, 'nom', fileName),
    resumeCourt: readRequiredString(rawValue.resumeCourt, 'resumeCourt', fileName),
    role: readOptionalString(rawValue.role, 'role', fileName),
    tags: readOptionalTags(rawValue.tags, fileName),
    themeKey: readOptionalString(rawValue.themeKey, 'themeKey', fileName),
    publicationStatus: readPublicationStatus(rawValue.publicationStatus, fileName),
    identity: readOptionalIdentity(rawValue.identity, fileName),
    magic: readOptionalMagic(rawValue.magic, fileName),
    links: readOptionalLinks(rawValue.links, fileName),
  };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readPersonnageDirectory(directoryName: string): Promise<Personnage> {
  const directoryPath = path.join(personnagesDirectory, directoryName);
  const filePath = path.join(directoryPath, 'data.json');
  const narrativePath = path.join(directoryPath, 'histoire.mdx');
  const slug = directoryName;
  let fileContent = '';

  try {
    fileContent = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`Personnage invalide dans ${directoryName}: le fichier "data.json" est obligatoire.`);
    }

    throw error;
  }

  try {
    const parsed = parsePersonnage(JSON.parse(fileContent), `${directoryName}/data.json`);

    return {
      slug,
      hasNarrative: await fileExists(narrativePath),
      ...parsed,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`JSON invalide dans ${directoryName}/data.json: ${error.message}`);
    }

    throw error;
  }
}

async function readAllPersonnages(): Promise<Personnage[]> {
  const entries = await readdir(personnagesDirectory, { withFileTypes: true });
  const directoryNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const personnages = await Promise.all(directoryNames.map((directoryName) => readPersonnageDirectory(directoryName)));

  return personnages.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}

export async function getAllPersonnages(): Promise<Personnage[]> {
  const personnages = await readAllPersonnages();

  return personnages.filter((personnage) => personnage.publicationStatus === 'published');
}

export async function getPublishedPersonnageBySlug(slug: string): Promise<Personnage | null> {
  const personnages = await readAllPersonnages();
  const personnage = personnages.find((entry) => entry.slug === slug);

  if (!personnage || personnage.publicationStatus !== 'published') {
    return null;
  }

  return personnage;
}

export async function getPersonnageNarrativeSource(slug: string): Promise<string | null> {
  const narrativePath = resolvePersonnagePath(slug, 'histoire.mdx');

  try {
    return await readFile(narrativePath, 'utf8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }

    throw new Error(`Impossible de lire le récit du personnage "${slug}".`);
  }
}

export async function validatePersonnageNarrativeSource(slug: string): Promise<boolean> {
  const narrativeSource = await getPersonnageNarrativeSource(slug);

  if (!narrativeSource) {
    return false;
  }

  const forbiddenPatterns = [
    { pattern: /^\s*import\s/m, label: 'imports MDX' },
    { pattern: /^\s*export\s/m, label: 'exports MDX' },
    { pattern: /<\/?[A-Za-z][A-Za-z0-9-]*(\s|>|\/)/, label: 'HTML ou JSX brut' },
    { pattern: /{[^}]*}/, label: 'expressions JavaScript' },
    { pattern: /\]\(\s*(?:javascript|data|file):/i, label: 'liens à protocole dangereux' },
    { pattern: /<\s*(?:javascript|data|file):/i, label: 'autoliens à protocole dangereux' },
  ];

  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(narrativeSource)) {
      throw new Error(`Récit MDX non autorisé pour "${slug}": ${label} désactivés dans cette première version.`);
    }
  }

  return true;
}
