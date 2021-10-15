const b2cPolicies = {
    names: {
        signUpSignIn: "b2c_1_susi",
        forgotPassword: "B2C_1_password_reset",
        editProfile: "b2c_1_edit_profile"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://rcaazdemo.b2clogin.com/rcaazdemo.onmicrosoft.com/B2C_1_susi"
        },
        forgotPassword: {
            authority: "https://rcaazdemo.b2clogin.com/rcaazdemo.onmicrosoft.com/B2C_1_password_reset",
        }
    },
    authorityDomain: "rcaazdemo.b2clogin.com"
}


export const msalConfig = {
    auth: {
        clientId: "3a5d7d6a-6380-48dc-b027-7fb3a6270409",
        authority: b2cPolicies.authorities.signUpSignIn.authority,
        knownAuthorities: [b2cPolicies.authorityDomain],
        redirectUri: process.env.REACT_APP_OIDC_REDIRECT_URI
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    //scopes: ["User.Read"]
    scopes: ["openid", "profile", "3a5d7d6a-6380-48dc-b027-7fb3a6270409"]
};

export const resetPasswordRequest = {
    authority: b2cPolicies.authorities.forgotPassword.authority,
    scopes: ["openid", "profile", "3a5d7d6a-6380-48dc-b027-7fb3a6270409"]
}

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
