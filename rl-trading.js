// ==UserScript==
// @name         Rocket League Garage
// @namespace    https://github.com/danielxu7/playground
// @version      0.1
// @description  Automates RL trades.
// @author       You
// @match        https://rocket-league.com/trades/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
    var arr = [];

    // declare functions    
    var updateTrade = function(index) {
        if (index === arr.length) {
            return;
        }
        var myWindow = window.open(arr[index]);
        var myLoad = function() {
            try {
                myWindow.document.querySelector('.rlg-btn-trade-form.rlg-btn-primary').click();
                setTimeout(function() {
                    myWindow.close();
                    // recursively update following trades
                    setTimeout(function() {
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
    var initiate = function() {
        updateTrade(0);
    };

    // add a button to start automation
    $('body').append('<input type="button" value="Automate trades" id="rlg-automate-trades">')
    $('#rlg-automate-trades').css('position', 'fixed').css('top', 0).css('left', 0).css('z-index', 99999).css('color', 'black');
    $('#rlg-automate-trades').click(function() {
        initiate();
        setInterval(() => {
            initiate();
        }, 1000 * 60 * 60);
    });

    $('.rlg-trade-display-container .rlg-trade-actions p a:nth-child(2)').each(function(index, element) {
        arr.push(element.href);
    });
})();
