const fetch = require('node-fetch'),
    ip = process.argv.slice(2)[0],
    username = process.argv.slice(2)[1],
    password = process.argv.slice(2)[2],
    {
        URLSearchParams
    } = require('url'),
    Logger = require('./logger'),
    console = new Logger();
let params = new URLSearchParams();
console.info('Creating POST request form body...');
params.append('txtAuthLoginUser', username);
params.append('txtAuthLoginPassword', password);
params.append('gPage', 'top');
params.append('gMode', 'auth');
params.append('txtHelpSearch', '');
params.append('gPage', 'top');
params.append('gMode', 'undefined');
params.append('gType', 'undefined');
params.append('gKey', 'undefined');
params.append('gSSS', '');
params.append('gRRR', '');
params.append('hiddenDummyText', 'dummy');
console.info('POST request form body created, logging in...');
if (process.env.DEBUG) console.debug(params.toString());
fetch(`http://${ip}/cgi-bin/top.cgi`, {
    method: 'POST',
    body: params
}).then(res => res.text()).then(body => {
    if (body.includes('Either the User Name or Password is incorrect.')) {
        console.error('Username or Password is Incorrect, Please try again.');
        return;
    }
    let findings = body.match(/(<input\s*type="hidden"\s*id="gSSS"\s*name="gSSS"\s*value="\S*"\s*\/>)(<input\s*type="hidden"\s*id="gRRR"\s*name="gRRR"\s*value="\S*"\s*\/>)/, '');
    let gSSS = findings[1].replace(/(<input\s*type="hidden"\s*id="gSSS"\s*name="gSSS"\s*value=")/, '').replace(/("\s*\/>)/, '');
    let gRRR = findings[2].replace(/(<input\s*type="hidden"\s*id="gRRR"\s*name="gRRR"\s*value=")/, '').replace(/("\s*\/>)/, '');
    console.info('Tokens retrieved, creating GET query string...');
    let params = new URLSearchParams();
    params.append('gSSS', gSSS);
    params.append('gRRR', gRRR);
    params.append('gPage', 'undefined');
    params.append('gMode', 'undefined');
    params.append('gType', 'undefined');
    params.append('gKey', 'undefined');
    params.append('gDummy', Date.now());
    params.append('task', 'here');
    params.append('_', '');
    console.info('GET query string created, sending I\'m here packets...');
    if (process.env.DEBUG) console.debug(params.toString());
    fetch(`http://${ip}/cgi-bin/task.cgi?${params.toString()}`).then(res => res.text()).then(body => console.info('Packets sent and I\'m here action ended.'));
});