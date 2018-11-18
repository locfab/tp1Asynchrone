const url = require('url')
const qs = require('querystring')

/*const homeInfo = "Nous somme dans l'url principale, il y a l'url /hello?name=fabrice et il y aura une description de fabrice, parce que je m'appelle fabrice et si vous avez mis votre nom dans le parametre name dans sur l'url, eh bah il y aura hello suivi de ton nom, et juste /hello fera une erreur 404... Tout te semble convenir? C'est parti !! On se retrouve sur l\'url /hello ! \n"

const description = "Fabrice, 22 ans et il y a 6ans et 4mois j'avais 16ans"

const notFound = 'Error 404: Page not found'

module.exports = {
  serverHandle: function (req, res) {

    const route = url.parse(req.url)
    const path = route.pathname 
    const params = qs.parse(route.query)

    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (path === '/hello' && 'name' in params) {
       console.log(params['name'])
        if (params['name'].toLowerCase() === 'fabrice') {
            
            res.write(description)
        }
        else {

            res.write('Hello ' + params['name'])
        }
    } 
    else if (path === '/') {

        res.write(homeInfo);
    }
    else {

        res.write(notFound);
    }

    res.end();
  } 
}*/
