# Space Invaders

## About

I Made this project to get a little more practice with typescript and build up some experience using canvas.
If you like old arcade games, hopefully you enjoy!

## How to Play

To play the game, just clone the repo and open the index.html file in your favorite browser.
If you want to edit the code, (maybe add your own levels in the levels.ts file?), feel free
to edit and then run

```
$ npm run build
```

to rebuild the bundle.js with webpack. Happy gaming/hacking!

## Editing

### Want to create your own levels?

head to levels/levels.ts, create a level setting function, and add it to the levels
array.

### Want to create your own enemy or game object?

head to game-objects/game-object.ts, check out the structure of the GameObject
base class, and feel create to create a version of that class by passing in your own movement/alive functions, or for
even more custom behavior derive a new class from GameObject

### Want to add some new screen/state to the game (help menu, pause menu, etc.)?

check out the state-machine dir and
feel free to implement your own State object which can define its own entry and exit behavior, as well as regular
behavior to follow when in that state.
