import Keycloak from 'keycloak-js';


export default class GawatiAuthHelper{


    static isUserLoggedIn  ()  {
	    return localStorage.getItem('authenticated')==='true';
	}

	static getUserName  ()  {
		return localStorage.getItem('username');
	}

	static login  (keyclockJSON)   {
		const kc = Keycloak(keyclockJSON);
	    kc.init();
	    kc.login();
	}

	static register (keyclockJSON)  {
		const kc = Keycloak(keyclockJSON);
	    kc.init();
	    kc.register();
	}

	static logout  (keyclockJSON) {
	    const kc = Keycloak(keyclockJSON);
	    kc.init();
	    localStorage.setItem('authenticated', 'false');
	    localStorage.setItem('username', 'guest');
	    kc.logout();
	}

	static save(keyclockJSON, callback)  {
	    const kc = Keycloak(keyclockJSON);
        kc.init().success(function(authenticated) {
            if(authenticated){
                localStorage.setItem('authenticated', 'true');
                kc.loadUserProfile().success(function(profile) {
                    localStorage.setItem('username', profile.username);
                    callback(true);
                }).error(function() {
                    localStorage.setItem('username', 'guest');
                    callback(false);
                });
            }else{
                localStorage.setItem('authenticated', 'false');
                localStorage.setItem('username', 'guest');
                callback(false);
            }
        }).error(function(error) {
            alert('failed to initialize'+error);
            callback(false);
        })
	} 
};
