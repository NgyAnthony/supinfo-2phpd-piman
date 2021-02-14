import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
            //NOTE : Specifying screens in root isn't actually useful bc bottom tab navigator takes
            //care of all screens.
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
