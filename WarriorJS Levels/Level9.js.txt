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
    this.startPivot = 1;
  }

  playTurn(warrior) {
    // Cool code goes here
    var lookingDirection = this.direction;
    var spaceAhead = warrior.feel(lookingDirection);
    var gettingAttacked = this.checkHp(warrior);
    var enemyAhead = this.checkForRanged(warrior,'forward');
    var enemyBehind = this.checkForRanged(warrior, 'backward');
    var needToHeal = this.shouldHeal(warrior);
    
    //check if you can shoot anything?
    if(this.startPivot > 0){
      warrior.pivot();
      this.startPivot--;
      return;
    }

    //LOOK BEHIND YOU
    if(!enemyAhead && enemyBehind){
      warrior.pivot();
      return;
    }
    else if(enemyAhead){
      warrior.shoot();
      return;
    }

    //not being attacked and need to heal
    if(!gettingAttacked && needToHeal){
      warrior.rest();
      return;
    }
    else if(gettingAttacked){
      warrior.pivot();
      return;
    }

    //walk if space empty an no enemies
    else if(spaceAhead.isEmpty()){
      warrior.walk(lookingDirection);
      return;
    }
    else if(spaceAhead.isUnit()){
        var unit = warrior.feel(lookingDirection).getUnit();
        if(this.shouldAttack(unit)){
          warrior.attack(lookingDirection);
          return;
        }
        else if(unit.isBound()){
          warrior.rescue(lookingDirection);
          return;
        }
    }
    else if(spaceAhead.isWall()){
      warrior.pivot();
      return;
    }
    
    this.lastHp = warrior.health();
  }

//check if being attacked
  checkHp(warrior){
      if(warrior.health() < this.lastHp){
        return true;
      }
      return false;
  }

//should i heal?
  shouldHeal(warrior){
      return warrior.health() < warrior.maxHealth();
  }

//is the target infront an enemy?
  shouldAttack(unit){
      if(unit.isEnemy()){
        return true;
      }
      else{
        return false;
      }
  }

//is there an attackable enemy first in line?
  checkForRanged(warrior, direction){
    var spaceArray = warrior.look(direction);
    for (var i = 0; i < spaceArray.length; i++){
      if(spaceArray[i].isUnit()){
        var unit = spaceArray[i].getUnit();
        if(unit.isEnemy()){
          return true;
        }
        else{
          return false
        }
      }
    }
  }

}
