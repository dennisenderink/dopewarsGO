// Initialize Cloud Firestore through Firebase

'use strict';

function initFirestore() {

    var buttonGameNew = $('[data-game-start]');
    var buttonGameEnd = $('[data-game-end]');

    var buttonGameWon = $('[data-game-end]');
    var buttonGameLost = $('[data-game-end]');

    //var gamesPlayed = fb.currentUser.gamesPlayed;
    //console.log(gamesPlayed);

    buttonGameNew.on('tap', function() {
        updateScore('gamesPlayed', 1)
    })
}

function updateScore(property, change) {
    // New modular function for button handling.
    // Optimal: call function like: updateScore(killedByHardass, 1); and add one to your deaths deu to hardass.

        var fb = firebase.auth();
        var userId = fb.currentUser.uid;

        var arcadeName = readCookie('playerName');

        var fs = firebase.firestore();
        // Below are same results
        var userData = fs.collection('players').doc(userId);
        // But I prefer this one
        var userData = fs.doc('players/'+ userId);

        var propertyNew;

        userData.get().then(function(doc) {
        if (doc.exists) {
            //console.log("Document data:", doc.data());

            // increment data by one
            // See: https://firebase.google.com/docs/database/web/read-and-write#save_data_as_transactions
            if (doc.data()[property] < 1) {
                propertyNew = 1;
            } else {
                propertyNew = doc.data()[property] + change;
            }

            userData.update({
                uid: userId,
                arcadeName: arcadeName,
                // This does not work!
                property: propertyNew
            });
        } else {
            console.log("No such document!");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
}

window.onload = function() {
    initFirestore();
}