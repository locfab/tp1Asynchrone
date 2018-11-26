Asynchrone TP3
==============
Nous allons utiliser **NodeJS** et **Express**

# Presentation


Vous pouvez installer les dépendances avec la commande suivante:

```
npm install
npm i express
```
Vous pouvez lancer le serveur avec la commande suivante:

```
npm start
```

## Les Routes

### POST
L'addresse 'metrics/{id}' en POST creer une metric
il faut rajouter dans le body:
```
[{ "timestamp":"1384686660000", "value":"10" }]
```
### GET
L'addresse 'metrics/{id}' en GET pour recuperer la metric en question
#### DELETE
L'addresse 'metrics/{id}' en DELETE pour supprimer une metric préalablement creer

FABRICE LOCQUEVILLE
