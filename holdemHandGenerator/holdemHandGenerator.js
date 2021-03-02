const originialDeck = [
    { display: 'A', suit: 'spade' },
    { display: '2', suit: 'spade' },
    { display: '3', suit: 'spade' },
    { display: '4', suit: 'spade' },
    { display: '5', suit: 'spade' },
    { display: '6', suit: 'spade' },
    { display: '7', suit: 'spade' },
    { display: '8', suit: 'spade' },
    { display: '9', suit: 'spade' },
    { display: '10', suit: 'spade' },
    { display: 'J', suit: 'spade' },
    { display: 'Q', suit: 'spade' },
    { display: 'K', suit: 'spade' },
    { display: 'A', suit: 'heart' },
    { display: '2', suit: 'heart' },
    { display: '3', suit: 'heart' },
    { display: '4', suit: 'heart' },
    { display: '5', suit: 'heart' },
    { display: '6', suit: 'heart' },
    { display: '7', suit: 'heart' },
    { display: '8', suit: 'heart' },
    { display: '9', suit: 'heart' },
    { display: '10', suit: 'heart' },
    { display: 'J', suit: 'heart' },
    { display: 'Q', suit: 'heart' },
    { display: 'K', suit: 'heart' },
    { display: 'A', suit: 'club' },
    { display: '2', suit: 'club' },
    { display: '3', suit: 'club' },
    { display: '4', suit: 'club' },
    { display: '5', suit: 'club' },
    { display: '6', suit: 'club' },
    { display: '7', suit: 'club' },
    { display: '8', suit: 'club' },
    { display: '9', suit: 'club' },
    { display: '10', suit: 'club' },
    { display: 'J', suit: 'club' },
    { display: 'Q', suit: 'club' },
    { display: 'K', suit: 'club' },
    { display: 'A', suit: 'diamond' },
    { display: '2', suit: 'diamond' },
    { display: '3', suit: 'diamond' },
    { display: '4', suit: 'diamond' },
    { display: '5', suit: 'diamond' },
    { display: '6', suit: 'diamond' },
    { display: '7', suit: 'diamond' },
    { display: '8', suit: 'diamond' },
    { display: '9', suit: 'diamond' },
    { display: '10', suit: 'diamond' },
    { display: 'J', suit: 'diamond' },
    { display: 'Q', suit: 'diamond' },
    { display: 'K', suit: 'diamond' }
]
var App = {
    init: function () {
        var copyDeck = []
        originialDeck.forEach(function (card) {
            copyDeck.push(card)
        })
        this.deck = copyDeck
        var numberOfPlayersSelect = document.querySelector('select.numberOfPlayers')
        this.playerHand(numberOfPlayersSelect.value)
        numberOfPlayersSelect.addEventListener('change', function (e) {
            document.querySelector('div.board').innerHTML = null
            App.playerHand(numberOfPlayersSelect.value)
        })
    },
    reset: function () {
        var board = document.querySelector('div.board')
        var players = document.querySelector('div.players')
        board.innerHTML = null;
        players.innerHTML = null
        this.init();
    },
    randomCard: function () {
        var cardIndex = Math.floor(Math.random() * this.deck.length)
        var randomCard = this.deck[cardIndex]
        this.deck.splice(cardIndex, 1)
        var cardDiv = document.createElement('div')
        cardDiv.className = 'card'
        cardDiv.innerHTML = randomCard.display
        if (randomCard.suit === 'spade') { cardDiv.id = 'spade' }
        else if (randomCard.suit === 'heart') { cardDiv.id = 'heart' }
        else if (randomCard.suit === 'club') { cardDiv.id = 'club' }
        else if (randomCard.suit === 'diamond') { cardDiv.id = 'diamond' }
        return cardDiv
    },
    showHand: function () {
        this.reset();
        // if (document.querySelector('div.playerHand').hasChildNodes()) { return }
        var numberOfPlayersSelect = document.querySelector('select.numberOfPlayers')
        var playerNumber = numberOfPlayersSelect.value
        for (var i = 1; i <= playerNumber; i++) {
            var playerHand = document.getElementById('player' + i)
            for (var runTwice = 0; runTwice < 2; runTwice++) { playerHand.appendChild(this.randomCard()) }
        }
    },
    showBoard: function () {
        var board = document.querySelector('div.board')
        if (board.childElementCount === 5) {
            this.showWinner();
        }
        else if (board.childElementCount < 3) {
            for (var i = 0; i < 3; i++) {
                board.appendChild(this.randomCard())
            }
        }
        else if (board.childElementCount < 5) {
            board.appendChild(this.randomCard())
        }
    },
    playerHand: function (numberOfPlayers) {
        document.querySelector('div.players').innerHTML = null
        for (var i = 1; i <= numberOfPlayers; i++) {
            var playerDiv = document.createElement('div')
            playerDiv.className = 'playerHand'
            playerDiv.id = 'player' + (i)
            document.querySelector('div.players').appendChild(playerDiv)
        }
        debugger;
        if (numberOfPlayers === '1') {
                document.querySelector('div.showHand').innerHTML = 'Generate hand';
        } else {
            document.querySelector('div.showHand').innerHTML = 'Generate hands';
        }
    },
    scoreKeeper: function () {

    },
    showWinner: function () {
        var board = document.querySelector('div.board');
        var players = document.querySelector('div.players');
        var comparedCards = []
        var winningHand;
        var winningHand2;
        var winningHandStrength = 0;
        var winningHandStrength2 = 0;
        for (var card of board.childNodes) {
            var cardDisplay = card.innerHTML;
            if (cardDisplay.includes("A")) {
                cardDisplay = 14;
            }
            else if (cardDisplay.includes("K")) {
                cardDisplay = 13;
            }
            else if (cardDisplay.includes("Q")) {
                cardDisplay = 12;
            }
            else if (cardDisplay.includes("J")) {
                cardDisplay = 11;
            }
            comparedCards.push({ value: parseInt(cardDisplay), suit: card.id })
        }
        for (var playerHand of players.childNodes) {
            for (var playerCard of playerHand.childNodes) {
                var cardDisplay = playerCard.innerHTML;
                if (cardDisplay.includes("A")) {
                    cardDisplay = 14;
                }
                else if (cardDisplay.includes("K")) {
                    cardDisplay = 13;
                }
                else if (cardDisplay.includes("Q")) {
                    cardDisplay = 12;
                }
                else if (cardDisplay.includes("J")) {
                    cardDisplay = 11;
                }
                comparedCards.push({ value: parseInt(cardDisplay), suit: playerCard.id })
            }
            var playerHandStrength = this.compareHandStrength(comparedCards);
            if (playerHandStrength > winningHandStrength) {
                winningHandStrength = playerHandStrength;
                winningHand = playerHand;
            }
            else if (playerHandStrength === winningHandStrength) {
                winningHandStrength2 = playerHandStrength;
                winningHand2 = playerHand;
            }
            comparedCards.splice(5, 2);
        }
        if (winningHandStrength === winningHandStrength2) {
            winningHand.className = "winningHand"
            winningHand2.className = "winningHand"
        } else {
            winningHand.className = "winningHand"
        }
    },
    compareHandStrength: function (comparedCards) {
        var handStrength = 0;
        var comparedOrganized = [];
        for (var i = 2; i <= 14; i++) {
            for (var comparedIndex in comparedCards) {
                if (comparedCards[comparedIndex].value === i) {
                    comparedOrganized.push(comparedCards[comparedIndex]);
                }
            }
        }
        var match1 = {matchCounter: 0, matchValue: 0, matchSetEnd: false};
        var match2 = {matchCounter: 0, matchValue: 0 , matchSetEnd: false};
        var match3 = {matchCounter: 0, matchValue: 0};
        
        for (var i = 0; i < 6; i++) {
            if (comparedOrganized[1 + i].value - comparedOrganized[i].value === 0) {
                if (match1['matchSetEnd'] === false) {
                    match1['matchCounter']++
                    match1['matchValue'] = comparedOrganized[i].value
                    // matchCounter++
                    // matchValue = comparedOrganized[i].value
                }
                else if (match2['matchSetEnd'] === false) {
                    match2['matchCounter']++
                    match2['matchValue'] = comparedOrganized[i].value
                    // matchCounter2++
                    // matchValue2 = comparedOrganized[i].value
                }
                else {
                    match3['matchCounter']++
                    match3['matchValue'] = comparedOrganized[i].value
                    // matchCounter3++;
                    // matchValue3 = comparedOrganized[i].value
                }
            }
            else if (match2['matchCounter'] !== 0) {
                match2['matchSetEnd'] = true;
            }
            else if (match1['matchCounter'] !== 0) {
                match1['matchSetEnd'] = true;
            }
        }
        if (this.royalFlushCheck(comparedCards)) {
            handStrength = this.royalFlushCheck(comparedCards);
        }
        else if (this.straightFlushCheck(comparedOrganized)) {
            handStrength = this.straightFlushCheck(comparedOrganized);
        }
        else if (this.fourOfAKindCheck(match1, match2)) {
            handStrength = this.fourOfAKindCheck(match1, match2);
        }
        else if (this.fullHouseCheck(match1, match2, match3)) {
            handStrength = this.fullHouseCheck(match1, match2, match3);
        }
        else if (this.flushCheck(comparedOrganized)) {
            handStrength = this.flushCheck(comparedOrganized);
        }
        else if (this.straightCheck(comparedOrganized)) {
            handStrength = this.straightCheck(comparedOrganized);
        }
        else if (this.threeOfAKindCheck(match1)) {
            handStrength = this.threeOfAKindCheck(match1);
        }
        else if (this.twoPairCheck(match1, match2, match3)) {
            handStrength = this.twoPairCheck(match1, match2, match3);
        }
        else if (this.pairCheck(match1)) {
            handStrength = this.pairCheck(match1);
        }
        else {
            handStrength = this.highCardCheck(comparedOrganized);
        }
        return handStrength;
    },
    royalFlushCheck: function (comparedCards) {
        for (var i = 0; i < 4; i++) {
            var suit = i === 0 ? 'spade' : i === 1 ? 'heart' : i === 2 ? 'club' : 'diamond';
            var royalFlushCounter = 0;
            for (var j = 10; j <= 14; j++) {
                if (comparedCards.some((e) => (e.value === j && e.suit === suit))) {
                    royalFlushCounter++;
                    if (royalFlushCounter === 5) {
                        return 9;
                    }
                }
            }
        }
    },
    straightFlushCheck: function (comparedOrganized) {
        var straightFlushCounter = 0;
        for (var i = 0; i < 6; i++) {
            if (comparedOrganized[1 + i].value - comparedOrganized[i].value === 1) {
                if (comparedOrganized[1 + i].suit === comparedOrganized[i].suit) {
                    straightFlushCounter++
                    if (straightFlushCounter === 4) {
                        return 8 + comparedOrganized[1 + i].value * Math.pow(10, -2);

                    }
                } else {
                    for (var j = 2; j <= 3; j++) {
                        if (comparedOrganized[i + j]) {
                            if (comparedOrganized[i].suit === comparedOrganized[i + j].suit) {
                                straightFlushCounter++;
                                break;
                            }
                        }
                    }
                }
            }
            else if (comparedOrganized[1 + i].value - comparedOrganized[i].value !== 0) {
                straightFlushCounter = 0;
            }
        }
        for (var i = 0; i < 4; i++) {
            var suit = i === 0 ? 'spade' : i === 1 ? 'heart' : i === 2 ? 'club' : 'diamond';
            var lowStraightFlushCounter = 0;
            for (var j = 2; j <= 5; j++) {
                if (comparedOrganized.some((e) => (e.value === j && e.suit === suit))) {
                    lowStraightFlushCounter++;
                    if (lowStraightFlushCounter === 4) {
                        if (comparedOrganized.some((e) => (e.value === 14 && e.suit === suit))) {
                            return 8;
                        }
                    }
                }
            }
        }
    },
    fourOfAKindCheck: function (match1, match2) {
        if (match1['matchCounter'] === 3) {
            return 7 + match1['matchValue'] * Math.pow(10, -2);
        }
        else if (match2['matchCounter'] === 3) {
            return 7 + match2['matchValue'] * Math.pow(10, -2);
        }
    },
    fullHouseCheck: function (match1, match2, match3) {
        if (match1['matchCounter'] === 2 && match2['matchCounter'] === 1) {
            var handStrength = 6 + match3['matchValue'] * Math.pow(10, -2) + match2['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
        else if (match3['matchCounter'] === 1 && match2['matchCounter'] === 2) {
            var handStrength = 6 + match2['matchValue'] * Math.pow(10, -2) + match3['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
        else if (match3['matchCounter'] === 1 && match1['matchCounter'] === 2) {
            var handStrength = 6 + match1['matchValue'] * Math.pow(10, -2) + match3['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
        else if (match2['matchCounter'] === 2 && match1['matchCounter'] === 2) {
            var handStrength = 6 + match2['matchValue'] * Math.pow(10, -2) + match1['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
        else if (match1['matchCounter'] === 2 && match2['matchCounter'] === 1) {
            var handStrength = 6 + match1['matchValue'] * Math.pow(10, -2) + match2['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
        else if (match1['matchCounter'] === 1 && match2['matchCounter'] === 2) {
            var handStrength = 6 + match2['matchValue'] * Math.pow(10, -2) + match1['matchValue'] * Math.pow(10, -4)
            handStrength = Math.round(handStrength * 10000) / 10000;
            return handStrength;
        }
    },
    flushCheck: function (comparedOrganized) {
        var spadeCounter = 0;
        var heartCounter = 0;
        var clubCounter = 0;
        var diamondCounter = 0;
        for (var comparedCard of comparedOrganized) {
            if (comparedCard.suit === 'spade') { spadeCounter++ }
            else if (comparedCard.suit === 'heart') { heartCounter++ }
            else if (comparedCard.suit === 'club') { clubCounter++ }
            else if (comparedCard.suit === 'diamond') { diamondCounter++ }
        }
        if (spadeCounter > 4) {
            for (var i = 6; i >= 0; i--) {
                if (comparedOrganized[i].suit === 'spade') {
                    return 5 + comparedOrganized[i].value * Math.pow(10, -2);
                }
            }
        }
        else if (heartCounter > 4) {
            for (var i = 6; i >= 0; i--) {
                if (comparedOrganized[i].suit === 'heart') {
                    return 5 + comparedOrganized[i].value * Math.pow(10, -2);
                }
            }
        }
        else if (clubCounter > 4) {
            for (var i = 6; i >= 0; i--) {
                if (comparedOrganized[i].suit === 'club') {
                    return 5 + comparedOrganized[i].value * Math.pow(10, -2);
                }
            }
        }
        else if (diamondCounter > 4) {
            for (var i = 6; i >= 0; i--) {
                if (comparedOrganized[i].suit === 'diamond') {
                    return 5 + comparedOrganized[i].value * Math.pow(10, -2);
                }
            }
        }
    },
    straightCheck: function (comparedOrganized) {
        var straightCounter = 0;
        for (var i = 0; i < 6; i++) {
            if (comparedOrganized[1 + i].value - comparedOrganized[i].value === 1) {
                straightCounter++
                if (straightCounter === 4) {
                    return 4 + comparedOrganized[1 + i].value * Math.pow(10, -2);

                }
            }
            else if (comparedOrganized[1 + i].value - comparedOrganized[i].value !== 0) {
                straightCounter = 0;
            }
        }
        var comparedValue = comparedOrganized.map((e) => e.value);
        if (comparedValue.includes(14) && comparedValue.includes(2) && comparedValue.includes(3) &&
            comparedValue.includes(4) && comparedValue.includes(5)) {
            return 4;
        }
    },
    threeOfAKindCheck: function (match1) {
        if (match1['matchCounter'] === 2) {
            return 3 + match1['matchValue'] * Math.pow(10, -2);
        }
    },
    twoPairCheck: function (match1, match2, match3) {
        if (match3['matchCounter'] === 1 && match2['matchCounter'] === 1) {
            return 2 + match3['matchValue'] * Math.pow(10, -2) + match2['matchValue'] * Math.pow(10, -4);
        }
        else if (match1['matchCounter'] === 1 && match2['matchCounter'] === 1) {
            return 2 + match2['matchValue'] * Math.pow(10, -2) + match1['matchValue'] * Math.pow(10, -4);
        }
    },
    pairCheck: function (match1) {
        if (match1['matchCounter'] === 1) {
            return 1 + match1['matchValue'] * Math.pow(10, -2);
        }
    },
    highCardCheck: function (comparedOrganized) {
        var handStrength = 0
        comparedOrganized.splice(0, 2);
        handStrength += comparedOrganized[4].value * Math.pow(10, -2);
        handStrength += comparedOrganized[3].value * Math.pow(10, -4);
        handStrength += comparedOrganized[2].value * Math.pow(10, -6);
        handStrength += comparedOrganized[1].value * Math.pow(10, -8);
        handStrength += comparedOrganized[0].value * Math.pow(10, -10);
        handStrength = Math.round(handStrength * 10000000000) / 10000000000;
        return handStrength;
    },
}
App.init()

/*
1) Similar Pair, Two Pair, Three of a Kind, Full House, and Four of a Kind does not check for high cards.
2) Currently can only display a two way tie, three way or more ties undetectable.
*/