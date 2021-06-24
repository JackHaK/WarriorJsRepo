class Player {
  /**
   * Plays a warrior turn.
   *
   * @param {Warrior} warrior The warrior.
   *
   */
  constructor() {
    this.lastHp;
    this.direction = 'forward';
    this.stepBackCount = 1;
    }

  playTurn(warrior) {
    // Cool code goes here
    var spaceAhead = warrior.feel(this.direction);
    var gettingAttacked = this.checkHp(warrior);

    //only works for one axis
    if(gettingAttacked && spaceAhead.isEmpty()){
      if(this.stepBackCount > 0){
        warrior.walk('backward');
        this.stepBackCount--;
      } 
      else{
        warrior.walk(this.direction)
      };
      
    }
    //not being attacked and need ot heal
    else if(spaceAhead.isEmpty() && this.shouldHeal(warrior)){
      warrior.rest();
    }
    //walk if space empty an no enemies
    else if(spaceAhead.isEmpty()){
      warrior.walk(this.direction);
    }
    else{
      if(spaceAhead.isUnit()){
        var unit = warrior.feel(this.direction).getUnit();
        if(this.shouldAttack(unit)){
          warrior.attack(this.direction);
        }
        else if(unit.isBound()){
          warrior.rescue(this.direction);
        }
      }
    }

    if(spaceAhead.isWall()){
      this.findDirection(warrior)
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

  findDirection(warrior){
    warrior.pivot();
  }

}
