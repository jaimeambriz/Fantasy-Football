function PlayersService(callback) {
    var playersData = [];
    var myTeam = [];
    var players = []

    this.getPlayers = function () {
        return JSON.parse(JSON.stringify(players))
    }

    this.getMyTeam = function () {
        return (JSON.parse(JSON.stringify(myTeam)))
    }

    // this.getPlayersByName = function (name) {
    //     players = []
    //     var name = name.toLowerCase()
    //     return playersData.filter(function (player) {
    //         if (player.firstname.toLowerCase() == name || player.lastname.toLowerCase() == name || player.fullname.toLowerCase() == name) {
    //             if (player.jersey !== undefined) {
    //                 if (player.photo !== "http://sports.cbsimg.net/images/players/unknown-player-170x170.png") {
    //                     players.push(player);
    //                 }
    //             }
    //         }
    //     });
    //     return players
    // }

    this.getPlayersBySearch = function (input) {
        var teams = [{
            name: "seahawks",
            city: "seattle",
            abbreviation: "sea"}, {
            name: "patriots",
            city: "new england",
            abbreviation: "ne"}, {
            name: "cardinals",
            city: "arizona",
            abbreviation: "ari"}, {
            name: "falcons",
            city: "atlanta",
            abbreviation: "atl"}, {
            name: "ravens",
            city: "baltimore",
            abbreviation: "bal"}, {
            name: "bills",
            city: "buffalo",
            abbreviation: "buf"}, {
            name: "panthers",
            city: "carolina",
            abbreviation: "car"}, {
            name: "bears",
            city: "chicago",
            abbreviation: "chi"}, {
            name: "bengals",
            city: "cincinnati",
            abbreviation: "cin"}, {
            name: "cowboys",
            city: "dallas",
            abbreviation: "dal"}, {
            name: "broncos",
            city: "denver",
            abbreviation: "den"}, {
            name: "lions",
            city: "detroit",
            abbreviation: "det"}, {
            name: "packers",
            city: "green bay",
            abbreviation: "gb"}, {
            name: "texans",
            city: "huston",
            abbreviation: "hou"}, {
            name: "colts",
            city: "indianapolis",
            abbreviation: "ind"}, {
            name: "jaguars",
            city: "jacksonville",
            abbreviation: "jax"}, {
            name: "chiefs",
            city: "kansas city",
            abbreviation: "kc"}, {
            name: "vikings",
            city: "minnesota",
            abbreviation: "min"}, {
            name: "saints",
            city: "new orleans",
            abbreviation: "no"}, {
            name: "giants",
            city: "new york",
            abbreviation: "nyg"}, {
            name: "jets",
            city: "new york",
            abbreviation: "nyj"}, {
            name: "raiders",
            city: "oakland",
            abbreviation: "oak"}, {
            name: "eagles",
            city: "philadelphia",
            abbreviation: "phi"}, {
            name: "steelers",
            city: "pitssburgh",
            abbreviation: "pit"}, {
            name: "chargers",
            city: "los asngeles",
            abbreviation: "lac"}, {
            name: "rams",
            city: "los angeles",
            abbreviation: "lar"}, {
            name: "49ers",
            city: "san fransisco",
            abbreviation: "sf"}, {
            name: "buccaneers",
            city: "tampa bay",
            abbreviation: "tb"}, {
            name: "titans",
            city: "tennessee",
            abbreviation: "ten"}, {
            name: "redskins",
            city: "washington",
            abbreviation: "was"}, {
            name:"browns",
            city:"clevland",
            abbreviation:"cle"
            }]
        var input = input.toLowerCase()
        players = []
        for (var i = 0; i < teams.length; i++) {
            var team = teams[i];
            if (team.name == input || team.city == input) {
                input = team.abbreviation
            }
            }
        playersData.filter(function (player) {
            //player[searchtype].toLowerCase() == input
            if (player.pro_team.toLowerCase() == input || player.firstname.toLowerCase() == input || player.position.toLowerCase() == input || player.lastname.toLowerCase() == input || player.fullname.toLowerCase() == input) {
                if (player.jersey !== undefined) {
                    if (player.photo !== "http://sports.cbsimg.net/images/players/unknown-player-170x170.png") {
                        players.push(player);
                    }
                }
            }
        });
    }

    // this.getPlayersByTeam = function (input) {
    //     return playersData.filter(function (player) {
    //         if (player.pro_team == team || player.firstname == team) {

    //             return true;
    //         }
    //     });
    // }

    // this.getPlayersByPosition = function (position) {
    //     players = []
    //     return playersData.filter(function (player) {
    //         if (player.position.toLowerCase() == position.toLowerCase()) {
    //             if (player.jersey !== undefined) {
    //                 if (player.photo !== "http://sports.cbsimg.net/images/players/unknown-player-170x170.png") {
    //                     players.push(player);
    //                 }
    //             }
    //         }
    //     });
    //     return players
    // }

    
    this.addToTeam = function (id) {
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            if (id == player.id && myTeam.length < 9) {
                myTeam.push(player)
                players.splice(i, 1)
            }
        }
        removePlayer(id)
    }
    this.removeFromTeam = function (id) {
        for (var i = 0; i < myTeam.length; i++) {
            var player = myTeam[i];
            if (id == player.id) {
                players.push(player)
                playersData.push(player)
                myTeam.splice(i, 1)
            }
        }
    }

    function removePlayer(id){
        for (var i = 0; i < playersData.length; i++) {
            var player = playersData[i];
            if (player.id == id){
                playersData.splice(i, 1)
            }
        }
    }

    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 
        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return callback();
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            callback()
            console.log(playersData)
        });
    }
    loadPlayersData(); //call the function above every time we create a new service
    // console.log(playersData)
}
