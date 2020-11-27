# SNCF-Bot
SNCF Bot est un bot Discord qui interagit avec l'API SNCF pour vous donner des informations sur les gares et rechercher, pour vous, vos trajets.

## Questions générales

### À quoi sert-il ?
Tranquillement installé dans votre chaise gaming en train de discuter avec vos amis, vous n'avez pas envie de quitter Discord pour patienter le temps que les serveurs en retard de la SNCF ne réponde à votre requête ?
SNCF Bot est le remède à cela !
Grâce à lui vous pourrez recherchez rapidement et simplement des informations sur vos gares et sur les trajets qui vous intéressent. 
Simple, clair, rapide !

### Où le trouver ?
Vous pouvez retrouver SNCF Bot sur Discord grâce à son [lien d'invitation](https://discord.com/api/oauth2/authorize?client_id=771684716390645761&permissions=3072&scope=bot).

### Comment participer au projet ?
Malheureusement, il n'est pas possible de participer à ce projet. 
Pour le moment en tout cas. Vous aurez peut-être remarqué que ce bot ne possède que deux commandes (trois en comptant l'affichage de l'aide). Cela n'est pas dû à ma flemardise mais plutôt à l'API Navitia qui ne permet pas grand chose...
Ou peut-être est-ce moi qui n'ai pas compris le potentiel de cette API.
Ainsi, la seule participation pouvant être apportée à ce projet serait des idées de nouvelles commandes.

### Pour plus d'informatins...
...n'hésitez pas à me contacter par [e-mail](mailto:lprogead@mailo.com), via [Twitter](https://twitter.com/lprogead) ou via Discord (LProgead#3667).

## Questions développement
Entrons maintenant dans le vif du sujet pour les développeurs !

### Quel langage est utilisé pour le développement du robot ?
J'utilise JavaScript pour le script principal. Le programme est supporté par NPM.

### Quels sont les modules utilisés ?
Pour ce projet, j'ai utilisé le module de la librairie Discord.JS pour faire le pont avec l'API Discord, le module Axios pour communiquer avec l'API SNCF ainsi que le module DotENV pour charger le fichier .env.

### Puis-je ré-utiliser le robot sur mon compte Discord ?
Comme le stipule la licence Affero, vous pouvez utiliser, fork, et distribuer ce projet à quelques conditions :
- Me citer (LProgead)
- Permettre à tous de télécharger votre nouveau code source
- Ne pas l'inclure dans un produit commercial
- Le distribuer sous la même licence, Affero.

Ainsi, vous pouvez sans risque l'utiliser pour une utilisation personnelle.

Je ne suis pas fermé à l'idée de donner à certains utilisateurs une dérogation de permissions. Si vous en souhaitez une, contactez-moi par [e-mail](mailto:lprogead@mailo.com) et nous en parlerons ensemble.

### Quels sont les prérequis pour lancer MacronBot sur mon équipement ?
*Avant de commencer, il vous faudra posséder une clé API SNCF.*

- Tout d'abord, il vous faut avoir installé Node.JS sur votre ordinateur/serveur.
- Ensuite, vous pouvez cloner le repository, effectuer la commande `npm i` dans le dossier résultant.
- Créez un fichier .env dans lequel vous indiquez 
```
token=VOTRE TOKEN
api_key=VOTRE CLÉ API SNCF
```
- Pour lancer le programme, lancez `node .`.
Et là, swhoosh !, votre application Discord se lance 😁