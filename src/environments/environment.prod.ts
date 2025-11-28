export const environment = {
  production: true,
  backend: 'https://guiderhn.com/business-portal-api/',
  api: 'https://guiderhn.com/business-portal-api/api/' ,
  frontend: 'https://guiderhn.com',

  // backend: 'http://127.0.0.1:8000/',
  // api: 'http://127.0.0.1:8000/api/',
  cloudinary : {
    cloud_name : localStorage.getItem('cloud_name') || '' ,
    api_key : localStorage.getItem('cloud_api') || '' ,
    api_secret: localStorage.getItem('cloud_secret') || '',
    preset:  localStorage.getItem('cloud_preset') || ''
  } ,
  facebook : {
    app_id : localStorage.getItem('fb_app_id') || '' ,
    app_secret : localStorage.getItem('fb_app_secret') || ''
  } ,
  pusher : {
    app_id : localStorage.getItem('pusher_app_id') || '',
    api :  localStorage.getItem('pusher_api') || '',
    secret:  localStorage.getItem('pusher_secret') || '' ,
    cluster:  localStorage.getItem('pusher_cluster') || ''
  } ,
  google : {
    client_id :  localStorage.getItem('g_client_id') || '',
    client_secret :  localStorage.getItem('g_client_secret') || '',
    map_key:  localStorage.getItem('g_map_key') || ''
  }
};
