class Player {
  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   */
  playTurn(warrior) {
    // Cool code goes here
    var spaceAhead = warrior.feel();

    //useful functions
    function shouldHeal(){
      return warrior.health() < (warrior.maxHealth() / 2);
    }

    function shouldAttack(unit){
      if(unit.isEnemy()){
          return true;
        }
        else{
          return false;
        }
    }

    //walk if space empty
    if(spaceAhead.isEmpty() && shouldHeal()){
      warrior.rest();
    }
    else if(spaceAhead.isEmpty()){
      warrior.walk();
    }
    else{
      if(spaceAhead.isUnit()){
        var unit = warrior.feel().getUnit();
        if(shouldAttack(unit)){
          warrior.attack();
        }
      }
    }
  }
}
