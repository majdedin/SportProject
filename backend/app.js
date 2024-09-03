//import express module
const express = require('express');
//import multer module
const multer = require('multer');
//import body-parser module
const bodyParser = require('body-parser');
//import mongoose module
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/sprotDB');
//ipmorter bcrypt module
const bcrypt = require('bcrypt');
//importer jsonwebtoke module
const jwt = require('jsonwebtoken');
//importer  express-session module
const session = require('express-session');
//import path module
const path = require('path');

//create express application (app)
const app = express();

//app configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join('backend/images')))
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) { cb(null, 'backend/images') }
  }, 
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + '-' + Date.now() + '-crococoder-' + '.' + extension; cb(null, imgName);
  }
});


//models importations
const Match = require("./models/match");
const Player = require("./models/player");
const Team = require("./models/team");
const User = require("./models/user");
const user = require('./models/user');

// Security configuration
app.use((req, res, next) => {
  //* n'importe quelle FN
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(

    "Access-Control-Allow-Headers",

    "Origin, Accept, Content-Type, X-Requested-with, Authorization"

  );

  res.setHeader(

    "Access-Control-Allow-Methods",

    "GET, POST, DELETE, OPTIONS, PATCH, PUT"

  );

  next();

});
const secretKey = 'your-secret-key';
app.use(session({
  secret: secretKey,
}));

matchesTab = [
  { id: 1, scoreOne: 3, scoreTwo: 2, teamOne: "RMD", teamTwo: "FCB" },
  { id: 2, scoreOne: 4, scoreTwo: 4, teamOne: "EST", teamTwo: "MC" },
  { id: 3, scoreOne: 3, scoreTwo: 4, teamOne: "LIV", teamTwo: "ARS" },
];
playersTab = [
  { id: 1, name: 'cristiano', number: 7, age: 35, position: "ATK" },
  { id: 2, name: 'cristiano', number: 7, age: 35, position: "ATK" },
  { id: 3, name: 'cristiano', number: 7, age: 35, position: "ATK" },

];
teamsTab = [
  { id: 1, foundation: 1919, owner: "hamdi", name: "EST" },
  { id: 2, foundation: 1919, owner: "hamdi", name: "EST" }
]
//traitement logique des requetes
//business logic
//business logic :add user
app.post("/users/signup", multer({ storage: storage }).single('img'),  (req, res) => {
  console.log("Here into BL:Add Match", req.body);
  //let user=new User(req.body);
  User.findOne({ email: req.body.email }).then(
    (doc) => {
      console.log("here user object", doc);
      if (doc) {
        res.json({ msg: "user exist" })
      } else {
        bcrypt.hash(req.body.password, 10).then(
          (cryptedpassword) => {
            console.log("here crypted passxord", cryptedpassword);
            req.body.password=cryptedpassword;
            // if (req.file) {
            //   req.body.avatar=`http://localhost:3000/images/${req.file.filename}`
            // } else {
            //   req.body.avatar =`http://localhost:3000/images/avatar.jpg`
            // }
            (req.file)?
            req.body.avatar=`http://localhost:3000/images/${req.file.filename}`:
             req.body.avatar =`http://localhost:3000/images/avatar.jpg`;
            // req.body.avatar=`http://localhost:3000/images/${req.file.filename}`
            let userObj = new User(req.body);
            userObj.save();
            res.json({ msg: "added with succes" });
          }
        )


      }
    }
  )

});
//business logic : add Match
app.post("/matches", (req, res) => {
  console.log("Here into BL:Add Match", req.body);
  //create match instance (type:Match)
  let match = new Match(req.body);
  //insert/save match into matches (collection name)
  match.save();
  res.json({ msg: "added with succes" });
  //res.json({isAdded:true});
});
//business logic : Edit Match
app.put("/matches", (req, res) => {
  console.log("Here into BL:Edit Match", req.body);
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then(
    (result) => {
      console.log("here result after update", result);
      if (result.nModified == 1) {
        res.json({ msg: "ok" });
      } else {
        res.json({ msg: "Not ok" });
      }
    }
  );

});
//business logic : Edit Team
app.put("/teams", (req, res) => {
  console.log("Here into BL:Edit team", req.body);
  let newTeam = req.body;
  Team.updateOne({ _id: newTeam._id }, newTeam).then(
    (result) => {
      if (result.nModified == 1) {
        res.json({ msg: "ok" });
      } else {
        res.json({ msg: "Not ok" });
      }
    }
  );

});
//business logic : Edit player
app.put("/players", (req, res) => {
  console.log("Here into BL:Edit player", req.body);
  let newPlayer = req.body;
  Player.updateOne({ _id: newPlayer._id }, newPlayer).then(
    (result) => {
      if (result.nModified = 1) {
        res.json({ msg: "ok" });
      } else {
        res.json({ msg: "Not ok" });
      }
    }
  );

  res.json({ msg: "ok" });
});
//business logic : get all Matches

