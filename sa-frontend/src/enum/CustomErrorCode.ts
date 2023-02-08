enum CustomErrorCode {
    Server = 1,
    AddUser_Email = 100,
    AddUser_Username = 101,
    Login_Credentials = 110,
    EditUser_Password = 120,
    EditUser_User = 121,
    EditUser_Username = 122,
    EditUser_Email = 123,
    EditUser_InvalidToken = 124,
    GetUserDetails_User = 130,
    DeleteUser_Password = 140,
    DeleteUser_User = 141,
    DeleteUser_Token = 142,
    
    DeleteArticle_InvalidArticle = 200,
    GetUserArticle_InvalidArticle = 210,
    GetUserArticle_User = 211,
    GetUserArticle_Token = 212,
    AddArticle_User = 220,
    AddArticle_Token = 221,
    GetArticles_User = 230,
    GetArticles_Token = 231,
    
    AddUserKeywordSearch_InvalidUser = 300,
    AddUserKeywordSearch_InvalidToken = 301,
    DeleteSearch_InvalidKeyword = 310,
    
    GetKeyphrases_ScriptFailure = 400,
    GetSentimentScore_ScriptFailure = 410,
    GetSummary_ApiFailure = 420
}

export default CustomErrorCode;