import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";
const lcDBTable: string[] = [
    'id','user_id', 'business_id', 'card_type', 'card_name', 'visits_for_cash', 'max_redemption', 'card_title', 'description', 'card_description',
    'point_value', 'terms', 'restrictions', 'client_url', 'redemption_url', 'logo', 'bg_color', 'font_family', 'font_size',
    'font_color', 'redemption_img','heading_font_size', 'heading_font_color', 'custom_bg_img', 'redemption_img_color',
    'filling_start_on_end', 'message_on_complete', 'message_on_exchange', 'bg_img' , 'screenshot','customer_reward_percent', 'display_logo'
] ;

const loyaltyCardSchema =  buildSchemaFromArray(lcDBTable)

export default loyaltyCardSchema