/*ESTE archivo es para comunicarnos con la base de datos.
Se pide la key de la base y otros condimentos más.
El paso a paso de esto se saca de internet, no me acuerdo el 100%
de los pasos porque los haces una vez*/
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCcwKgypv9vOxAfNGMkI5aNeAIf8KsTsJc",
    authDomain: "supermercado-dev.firebaseapp.com",
    databaseURL: "https://supermercado-dev.firebaseio.com",
    projectId: "supermercado-dev",
    storageBucket: "supermercado-dev.appspot.com",
    messagingSenderId: "578674573353",
    appId: "1:578674573353:web:70f94b0987f477fb6bdc38",
    measurementId: "G-YSB4RRHG6X"
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
