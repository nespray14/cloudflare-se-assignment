export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // collect CF header
    const email = request.headers.get('Cf-Access-Authenticated-User-Email') || 'Unknown User';
    const country = request.headers.get('Cf-Ipcountry') || 'Unknow Country';
    const timestamp = new Date().toISOString();

    // Body for Secure path
    if (path === '/secure' || path === '/secure/') {
      const html = `
        <!DOCTYPE html>
        <html>
        <head><title>Secure Area</title></head>
        <body style="font-family: 'Times New Roman', serif;
	      text-align: center;
	      margin-top: 100px;
	      background: #833AB4;
	      background: linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(255, 127, 8, 1) 0%, rgba(242, 175, 19, 1) 100%, rgba(252, 176, 69, 1) 100%);">
          <h2>${email} authenticated at ${timestamp} from <a href="/secure/${country}">${country}</a></h2>
        </body>
        </html>
      `;
      return new Response(html, {
        headers: { 'Content-Type': 'text/html;charset=UTF-8' }
      });
    }

    // get flag picture from R2
    if (path.startsWith('/secure/')) {
      const requestedCountry = path.split('/')[2].toUpperCase(); 
      const fileName = `${requestedCountry}.png`;
      
      const object = await env.FLAG_BUCKET.get(fileName);
      
      if (object === null) {
        return new Response('Flag not found', { status: 404 });
      }

      const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
	headers.set('X-Country-Code', requestedCountry);
        headers.set('Content-Type', 'image/png');

      return new Response(object.body, { headers });
    }

    return new Response('Not Found', { status: 404 });
  }
};
