COMPOSER_CARD=restadmin@dtlab-network
COMPOSER_NAMESPACES=never
COMPOSER_AUTHENTICATION=true
COMPOSER_MULTIUSER=true
COMPOSER_PROVIDERS='{
    "google": {
        "provider": "google",
        "module": "passport-google-oauth2",
        "clientID": "312039026929-t6i81ijh35ti35jdinhcodl80e87htni.apps.googleusercontent.com",
        "clientSecret": "Q4i_CqpqChCzbE-u3Wsd_tF0",
        "authPath": "/auth/google",
        "callbackURL": "/auth/google/callback",
        "scope": "https://www.googleapis.com/auth/plus.login",
        "successRedirect": "/",
        "failureRedirect": "/"
    }
}'
COMPOSER_DATASOURCES='{
    "db": {
        "name": "db",
        "connector": "mongodb",
        "host": "mongo"
    }
}'