#OpenHax - Open Source Haxball Clone in HTML5 and Javascript

OpenHax is an open source clone/remake of the famous game Haxball. While the game engine is **Phaser**, it also uses **React** for client-side rendering and Socket.io for game state synchronization.

##Building and running

You can run OpenHax locally in your machine. Just follow the instructions and open your browser at [localhost:3000](localhost:3000)

```
git clone https://github.com/erasmo-marin/open-hax.git openHax
cd openHax
npm install
npm run build
nodemon ./bin/www 
```

##TODO:
* Create and administrate room
* Set nickname and avatar
* Goals, maps, multiplayer
* Chat
* Sockets game state synchronization