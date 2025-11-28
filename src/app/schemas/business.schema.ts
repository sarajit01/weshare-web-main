import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";

const businessDbTable = [
    'id','user_id', 'business_name_prefix', 'business_name', 'business_type', 'business_summary', 'description', 'main_category_id', 'slogan',
    'country', 'state', 'city', 'address','latitude', 'longitude', 'gps_location', 'price_from', 'price_to', 'price_level', 'currency',
    'status', 'rating', 'comments_count', 'views', 'followers', 'logo'
]

const businessSchema =  buildSchemaFromArray(businessDbTable)

export default businessSchema