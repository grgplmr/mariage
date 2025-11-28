// Générateur de pages villes pour Studio B07
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..', 'villes');

const cities = [
  { name: 'Gironde', slug: 'gironde', nearby: ['Haute Gironde', 'Blaye', 'Jonzac'], note: 'Territoire large mêlant Bordeaux, estuaire et vignes.' },
  { name: 'Haute Gironde', slug: 'haute-gironde', nearby: ['Gironde', 'Blaye', 'Saint-André-de-Cubzac'], note: 'Entre estuaire et coteaux, avec de nombreux villages viticoles.' },
  { name: 'Saint-André-de-Cubzac', slug: 'saint-andre-de-cubzac', nearby: ['Cubzac-les-Ponts', 'Bourg', 'Saint-Gervais'], note: 'Ville dynamique proche des rives de la Dordogne.' },
  { name: 'Blaye', slug: 'blaye', nearby: ['Bourg', 'Cars', 'Saint-Martin-Lacaussade'], note: 'Connue pour sa citadelle et les panoramas sur l’estuaire.' },
  { name: 'Val de Virvée', slug: 'val-de-virvee', nearby: ['Peujard', 'Saint-Gervais', 'Saint-André-de-Cubzac'], note: 'Communauté de communes entourée de forêts et de cours d’eau.' },
  { name: 'Saint-Savin', slug: 'saint-savin', nearby: ['Reignac', 'Laruscade', 'Saint-Mariens'], note: 'Cadre naturel boisé et vignobles en lisière de village.' },
  { name: 'Saint-Ciers-sur-Gironde', slug: 'saint-ciers-sur-gironde', nearby: ['Étauliers', 'Braud-et-Saint-Louis', 'Val-de-Livenne'], note: 'Entre estuaire, marais doux et petites routes champêtres.' },
  { name: 'Laruscade', slug: 'laruscade', nearby: ['Saint-Yzan-de-Soudiac', 'Cézac', 'Bussac-Forêt'], note: 'Village entouré de pins et de sentiers calmes.' },
  { name: 'Cézac', slug: 'cezac', nearby: ['Cavignac', 'Laruscade', 'Saint-Mariens'], note: 'Adresse du studio, entre vignes et hameaux paisibles.' },
  { name: 'Cubzac-les-Ponts', slug: 'cubzac-les-ponts', nearby: ['Saint-André-de-Cubzac', 'Virsac', 'Bourg'], note: 'Bord de Dordogne et vues sur les arches historiques.' },
  { name: 'Saint-Yzan-de-Soudiac', slug: 'saint-yzan-de-soudiac', nearby: ['Laruscade', 'Cavignac', 'Saint-Mariens'], note: 'Village ferroviaire avec des clairières lumineuses.' },
  { name: 'Cavignac', slug: 'cavignac', nearby: ['Cézac', 'Marsas', 'Cubnezais'], note: 'Carrefour pratique entouré de campagnes ouvertes.' },
  { name: 'Pugnac', slug: 'pugnac', nearby: ['Bourg', 'Prignac-et-Marcamps', 'Gauriaguet'], note: 'Entre coteaux et châteaux viticoles discrets.' },
  { name: 'Bourg', slug: 'bourg', nearby: ['Pugnac', 'Prignac-et-Marcamps', 'Tauriac'], note: 'Village en hauteur avec port, ruelles et vue sur l’estuaire.' },
  { name: 'Peujard', slug: 'peujard', nearby: ['Val de Virvée', 'Saint-Gervais', 'Gauriaguet'], note: 'Campagne paisible et belles allées de vignes.' },
  { name: 'Saint-Gervais', slug: 'saint-gervais', nearby: ['Peujard', 'Bourg', 'Virsac'], note: 'Entre coteaux, forêts et petites routes pour les photos de couple.' },
  { name: 'Saint-Christoly-de-Blaye', slug: 'saint-christoly-de-blaye', nearby: ['Berson', 'Blaye', 'Braud-et-Saint-Louis'], note: 'Ambiance rurale avec bâtiments de pierre claire.' },
  { name: 'Berson', slug: 'berson', nearby: ['Bourg', 'Blaye', 'Saint-Christoly-de-Blaye'], note: 'Plateaux viticoles et vues dégagées.' },
  { name: 'Cubnezais', slug: 'cubnezais', nearby: ['Cavignac', 'Saint-Mariens', 'Saint-Yzan-de-Soudiac'], note: 'Petites routes bordées d’arbres et champs ouverts.' },
  { name: 'Val-de-Livenne', slug: 'val-de-livenne', nearby: ['Saint-Ciers-sur-Gironde', 'Étauliers', 'Braud-et-Saint-Louis'], note: 'Paysage de l’estuaire avec villages calmes.' },
  { name: 'Saint-Mariens', slug: 'saint-mariens', nearby: ['Cézac', 'Saint-Yzan-de-Soudiac', 'Cubnezais'], note: 'Centre accueillant avec plusieurs parcs arborés.' },
  { name: 'Reignac', slug: 'reignac', nearby: ['Saint-Savin', 'Étauliers', 'Val-de-Livenne'], note: 'Entre forêt, vignes et petits lacs propices aux photos.' },
  { name: 'Étauliers', slug: 'etauliers', nearby: ['Saint-Ciers-sur-Gironde', 'Reignac', 'Braud-et-Saint-Louis'], note: 'Commune proche de l’estuaire avec de larges allées de platanes.' },
  { name: "Saint-Laurent-d'Arce", slug: 'saint-laurent-d-arce', nearby: ['Bourg', 'Saint-Gervais', 'Cubzac-les-Ponts'], note: 'Chais, vignes et demeures en pierre pour des photos authentiques.' },
  { name: 'Braud-et-Saint-Louis', slug: 'braud-et-saint-louis', nearby: ['Saint-Ciers-sur-Gironde', 'Val-de-Livenne', 'Étauliers'], note: 'Entre marais doux et forêts, avec des clairières lumineuses.' },
  { name: 'Gauriaguet', slug: 'gauriaguet', nearby: ['Peujard', 'Pugnac', 'Virsac'], note: 'Campagne douce et fermes rénovées.' },
  { name: 'Prignac-et-Marcamps', slug: 'prignac-et-marcamps', nearby: ['Bourg', 'Tauriac', 'Pugnac'], note: 'Portes romanes, pierres dorées et vignes en terrasse.' },
  { name: 'Tauriac', slug: 'tauriac', nearby: ['Bourg', 'Prignac-et-Marcamps', 'Gauriaguet'], note: 'Entre marais, vignes et chemins en bord d’estuaire.' },
  { name: 'Virsac', slug: 'virsac', nearby: ['Saint-Gervais', 'Cubzac-les-Ponts', 'Peujard'], note: 'Points hauts avec vue sur la Dordogne.' },
  { name: 'Cartelègue', slug: 'cartelegue', nearby: ['Saint-Ciers-sur-Gironde', 'Étauliers', 'Braud-et-Saint-Louis'], note: 'Lieux calmes près des bois et fermes familiales.' },
  { name: 'Marsas', slug: 'marsas', nearby: ['Cavignac', 'Cézac', 'Gauriaguet'], note: 'Prairies, murets de pierre et ambiance village.' },
  { name: 'Cars', slug: 'cars', nearby: ['Blaye', 'Bourg', 'Saint-Martin-Lacaussade'], note: 'Terrasses viticoles et vue sur l’estuaire.' },
  { name: 'Saint-Martin-Lacaussade', slug: 'saint-martin-lacaussade', nearby: ['Blaye', 'Cars', 'Berson'], note: 'Ruelles tranquilles et jardins cachés.' },
  { name: 'Saint-Paul', slug: 'saint-paul', nearby: ['Saint-Ciers-sur-Gironde', 'Reignac', 'Braud-et-Saint-Louis'], note: 'Espaces verts et petites églises en pierre.' },
  { name: 'Pons', slug: 'pons', nearby: ['Jonzac', 'Saint-Genis-de-Saintonge', 'Saint-Germain-de-Lusignan'], note: 'Ville historique avec donjon et ruelles médiévales.' },
  { name: 'Jonzac', slug: 'jonzac', nearby: ['Pons', 'Montendre', 'Saint-Genis-de-Saintonge'], note: 'Thermes, château et parcs ombragés pour les portraits.' },
  { name: 'Montendre', slug: 'montendre', nearby: ['Jonzac', 'Montlieu-la-Garde', 'Bussac-Forêt'], note: 'Lac, pins et bastide pour des photos nature.' },
  { name: 'Saint-Aigulin', slug: 'saint-aigulin', nearby: ['Montguyon', 'Chevanceaux', 'Cercoux'], note: 'Au bord de la Dronne avec de beaux ponts et gués.' },
  { name: 'Montguyon', slug: 'montguyon', nearby: ['Saint-Aigulin', 'Chevanceaux', 'Montlieu-la-Garde'], note: 'Château, vallons verts et chemins boisés.' },
  { name: 'Mirambeau', slug: 'mirambeau', nearby: ['Saint-Thomas-de-Conac', 'Saint-Genis-de-Saintonge', 'Pons'], note: 'Chais, parc du château et vues sur les vignes charentaises.' },
  { name: 'Saint-Germain-de-Lusignan', slug: 'saint-germain-de-lusignan', nearby: ['Pons', 'Jonzac', 'Saint-Genis-de-Saintonge'], note: 'Paysage vallonné avec moulins et chemins champêtres.' },
  { name: 'Saint-Genis-de-Saintonge', slug: 'saint-genis-de-saintonge', nearby: ['Pons', 'Jonzac', 'Mirambeau'], note: 'Centre de bourg vivant et halles en bois.' },
  { name: 'Cercoux', slug: 'cercoux', nearby: ['Saint-Aigulin', 'Montguyon', 'Bussac-Forêt'], note: 'Landes et clairières idéales pour les photos de couple.' },
  { name: 'Montlieu-la-Garde', slug: 'montlieu-la-garde', nearby: ['Montguyon', 'Cercoux', 'Bussac-Forêt'], note: 'Forêt de la Double et points de vue dégagés.' },
  { name: 'Chevanceaux', slug: 'chevanceaux', nearby: ['Montguyon', 'Saint-Aigulin', 'Bussac-Forêt'], note: 'Rivières, ponts et campagne douce.' },
  { name: 'Bussac-Forêt', slug: 'bussac-foret', nearby: ['Montlieu-la-Garde', 'Cercoux', 'Chevanceaux'], note: 'Grandes forêts de pins et clairières lumineuses.' },
  { name: 'Pérignac', slug: 'perignac', nearby: ['Jonzac', 'Pons', 'Mirambeau'], note: 'Vignes charentaises, églises romanes et villages en pierre.' },
];

