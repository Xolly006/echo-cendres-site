import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Faction, FactionMembre, MembreStatut } from '@/types/faction';
import { getAllPersonnagesForPreview } from '@/lib/personnages';

type RawFaction = Omit<Faction, 'slug'> & {
  slug?: never;
};

const factionsDirectory = path.join(process.cwd(), 'src/content/factions');

function resolveFactionPath(slug: string, fileName: string): string {
  const resolvedPath = path.resolve(factionsDirectory, slug, fileName);
  const safeRoot = path.resolve(factionsDirectory) + path.sep;

  if (!resolvedPath.startsWith(safeRoot)) {
    throw new Error(`Chemin de faction invalide pour le slug "${slug}".`);
  }

  return resolvedPath;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readRequiredString(value: unknown, fieldName: string, fileName: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Faction invalide dans ${fileName}: le champ "${fieldName}" est obligatoire.`);
  }

  return value;
}

function readOptionalString(value: unknown, fieldName: string, fileName: string): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') {
    throw new Error(`Faction invalide dans ${fileName}: le champ "${fieldName}" doit être une chaîne.`);
  }

  return value;
}

function readOptionalStringList(value: unknown, fieldName: string, fileName: string): string[] | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "${fieldName}" doit être une liste de chaînes.`);
  }

  return value;
}

const factionStatuses = ['active', 'eteinte', 'brisee', 'dormante'] as const;
const factionEres = ['primitive', 'age-d-or', 'age-de-fer', 'actuelle', 'aube'] as const;
const membreStatuts: MembreStatut[] = ['en-poste', 'mort', 'ecarte', 'disparu', 'fondateur'];

function readFactionStatus(value: unknown, fileName: string): Faction['statut'] {
  if (typeof value !== 'string' || !factionStatuses.includes(value as (typeof factionStatuses)[number])) {
    throw new Error(
      `Faction invalide dans ${fileName}: le champ "statut" doit valoir l'une de ${factionStatuses.join(', ')}.`,
    );
  }

  return value as Faction['statut'];
}

function readFactionEre(value: unknown, fileName: string): Faction['ere'] {
  if (typeof value !== 'string' || !factionEres.includes(value as (typeof factionEres)[number])) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "ere" doit valoir l'une de ${factionEres.join(', ')}.`);
  }

  return value as Faction['ere'];
}

function readPublicationStatus(value: unknown, fileName: string): Faction['publicationStatus'] {
  if (value !== 'draft' && value !== 'published') {
    throw new Error(
      `Faction invalide dans ${fileName}: le champ "publicationStatus" doit valoir "draft" ou "published".`,
    );
  }

  return value;
}

function readMembreStatut(value: unknown, index: number, fileName: string): MembreStatut {
  if (typeof value !== 'string' || !membreStatuts.includes(value as MembreStatut)) {
    throw new Error(
      `Faction invalide dans ${fileName}: le membre #${index} a un "statut" invalide (${membreStatuts.join(', ')}).`,
    );
  }

  return value as MembreStatut;
}

function readMembre(value: unknown, index: number, fileName: string): FactionMembre {
  if (!isRecord(value)) {
    throw new Error(`Faction invalide dans ${fileName}: le membre #${index} doit être un objet.`);
  }

  return {
    nom: readRequiredString(value.nom, `membres[${index}].nom`, fileName),
    titre: readOptionalString(value.titre, `membres[${index}].titre`, fileName),
    concept: readOptionalString(value.concept, `membres[${index}].concept`, fileName),
    statut: readMembreStatut(value.statut, index, fileName),
    personnageSlug: readOptionalString(value.personnageSlug, `membres[${index}].personnageSlug`, fileName),
    remplace: readOptionalString(value.remplace, `membres[${index}].remplace`, fileName),
    remplacePar: readOptionalString(value.remplacePar, `membres[${index}].remplacePar`, fileName),
    rang: readOptionalString(value.rang, `membres[${index}].rang`, fileName),
    notes: readOptionalString(value.notes, `membres[${index}].notes`, fileName),
  };
}

