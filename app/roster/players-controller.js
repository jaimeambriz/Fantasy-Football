function PlayersController() {

    var loading = true; //Start the spinner
    var playersService = new PlayersService(ready);

    function ready() {
        loading = false; //stop the spinner

        
    }
    // this.getPlayersByName = function getPlayersByName(e) {
    //     e.preventDefault();
    //     var player = e.target.player.value;
    //     playersService.getPlayersByName(player)
    //     updateRoster(playersService.getPlayers()) 
    // }
    
    this.getPlayersBySearch = function getPlayersBySearch(e) {
        e.preventDefault();
        var team = e.target.team.value;
        playersService.getPlayersBySearch(team)
        updateRoster(playersService.getPlayers()) 
    }

  // this.getPlayersByTeam = function getPlayersByTeam(e) {
    //     e.preventDefault();
    //     var team = e.target.team.value;
    //     updateRoster(playersService.getPlayersByTeam(team)) 
    // }  

    //  this.getPlayersByPosition = function getPlayersByPosition(e) {
    //     e.preventDefault();
    //     var position = e.target.position.value;
    //     playersService.getPlayersByPosition(position)
    //     updateRoster(playersService.getPlayers()) 
    //   }


    function updateRoster(players) {
        var template = ""
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
          <div class="player-card">
          <img src="${player.photo}" alt="">
          <h1>${player.fullname}</h1>
          <h2>${player.position}</h2>
          <h3>${player.pro_team}, ${player.jersey}</h3>
          <button class="btn-success" id="${player.id}" onclick="app.controllers.playersController.add('${player.id}')">Add to Team</button>
      </div>
          `
        }
        document.getElementById("player-roster").innerHTML = template
    }

    function updateMyTeam(players) {
        var template = ""
        for (var i = 0; i < players.length; i++) {
            var player = players[i];
            template += `
          <div class="player-card">
          <img src="${player.photo}" alt="">
          <h1>${player.fullname}</h1>
          <h2>${player.position}</h2>
          <h3>${player.pro_team}, ${player.jersey}</h3>
          <button class="btn-danger" id="${player.id}" onclick="app.controllers.playersController.remove('${player.id}')">Remove From Team</button>
      </div>
          `

        }
        document.getElementById("my-team").innerHTML = template
    }

    this.add = function add(id) {
        playersService.addToTeam(id)
        updateRoster(playersService.getPlayers())
        updateMyTeam(playersService.getMyTeam())
    }

    this.remove = function remove(id) {
        playersService.removeFromTeam(id)
        updateRoster(playersService.getPlayers())
        updateMyTeam(playersService.getMyTeam())
    }

}