function buildMetaDescription(city) {
  return `Photographe de mariage pas cher à ${city.name}. Reportages 1h, 2h ou 3h avec Studio B07 pour mairie, cérémonie et couple dans la région de ${city.name}.`;
}

function buildParagraphs(city) {
  const nearbyText = city.nearby.join(', ');
  return [
    `Studio B07 se déplace à ${city.name} pour réaliser des reportages photo courts et lumineux. Basé à Cézac, le studio intervient rapidement en Gironde et Haute Gironde pour capturer les moments essentiels sans faire exploser le budget. Les formules 1h, 2h ou 3h sont pensées pour suivre la mairie, une bénédiction, des portraits de couple et des photos de groupes.`,
    `À ${city.name}, chaque reportage est préparé à l'avance : nous listons les lieux clés, les horaires et les groupes à photographier. Cette organisation permet d'utiliser chaque minute de la formule choisie, qu'il s'agisse d'une cérémonie intime ou d'un passage éclair à la mairie.`,
    `Le jour J, nous arrivons en avance afin de repérer les lumières et d'imaginer des poses naturelles. Le style Studio B07 reste doux, lumineux et rassurant. Même avec un budget serré, vous obtenez des images nettes, des couleurs fidèles et des souvenirs prêts à être partagés avec vos proches.`,
    `Nous pouvons couvrir la sortie de mairie, l'échange des alliances, quelques portraits de couple dans un lieu significatif de ${city.name}, puis des photos de groupes dynamiques. ${city.note}`,
    `Nos tarifs sont transparents : un forfait 1h pour l'essentiel, un forfait 2h pour combiner mairie et mini séance de couple, et un forfait 3h pour ajouter un cocktail ou des photos de famille élargie. Chaque option inclut la retouche sobre des images et la livraison en haute définition.`,
    `Pour les couples de ${city.name}, nous proposons aussi des conseils pratiques : choisir un point de rendez-vous clair, prévoir dix minutes pour les photos de couple avant ou après la cérémonie, et impliquer un témoin pour rassembler les groupes. Ces détails fluidifient le reportage et garantissent un rendu cohérent.`,
    `En restant concentrés sur l'essentiel, nous évitons les temps morts et respectons votre budget. Le format reportage court est idéal pour les mariages civils, les célébrations en petit comité ou les cérémonies symboliques. Les proches reçoivent un lien privé pour télécharger les fichiers HD et commander des tirages.`,
    `Vous pouvez aussi profiter de lieux proches de ${city.name} comme ${nearbyText} pour diversifier les décors : vignes, bords de rivière, ruelles anciennes ou jardins publics. Nous nous adaptons à votre planning et aux envies du couple pour créer un itinéraire photo efficace.`,
    `Contactez-nous pour vérifier la disponibilité de votre date à ${city.name}. Nous répondons rapidement au téléphone ou par e-mail, établissons un devis clair et planifions ensemble la séquence des photos. Studio B07 reste disponible avant et après le mariage pour toute question sur l'organisation ou l'usage des images.`
  ];
}

