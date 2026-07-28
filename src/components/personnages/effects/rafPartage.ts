/**
 * Boucle d'animation partagée.
 *
 * Chaque composant animé lançait sa propre boucle requestAnimationFrame :
 * sur la page d'Ysolde, cela faisait quatre boucles concurrentes (trois
 * canvas de lianes, un canvas de visiteurs). Chacune réveille le
 * compositeur indépendamment, et sur un GPU intégré la page saccade.
 *
 * Ici, une seule boucle pour toute la page. Les composants s'y abonnent et
 * reçoivent le delta de temps. La boucle s'arrête d'elle-même quand plus
 * personne n'est abonné, et se met en pause quand l'onglet passe en
 * arrière-plan.
 */

type Abonne = (deltaMs: number, horlogeMs: number) => void;

const abonnes = new Set<Abonne>();

let image = 0;
let precedent = 0;
let horloge = 0;
let enPause = false;
let ecouteurPose = false;

function boucle(horodatage: number) {
  if (!enPause) {
    const delta = precedent === 0 ? 16 : Math.min(48, horodatage - precedent);
    precedent = horodatage;
    horloge += delta;

    for (const abonne of abonnes) {
      abonne(delta, horloge);
    }
  }

  image = abonnes.size > 0 ? requestAnimationFrame(boucle) : 0;
}

function surVisibilite() {
  enPause = document.hidden;
  if (!enPause) precedent = 0;
}

export function abonnerAuRaf(abonne: Abonne): () => void {
  abonnes.add(abonne);

  if (!ecouteurPose && typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', surVisibilite);
    ecouteurPose = true;
  }

  if (image === 0) {
    precedent = 0;
    image = requestAnimationFrame(boucle);
  }

  return () => {
    abonnes.delete(abonne);
    if (abonnes.size === 0 && image !== 0) {
      cancelAnimationFrame(image);
      image = 0;
      precedent = 0;
    }
  };
}
