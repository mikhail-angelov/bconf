export default function($location, constant) {
    var host = 'localhost'; // $location.host();
    var port = 9000; //$location.port();

    return {
        getHost: function(){
            return host;
        },
        getPort: function(){
            return port;
        },
        getLinkToShare: function (user) {
            if (user && user.sharedToken) {
                return constant.URL_TO_SHARE({host:host, port:port,refer: user.id, sharedToken: user.sharedToken});
            } else {
                return '';
            }
        }
    }
};
