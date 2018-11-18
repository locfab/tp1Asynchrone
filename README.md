Asynchrone TP1
==============
Nous allons utiliser **NodeJS** et **Express**

# Presentation
Comme la semaine dernière nous pouvons accéder à 4 pages distinctes avec 3 un peu differentes urls :

* localhost:8080/
* localhost:8080/hello/fabrice
* localhost:8080/hello/xxx
* localhost:8080/nimportequoi

Vous pouvez installer les dépendances avec la commande suivante:

```
npm install
```
Vous pouvez lancer le serveur avec la commande suivante:

```
./node_modules/.bin/nodemon main.js
```

## Les pages

### Page home
La page home à l'addresse '/' est la présentation des différentes routes et le comment ca marche

### Pages hello
Les pages hello à l'adresse '/hello?name=prenom sont divisées en 2.
#### MOI
Une page de presentation est renvoyée quand il a mon nom 
#### Les autres
L'url renvoi une hello prenom

### Pages non trouvées
Une url qui n'est pas repertoriée ci-dessus renverra une message d'erreur 404.

#FABRICE LOCQUEVILLE