function readMembres(value: unknown, fileName: string): FactionMembre[] {
  if (!Array.isArray(value)) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "membres" doit être une liste.`);
  }

  if (value.length === 0) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "membres" ne doit pas être vide.`);
  }

  return value.map((entry, index) => readMembre(entry, index, fileName));
}

function readOptionalBranches(value: unknown, fileName: string): Faction['branches'] {
  if (value === undefined) return undefined;
  if (!Array.isArray(value)) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "branches" doit être une liste.`);
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Faction invalide dans ${fileName}: la branche #${index} doit être un objet.`);
    }

    return {
      nom: readRequiredString(entry.nom, `branches[${index}].nom`, fileName),
      role: readRequiredString(entry.role, `branches[${index}].role`, fileName),
      commandePar: readOptionalStringList(entry.commandePar, `branches[${index}].commandePar`, fileName),
    };
  });
}

function readOptionalMecanique(value: unknown, fileName: string): Faction['mecanique'] {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "mecanique" doit être un objet.`);
  }

  return {
    nom: readRequiredString(value.nom, 'mecanique.nom', fileName),
    principe: readRequiredString(value.principe, 'mecanique.principe', fileName),
  };
}

function readOptionalChronologie(value: unknown, fileName: string): Faction['chronologie'] {
  if (value === undefined || value === null) return undefined;
  if (!isRecord(value)) {
    throw new Error(`Faction invalide dans ${fileName}: le champ "chronologie" doit être un objet.`);
  }

  const jalonsValue = value.jalons;
  let jalons: { quand: string; quoi: string }[] | undefined;

  if (jalonsValue !== undefined) {
    if (!Array.isArray(jalonsValue)) {
      throw new Error(`Faction invalide dans ${fileName}: le champ "chronologie.jalons" doit être une liste.`);
    }

    jalons = jalonsValue.map((entry, index) => {
      if (!isRecord(entry)) {
        throw new Error(`Faction invalide dans ${fileName}: le jalon #${index} doit être un objet.`);
      }

      return {
        quand: readRequiredString(entry.quand, `chronologie.jalons[${index}].quand`, fileName),
        quoi: readRequiredString(entry.quoi, `chronologie.jalons[${index}].quoi`, fileName),
      };
    });
  }

  return {
    fondation: readOptionalString(value.fondation, 'chronologie.fondation', fileName),
    dissolution: readOptionalString(value.dissolution, 'chronologie.dissolution', fileName),
    jalons,
  };
}

function parseFaction(rawValue: unknown, fileName: string): RawFaction {
  if (!isRecord(rawValue)) {
    throw new Error(`Faction invalide dans ${fileName}: le contenu JSON doit être un objet.`);
  }

  if ('slug' in rawValue) {
    throw new Error(`Faction invalide dans ${fileName}: le slug est dérivé du nom du dossier.`);
  }

  return {
    nom: readRequiredString(rawValue.nom, 'nom', fileName),
    epithete: readOptionalString(rawValue.epithete, 'epithete', fileName),
    ere: readFactionEre(rawValue.ere, fileName),
    statut: readFactionStatus(rawValue.statut, fileName),
    resume: readRequiredString(rawValue.resume, 'resume', fileName),
    themeKey: readRequiredString(rawValue.themeKey, 'themeKey', fileName),
    composition: readOptionalString(rawValue.composition, 'composition', fileName),
    publicationStatus: readPublicationStatus(rawValue.publicationStatus, fileName),
    membres: readMembres(rawValue.membres, fileName),
    branches: readOptionalBranches(rawValue.branches, fileName),
    mecanique: readOptionalMecanique(rawValue.mecanique, fileName),
    chronologie: readOptionalChronologie(rawValue.chronologie, fileName),
    unrecorded: readOptionalStringList(rawValue.unrecorded, 'unrecorded', fileName),
  };
}

