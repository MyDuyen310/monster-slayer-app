function getRandomNum(max, min) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessage: [],
        }
    },
    computed: {
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.playerHealth + "%"
            };
        },
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.monsterHealth + "%"
            };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster"
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player"
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomNum(12, 5);
            this.monsterHealth -= attackValue;
            this.addLogMessage("you", "attack", attackValue)
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomNum(15, 8);
            this.playerHealth -= attackValue;
            this.addLogMessage("monster", "attack", attackValue)
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomNum(15, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage("you", "special attack", attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomNum(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage("you", "heal", healValue)
            this.attackPlayer();
        },
        reStartGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessage = [];
        },
        surrender() {
            this.winner = "monster";
        },
        addLogMessage(who, what, value) {
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },

});
app.mount("#game");