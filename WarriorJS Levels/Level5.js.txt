class Player {
  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   *
   */
  constructor() {
    this.lastHp;

    }

  playTurn(warrior) {
    // Cool code goes here
    var spaceAhead = warrior.feel();
    var gettingAttacked = this.checkHp(warrior);

    //walk if space empty
    if(gettingAttacked && spaceAhead.isEmpty()){
      warrior.walk();
    }
    else if(spaceAhead.isEmpty() && this.shouldHeal(warrior)){
      warrior.rest();
    }

    else if(spaceAhead.isEmpty()){
      warrior.walk();
    }
    else{
      if(spaceAhead.isUnit()){
        var unit = warrior.feel().getUnit();
        if(this.shouldAttack(unit)){
          warrior.attack();
        }
        else if(unit.isBound()){
          warrior.rescue();
        }
      }
    }
    
    this.lastHp = warrior.health();
  }

  checkHp(warrior){
      if(warrior.health() < this.lastHp){
        return true;
      }
      return false;
  }

  shouldHeal(warrior){
      return warrior.health() < warrior.maxHealth();
  }

  shouldAttack(unit){
      if(unit.isEnemy()){
          return true;
        }
        else{
          return false;
        }
    } 

}
