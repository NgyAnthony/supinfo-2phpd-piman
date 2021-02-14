import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TabAccueil: {
            screens: {
              AccueilScreen: 'Accueil',
            },
          },
          TabListes: {
            screens: {
              ListesScreen: 'Listes',
            },
          },
          TabParametres: {
            screens: {
                ParametresScreen: 'Paramètres',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