function renderCityPage(city) {
  const paragraphs = buildParagraphs(city);
  const description = buildMetaDescription(city);
  const pageContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Page ville ${city.name} -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Photographe de mariage pas cher à ${city.name} - Studio B07</title>
  <meta name="description" content="${description}">
  <meta property="og:title" content="Photographe mariage à ${city.name} - Studio B07">
  <meta property="og:description" content="Reportage photo 1h, 2h ou 3h à ${city.name}. Tarifs abordables, style lumineux.">
  <meta property="og:image" content="https://mariage.pas.cher.studio-b07.com/mariage-2.jpg">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://studio-b07.com/mariage/villes/${city.slug}.html">
  <link rel="stylesheet" href="/assets/css/styles.css">
</head>
<body>
  <header>
    <div class="container navbar">
      <a href="/index.html" class="logo" aria-label="Studio B07 - photographe de mariage en Gironde">
        <img src="https://mariage.pas.cher.studio-b07.com/logo.png" alt="Studio B07 - photographe de mariage en Gironde">
        <span>Studio B07</span>
      </a>
      <nav>
        <div class="burger" aria-label="Ouvrir le menu">
          <span></span><span></span><span></span>
        </div>
        <ul>
          <li><a href="/index.html">Accueil</a></li>
          <li><a href="/a-propos.html">À propos</a></li>
          <li><a href="/index.html#tarifs">Tarifs</a></li>
          <li><a href="/index.html#villes">Villes</a></li>
          <li><a href="/contact.html">Contact</a></li>
          <li><a class="cta-btn" href="/contact.html">Demander un devis</a></li>
        </ul>
      </nav>
    </div>
  </header>
  <main class="container">
    <section class="hero">
      <div class="hero-text">
        <div class="badge">Reportage photo ${city.name}</div>
        <h1>Photographe de mariage pas cher à ${city.name}</h1>
        <p>Studio B07 couvre les mariages à ${city.name} avec des formules courtes de 1h à 3h pour garder l'essentiel : mairie, cérémonie, couple, groupes, cocktail. Tarifs abordables, rendu lumineux et accompagnement rassurant.</p>
        <div class="tag-list">
          <span class="tag">Formules 1h / 2h / 3h</span>
          <span class="tag">${city.name} & alentours</span>
          <span class="tag">Téléphone : <a href="tel:+33783654604">07 83 65 46 04</a></span>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:12px;">
          <a class="cta-btn" href="/contact.html">Demander un devis</a>
          <a class="cta-btn" href="mailto:contact@studio-b07.com?subject=Devis%20mariage%20%c3%a0%20${encodeURIComponent(city.name)}">Écrire un mail</a>
        </div>
      </div>
      <div class="hero-image">
        <img src="https://mariage.pas.cher.studio-b07.com/mariage-5.jpg" alt="Couple de mariés photographié à ${city.name}">
      </div>
    </section>

    <section class="section">
      <h2>Reportage photo à ${city.name} : l'essentiel</h2>
      ${paragraphs.map(p => `<p>${p}</p>`).join('\n      ')}
    </section>

    <section class="section" id="formules">
      <h2>Formules & tarifs à ${city.name}</h2>
      <div class="table-wrapper">
        <table>
          <tr><th>Formule</th><th>Ce que l'on couvre</th><th>Pour qui ?</th></tr>
          <tr><td>1h</td><td>Mairie ou mini séance couple</td><td>Petit budget, civil ou elopement</td></tr>
          <tr><td>2h</td><td>Mairie + couple ou cérémonie + groupes</td><td>Couverture équilibrée</td></tr>
          <tr><td>3h</td><td>Mairie, cérémonie symbolique, cocktail</td><td>Moments clés sans journée complète</td></tr>
        </table>
      </div>
      <p class="table-note">Tarifs abordables et sans surprise : préparation, reportage, sélection, retouche légère et galerie HD incluses.</p>
    </section>

    <section class="section">
      <h2>Comment réserver votre photographe de mariage à ${city.name} ?</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div>
            <h3>Prise de contact</h3>
            <p>Appelez le <a href="tel:+33783654604">07 83 65 46 04</a> ou écrivez-nous. Nous vérifions la date et recueillons les informations clés.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div>
            <h3>Devis clair</h3>
            <p>Un devis personnalisé est envoyé pour ${city.name}, avec la formule 1h, 2h ou 3h la plus adaptée à votre programme.</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div>
            <h3>Reportage guidé</h3>
            <p>Le jour J, nous accompagnons les mariés et leurs proches, guidons les photos de groupe et livrons rapidement la galerie en ligne.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Pourquoi choisir un photographe de mariage petit budget à ${city.name} ?</h2>
      <div class="cards">
        <div class="card">
          <h3>Économique</h3>
          <p>Formules low cost sans compromis sur la qualité des images : couleurs naturelles, cadrages soignés, retouches discrètes.</p>
        </div>
        <div class="card">
          <h3>Flexible</h3>
          <p>1h, 2h ou 3h pour s'adapter aux plannings serrés, aux cérémonies civiles et aux cocktails rapides à ${city.name}.</p>
        </div>
        <div class="card">
          <h3>Local</h3>
          <p>Basé en Gironde, Studio B07 connaît les points de vue, les parcs et les ruelles photogéniques de ${city.name} et de ${city.nearby.join(', ')}.</p>
        </div>
      </div>
    </section>

    <section class="section hero-secondary">
      <h2>Demander un devis pour un mariage à ${city.name}</h2>
      <p>Expliquez vos horaires, lieux et souhaits : mairie, église, séance couple, cocktail. Nous proposons la formule adaptée et bloquons la date.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <a class="cta-btn" href="/contact.html">Accéder à la page contact</a>
        <a class="cta-btn" href="mailto:contact@studio-b07.com?subject=Devis%20mariage%20%c3%a0%20${encodeURIComponent(city.name)}">Écrire à Studio B07</a>
        <a class="cta-btn" href="tel:+33783654604">Appeler 07 83 65 46 04</a>
      </div>
    </section>

    <section class="section">
      <h2>Autres villes proches</h2>
      <div class="city-links">
        ${city.nearby.map(v => `<a href="/villes/${v.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')}.html">${v}</a>`).join('\n        ')}
      </div>
    </section>
  </main>

  <div class="container footer">
    <p>Studio B07 — Photographe de mariage tarifs abordables à ${city.name} et environs. Téléphone : <a href="tel:+33783654604">07 83 65 46 04</a>. Adresse : 1080 rue de Malbec, 33620 Cézac.</p>
  </div>
  <div class="mobile-cta">
    <a class="cta-btn" href="tel:+33783654604">Appeler Studio B07</a>
  </div>
  <script src="/assets/js/main.js"></script>
</body>
</html>`;
  return pageContent;
}

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

cities.forEach(city => {
  const content = renderCityPage(city);
  const filePath = path.join(baseDir, `${city.slug}.html`);
  fs.writeFileSync(filePath, content, 'utf8');
});

console.log(`Généré ${cities.length} pages villes dans ${baseDir}`);
