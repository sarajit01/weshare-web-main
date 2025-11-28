import {buildSchemaFromArray, getDbTableSchemaAttr} from "./helpers.schema";

const profileDbTable = [
    'id', 'username', 'email', 'password', 'role', 'first_name', 'last_name', 'phone', 'avatar', 'country', 'state', 'city', 'address', 'email_verification_code', 'phone_verification_code', 'email_verified_at', 'phone_verified_at', 'google_id', 'facebook_id' , 'status', 'remember_token' , 'fullname', 'default_avatar', 'points'

]

const profileSchema =  buildSchemaFromArray(profileDbTable)

export default profileSchema