import CustomErrorCode from "../enum/CustomErrorCode";

const CustomErrorMapper = {
    [CustomErrorCode.AddUser_Email as unknown as number]: 
        {
            translationKey: 'EMAIL_SHOULD_BE_UNIQUE'
        },
    [CustomErrorCode.AddUser_Username]: 
        {
            translationKey: 'USERNAME_SHOULD_BE_UNIQUE'
        },
    [CustomErrorCode.Login_Credentials]: 
    {
        translationKey: 'WRONG_CREDENTIALS'
    },
    [CustomErrorCode.EditUser_Password]: 
    {
        translationKey: 'WRONG_CREDENTIALS'
    },
    [CustomErrorCode.EditUser_Email]: 
    {
        translationKey: 'EMAIL_ALREADY_EXISTS'
    },
    [CustomErrorCode.EditUser_Username]: 
    {
        translationKey: 'USERNAME_ALREADY_EXISTS'
    },
    [CustomErrorCode.GetUserDetails_User]: 
    {
        translationKey: "User does not exist!"
    },
    [CustomErrorCode.DeleteUser_Password]: 
    {
        translationKey: "Incorrect password."
    },
    [CustomErrorCode.DeleteUser_User]: 
    {
        translationKey: "User does not exist."
    },
    [CustomErrorCode.EditUser_Email]: 
    {
        translationKey: "Email already exists!"
    },
    [CustomErrorCode.DeleteArticle_InvalidArticle]: 
    {
        translationKey: "Article does not exist."
    },
    [CustomErrorCode.AddUserKeywordSearch_InvalidUser]: 
    {
        translationKey: "This user does not exist."
    },
    [CustomErrorCode.DeleteSearch_InvalidKeyword]: 
    {
        translationKey: "This keyword does not exist."
    },
    [CustomErrorCode.GetUserArticle_InvalidArticle]: 
    {
        translationKey: "This article does not exist."
    }
};

export default CustomErrorMapper;