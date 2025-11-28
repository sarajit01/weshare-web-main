import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";

const categoryDbTable = [
    'id','icon','name','parent_cat_id','banner'
]

const categorySchema =  buildSchemaFromArray(categoryDbTable)

export default categorySchema