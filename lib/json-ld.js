export const getPersonJsonLd = () => {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Person',
    url: 'https://michelrodrigues.net',
    image: 'https://michelrodrigues.net/static/images/michel.jpg',
    name: 'Michel Rodrigues',
    givenName: 'Michel',
    familyName: 'Rodrigues',
    gender: 'Male',
    birthPlace: 'São Paulo',
    jobTitle: 'Software Engineering',
    sameAs: [
      'https://linkedin.com/in/michel-rodrigues-85a1bb58',
      'https://twitter.com/sobreiramic',
      'https://www.instagram.com/sobreirami',
      'https://github.com/sobreirami',
    ],
    knowsAbout: [
      {
        '@type': 'Thing',
        '@id': 'https://www.wikidata.org/wiki/Q80993',
        name: 'Software Engineering',
      },
    ],
    knowsLanguage: [
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q750553',
        name: 'Brazilian Portuguese',
      },
      {
        '@type': 'Language',
        '@id': 'https://www.wikidata.org/wiki/Q1860',
        name: 'English',
      },
    ],
    nationality: [
      {
        '@type': 'Country',
        '@id': 'https://www.wikidata.org/wiki/Q155',
        name: 'Brazil',
      },
    ],
  }
}
