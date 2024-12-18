// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  clientId: '219251784445591553',
  loginURL: 'https://discordapp.com/api/oauth2/authorize',
  apiURL: 'http://127.0.0.1:5000',
  mediaURL: 'https://media.avrae.io',
  baseURL: 'http://127.0.0.1:4200',
  datadogAplicationId: '7350206a-687c-4dc4-942b-c3f0d1bb024b',
  datadogClientToken: 'pubf700faf5c2632d84266ee5171c2eb062'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */

/*
  Currently, the datadog `clientToken` and `applicationId` are public since they're
  not sensitive data, and they are designed to be used in client-side code which is
  a common and safe practice when integrating Datadog RUM.
*/
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
