const os = require('os');
const interfaces = os.networkInterfaces();

module.exports = () => {
    for (let dev in interfaces) {
        let iface = interfaces[dev].filter(function(details) {
            return details.family === 'IPv4' && details.internal === false;
        });

        if(iface.length > 0) return iface[0].address;
    }
};