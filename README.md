Asynchrone TP3
==============
Nous allons utiliser **NodeJS** et **Express**
L'objectif est de pouvoir se connecter, et ajouter modifier ou supprimer des metrics

# Presentation


Vous pouvez installer les dépendances avec la commande suivante:

```
npm install
npm i express
```

Vous pouvez générer les données:

```
npm run populate
```

Vous pouvez lancer le serveur avec la commande suivante:

```
npm start
```
ou 
```
npm run dev
```


## Les Routes GET

### "/" Guest
Il suffit de se connecter avec un des comptes généré avec npm run populate 
```
username: fabrice1, password: 1234567890
username: fabrice2, password: 1234567890
username: fabrice3, password: 1234567890

```
Qui auront chacun des metrics différentes

### "/signup" Guest

Permet de creer des metrics

### "/" Auth
Permet d'avoir acces au logout et au metrics

### "/metrics" Auth

Permet d'ajouter, modifier ses metrics, et voir les metrics et voir un diagramme


FABRICE LOCQUEVILLE
