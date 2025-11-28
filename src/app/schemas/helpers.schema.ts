import {ObjectStoreSchema} from "ngx-indexed-db";

export function getDbTableSchemaAttr(attribute: string): ObjectStoreSchema {
    return { name: attribute , keypath: attribute, options: { unique: false } }
}

export function buildSchemaFromArray(attributes: string[]) : ObjectStoreSchema[]{
    let schema: ObjectStoreSchema[] = [] ;
    attributes.forEach((attribute: string) => {
        schema.push(getDbTableSchemaAttr(attribute))
    })
    return  schema
}