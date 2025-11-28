// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // backend: 'https://guiderhn.com/business-portal-api/',
  // api: 'https://guiderhn.com/business-portal-api/api/' ,
  backend: 'http://127.0.0.1:8000/',
  api: 'http://127.0.0.1:8000/api/',
  frontend: 'http://127.0.0.1:4200',

  // backend: 'http://192.168.0.102:8000/',
  // api: 'http://192.168.0.102:8000/api/',
  cloudinary: {
    cloud_name: localStorage.getItem('cloud_name') || '',
    api_key: localStorage.getItem('cloud_api') || '',
    api_secret: localStorage.getItem('cloud_secret') || '',
    preset: localStorage.getItem('cloud_preset') || ''
  },
  facebook: {
    app_id: localStorage.getItem('fb_app_id') || '',
    app_secret: localStorage.getItem('fb_app_secret') || ''
  },
  pusher: {
    app_id: localStorage.getItem('pusher_app_id') || '',
    api: localStorage.getItem('pusher_api') || '',
    secret: localStorage.getItem('pusher_secret') || '',
    cluster: localStorage.getItem('pusher_cluster') || ''
  },
  google: {
    client_id: localStorage.getItem('g_client_id') || '',
    client_secret: localStorage.getItem('g_client_secret') || '',
    map_key: localStorage.getItem('g_map_key') || 'test'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
