export const ROUTES = {

  admin : {
    root : 'admin' ,
    users : {
      root : 'users' ,
    } ,

    listings : {
      root : 'listings' ,
      business : {
        edit : 'business/edit'
      },
      promotion : {
        edit : 'promotion/edit'
      },
      ad : {
        edit : 'business-ad/edit'
      }
    } ,

    claims : {
      root : 'claims' ,
    } ,

    category : {
      root : 'categories' ,
      add : 'add' ,
      manage : 'manage' ,
      edit : 'edit' ,
    } ,
    attributes : {
      root : 'custom-attributes' ,
    } ,
    banners : {
      root : 'banner-gallery' ,
    } ,

    plan : {
      root : 'plans' ,
      edit : 'edit'
    },
    config : {
      root : 'config' ,
      google : 'google',
      smtp: 'smtp',
      api_keys: 'api-keys',
      payment_gateways: 'payment-gateways',
      translator: 'translations'

    },

    payment : {
      saveBank : 'save-bank-details' ,
      payments : 'payments'
    } ,
    subscriptions : {
      manage : 'manage-subscriptions' ,
    }

  } ,
  customer : {
    dashboard : 'customer/dashboard' ,
    profile : 'customer/profile' ,
    favorites : 'customer/my-favorites',
    listings : 'customer/my-listings/:listing_type',
    messages : 'customer/messages',
    my_referral_network: 'customer/my-referral-network',
    notifications : 'customer/notifications',
  } ,
  business : {
    dashboard : 'business/dashboard',
    business_profile: 'business/profile',
    my_referral_network: 'business/my-referral-network',
    create : 'business/create' ,
    edit : 'business/edit' ,
    create_promotion : 'business/create-promotion',
    edit_promotion : 'business/edit-promotion',
    create_ad : 'business/create-ad',
    edit_ad : 'business/edit-ad',
    create_notification : 'business/create-notification',
    manage : 'business/manage',
    manage_business_notifications : 'business-notifications/manage',
    edit_business_notification : 'business/edit-business-notification',
    invitations : 'business/invitations',
    delegate_access : 'business/delegate-access',
    appointment_settings : 'business/appointment-settings',
    rewards_table : 'business/rewards-table',
    manage_promotions : 'promotions/manage',
    manage_discounts : 'discounts/manage',
    manage_ads : 'business-ads/manage',
    manage_customer_claims : 'business/customer-claims',
    messages : 'business/messages',
    payments: 'business/payments',
    booking_requests : 'business/booking-requests',
    appointments : 'business/appointments',
    select_plan : 'business/select-plan',
    pay : 'business/payment',
    notifications: 'business/notifications'
  } ,
  loyalty_card : {
    create : 'business/loyalty-card/create' ,
    edit : 'business/loyalty-card/edit',
    manage: 'business/loyalty-cards/manage',
    details : 'business/loyalty-cards/',

  } ,

   register : 'sign-up' ,
   privacy_policy : 'privacy-policy' ,
   terms : 'terms' ,

   login : 'sign-in',
   forgot_password : 'forgot-password',
   reset_password : 'reset-password',


  admin_login : 'admin/security/login'


};

export function toAbsolutePath(path: string | string[]) {
  // this function accepts string or string array
  // CAUTION! - be aware, send only valid array or string
  if (typeof path === 'string') {
    return '/' + path;
  } else {
    return '/' + path.join('/');
  }
}