app.get("/matches", (req, res) => {
  console.log("Here into BL:Get All Matches");
  Match.find().then(
    (docs) => {
      console.log("Here all matches from collection", docs);
      res.json({ T: docs })
    }
  );
});
//business logic : get Match by Id

app.get("/matches/:id", (req, res) => {
  console.log("Here into BL:Get Match by id", req.params.id);
  let matchId = req.params.id;
  Match.findById(matchId).then(
    (doc) => {
      console.log("here doc", doc);
      res.json({ match: doc })
    }
  );

});
//business logic : get team by Id

app.get("/teams/:id", (req, res) => {
  console.log("Here into BL:Get team by id", req.params.id);
  let teamId = req.params.id;
  Team.findById(teamId).then(
    (doc) => {
      res.json({ team: doc })
    }
  );
});
//business logic : get player by Id ////

app.get("/players/:id", (req, res) => {
  console.log("Here into BL:Get Player by id");
  let playerId = req.params.id;
  Player.findById(playerId).then(
    (doc) => {
      res.json({ player: doc })
    }
  );

});
// delete match
app.delete("/matches/:id", (req, res) => {
  console.log("Here into BL:Delete Match", req.params.id);
  let matchId = req.params.id;
  Match.deleteOne({ _id: matchId }).then(
    (result) => {
      console.log("here delete after result", result);
      if (result.deletedCount == 1) {
        res.json({ isDeletd: true });
      } else {
        res.json({ isDeletd: false });
      }
    }
  )

});

//business logic : get all players
app.get("/players", (req, res) => {
  console.log("Here into BL:Get All players");
  Player.find().then(
    (docs) => {
      console.log("Here all players from collection", docs);
      res.json({ T: docs })
    }
  );
});

//business logic : get all teams
app.get("/teams", (req, res) => {
  console.log("Here into BL:Get All players");
  Team.find().then(
    (docs) => {
      res.json({ teams: docs });
    }
  );

});

//business logic :delete team
app.delete("/teams/:id", (req, res) => {
  console.log("Here into BL:Delete team", req.params.id);
  let teamId = req.params.id;
  Team.deleteOne({ _id: teamId }).then(
    (result) => {
      console.log("here delete after result", result);
      if (result.deletedCount == 1) {
        res.json({ isDeletd: true });
      } else {
        res.json({ isDeletd: false });
      }
    }
  );

});

//business logic :delete player
app.delete("/players/:id", (req, res) => {
  console.log("Here into BL:Delete players", req.params.id);
  let playerId = req.params.id;
  Player.deleteOne({ _id: playerId }).then(
    (result) => {
      console.log("here delete after result", result);
      if (result.deletedCount == 1) {
        res.json({ isDeletd: true });
      } else {
        res.json({ isDeletd: false });
      }
    }
  );


});
//business logic :add team
app.post("/teams", (req, res) => {
  console.log("Here into BL:Add teams", req.body);
  let team = new Team(req.body);
  //insert and save
  team.save();
  res.json({ msg: "added with succes" });
  //res.json({isAdded:true});
});
//business logic :add player
app.post("/players", (req, res) => {
  console.log("Here into BL:Add teams", req.body);
  let player = new Player(req.body);
  //insert
  player.save();
  res.json({ msg: "added with succes" });
  //res.json({isAdded:true});
});
//business logic :search match
app.post("/matches/search", (req, res) => {
  console.log("Here search match", req.body);
  let match = req.body;
  let search = matchesTab.filter((elt) => elt.scoreOne == match.scoreOne && elt.scoreTwo == match.scoreTwo);
  res.json({ search: search });

});
//business logic :search player
app.post("/players/searchPlayer", (req, res) => {
  console.log("Here search player", req.body);
  let player = req.body;
  let search = playersTab.filter((elt) => elt.age == player.age);
  res.json({ search: search });

});
//business logic : login
app.post("/users/login", (req, res) => {
  console.log("here into BL", req.body);
  //search User by Email
  user.findOne({ email: req.body.email }).then(
    (doc) => {
      console.log("here doc by email", doc);
      if (!doc) {
        res.json({ msg: "email does not exist" })
      } else {
        //compare pwds
        bcrypt.compare(req.body.password, doc.password).then(
          (result) => {
            console.log("here result from bcrypt", result);
            if (result) {
              let userToSend = {
                id: doc._id,
                fName: doc.firstName,
                LName: doc.lastName,
                role: doc.role,
                avatar:doc.avatar,
              }
              let token = jwt.sign(userToSend, secretKey, { expiresIn: '1h' })
              res.json({ msg: "welcome", user: token })
            } else {
              res.json({ msg: "check your password" })
            }

          }
        )
      }

    }
  )
})


//make app importable from another files
module.exports = app;