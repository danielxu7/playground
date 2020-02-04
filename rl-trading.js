// ==UserScript==
// @name         Rocket League Garage
// @namespace    https://github.com/danielxu7/playground
// @version      1.0
// @description  Automates RL trades.
// @author       You
// @match        https://rocket-league.com/trades/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    var arr = [];

    // declare functions
    var checkTime = function (i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    var updateTrade = function (index) {
        if (index === arr.length) {
            var today = new Date();
            var time = today.getHours() + ":" + checkTime(today.getMinutes());
            window.location.href = window.location.href.split('?')[0] + '?rltime=' + time;
            return;
        }
        var myWindow = window.open(arr[index]);
        var myLoad = function () {
            try {
                myWindow.document.querySelector('.rlg-btn-trade-form.rlg-btn-primary').click();
                setTimeout(function () {
                    myWindow.close();
                    // recursively update following trades
                    setTimeout(function () {
                        updateTrade(index + 1);
                    }, 8000);
                }, 8000);
            } catch (e) {
                myWindow.close();
                updateTrade(index + 1)
            }
        }
        myWindow.addEventListener('load', myLoad, false);
    }
    var initiate = function () {
        $('#rlg-automate-trades').val('Updating trades!')
        updateTrade(0);
    };

    // determine if the trades were just refreshed
    var inputText;
    const urlParams = new URLSearchParams(window.location.search);
    const rltime = urlParams.get('rltime');

    if (rltime) {
        inputText = 'Updated at ' + rltime + '. Automate again?';
    } else {
        inputText = 'Automate trades';
    }

    // add a button to start automation
    $('body').append('<input type="button" value="' + inputText + '" id="rlg-automate-trades">')
    $('#rlg-automate-trades').css('position', 'fixed').css('top', 0).css('left', 0).css('z-index', 99999).css('color', 'black');
    $('#rlg-automate-trades').click(initiate);

    $('.rlg-trade-display-container .rlg-trade-actions p a:nth-child(2)').each(function (index, element) {
        arr.push(element.href);
    });
    setInterval(() => {
        $('#rlg-automate-trades').click();
    }, 1000 * 60 * 40);
})();
