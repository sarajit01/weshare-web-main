import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";

const favoritesDbTable = [
    'id', 'listing_type' , 'listing_id' , 'cat_id' , 'user_id', 'referrer_id' , 'business', 'promotion', 'loyalty_card' , 'user'
]

const favoritesSchema =  buildSchemaFromArray(favoritesDbTable)

export default favoritesSchema