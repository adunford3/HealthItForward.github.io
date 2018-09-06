// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: "AIzaSyAZIG4OIFxRdY57bevfZEmlmN2FD2PbtoQ",
      authDomain: "healthitforward-c455e.firebaseapp.com",
      databaseURL: "https://healthitforward-c455e.firebaseio.com",
      projectId: "healthitforward-c455e",
      storageBucket: "healthitforward-c455e.appspot.com",
      messagingSenderId: "526364646797"
  }
};
