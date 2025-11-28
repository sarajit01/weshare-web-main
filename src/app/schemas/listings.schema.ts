import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";

const listingsDbTable = [
   'id', 'listings'
]

const listingsSchema =  buildSchemaFromArray(listingsDbTable)

export default listingsSchema