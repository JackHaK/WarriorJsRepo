class Player {
  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   */
  playTurn(warrior) {
    // Cool code goes here
    var spaceAhead = warrior.feel();
    if(spaceAhead.isEmpty()){
      warrior.walk();
    }
    else{
      if(spaceAhead.isUnit()){
        var unit = warrior.feel().getUnit();
        if(unit.isEnemy()){
          warrior.attack();
        }
        else{
          //do nothing for now
        }
      }
    }
  }
}
