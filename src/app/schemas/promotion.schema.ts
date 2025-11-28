import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";
const promotionDbTable: string[] = [
    'id', 'user_id', 'business_id', 'promotion_type', 'promotion_title', 'description', 'price_original','price_offered', 'price_discount',
    'discount_percentage', 'maximum', 'minimum_product_purchase', 'start_at', 'ends_at', 'about', 'terms', 'restrictions', 'code', 'status'
]

const promotionSchema = buildSchemaFromArray(promotionDbTable)

export default promotionSchema