function validateSuccessionChain(faction: Faction, fileName: string): void {
  const noms = new Set(faction.membres.map((membre) => membre.nom));

  for (const membre of faction.membres) {
    if (membre.remplace !== undefined && !noms.has(membre.remplace)) {
      throw new Error(
        `Faction invalide dans ${fileName}: "${membre.nom}".remplace référence "${membre.remplace}", absent de "membres".`,
      );
    }

    if (membre.remplacePar !== undefined && !noms.has(membre.remplacePar)) {
      throw new Error(
        `Faction invalide dans ${fileName}: "${membre.nom}".remplacePar référence "${membre.remplacePar}", absent de "membres".`,
      );
    }
  }
}

async function validatePersonnageSlugs(faction: Faction, fileName: string): Promise<void> {
  const personnages = await getAllPersonnagesForPreview();
  const personnageSlugs = new Set(personnages.map((personnage) => personnage.slug));

  for (const membre of faction.membres) {
    if (membre.personnageSlug !== undefined && !personnageSlugs.has(membre.personnageSlug)) {
      throw new Error(
        `Faction invalide dans ${fileName}: "${membre.nom}".personnageSlug "${membre.personnageSlug}" ne correspond à aucune fiche personnage.`,
      );
    }
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readFactionDirectory(directoryName: string): Promise<Faction> {
  const directoryPath = path.join(factionsDirectory, directoryName);
  const filePath = path.join(directoryPath, 'data.json');
  const slug = directoryName;
  let fileContent = '';

  try {
    fileContent = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`Faction invalide dans ${directoryName}: le fichier "data.json" est obligatoire.`);
    }

    throw error;
  }

  let faction: Faction;

  try {
    const parsed = parseFaction(JSON.parse(fileContent), `${directoryName}/data.json`);
    faction = { slug, ...parsed };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`JSON invalide dans ${directoryName}/data.json: ${error.message}`);
    }

    throw error;
  }

  const fileName = `${directoryName}/data.json`;
  validateSuccessionChain(faction, fileName);
  await validatePersonnageSlugs(faction, fileName);

  return faction;
}

async function readAllFactions(): Promise<Faction[]> {
  const entries = await readdir(factionsDirectory, { withFileTypes: true });
  const directoryNames = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  const factions = await Promise.all(directoryNames.map((directoryName) => readFactionDirectory(directoryName)));

  return factions.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}

export async function getAllFactions(): Promise<Faction[]> {
  const factions = await readAllFactions();

  return factions.filter((faction) => faction.publicationStatus === 'published');
}

export async function getAllFactionsForPreview(): Promise<Faction[]> {
  return readAllFactions();
}

export async function getPublishedFactionBySlug(slug: string): Promise<Faction | null> {
  const factions = await readAllFactions();
  const faction = factions.find((entry) => entry.slug === slug);

  if (!faction || faction.publicationStatus !== 'published') {
    return null;
  }

  return faction;
}

export async function getFactionForPreviewBySlug(slug: string): Promise<Faction | null> {
  const factions = await readAllFactions();

  return factions.find((entry) => entry.slug === slug) ?? null;
}

export async function getFactionNarrativeSource(slug: string): Promise<string | null> {
  const narrativePath = resolveFactionPath(slug, 'histoire.mdx');

  try {
    return await readFile(narrativePath, 'utf8');
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null;
    }

    throw new Error(`Impossible de lire le récit de la faction "${slug}".`);
  }
}

export async function validateFactionNarrativeSource(slug: string): Promise<boolean> {
  const narrativeSource = await getFactionNarrativeSource(slug);

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
      throw new Error(`Récit MDX non autorisé pour la faction "${slug}": ${label} désactivés dans cette première version.`);
    }
  }

  return true;
}

export async function hasFactionNarrative(slug: string): Promise<boolean> {
  return fileExists(resolveFactionPath(slug, 'histoire.mdx'));
}
