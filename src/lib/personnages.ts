import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import type { Personnage } from '@/types/personnage';

type RawPersonnage = Omit<Personnage, 'slug'> & {
  slug?: never;
};

const personnagesDirectory = path.join(process.cwd(), 'src/content/personnages');

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

  return {
    nom: readRequiredString(rawValue.nom, 'nom', fileName),
    resumeCourt: readRequiredString(rawValue.resumeCourt, 'resumeCourt', fileName),
    role: readOptionalString(rawValue.role, 'role', fileName),
    tags: readOptionalTags(rawValue.tags, fileName),
    themeKey: readOptionalString(rawValue.themeKey, 'themeKey', fileName),
    publicationStatus: readPublicationStatus(rawValue.publicationStatus, fileName),
  };
}

async function readPersonnageFile(fileName: string): Promise<Personnage> {
  const filePath = path.join(personnagesDirectory, fileName);
  const slug = path.basename(fileName, '.json');
  const fileContent = await readFile(filePath, 'utf8');

  try {
    const parsed = parsePersonnage(JSON.parse(fileContent), fileName);

    return {
      slug,
      ...parsed,
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`JSON invalide dans ${fileName}: ${error.message}`);
    }

    throw error;
  }
}

export async function getAllPersonnages(): Promise<Personnage[]> {
  const fileNames = await readdir(personnagesDirectory);
  const jsonFileNames = fileNames.filter((fileName) => fileName.endsWith('.json'));
  const personnages = await Promise.all(jsonFileNames.map((fileName) => readPersonnageFile(fileName)));

  return personnages.sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}
