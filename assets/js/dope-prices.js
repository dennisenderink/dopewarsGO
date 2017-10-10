// Dope prices

'use strict';

var cash = 2000;
function updateCash() {
    $('[js-cash]').find('span').html(cash);
};
updateCash();

$('.button--disabled').on('click', function(e) {
    e.preventDefault;
    e.stopPropagation;
});

// Dope constructor function
function Dope(name, priceMin, priceMax, amount) {
    this.name = name
    this.priceMin = priceMin;
    this.priceMax = priceMax;
    this.amount = amount;
    this.priceCurr = function() {
        var randomPrice = Math.floor(Math.random() * ((this.priceMax - this.priceMin)) + 1);
    };
};

// Dope object instance
var dope1 = new Dope('ludes', 11, 60, 0),
    dope2 = new Dope('peyote', 100, 700, 0),
    dope3 = new Dope('shrooms', 600, 1400, 0),
    dope4 = new Dope('heroin', 1200, 4000, 0);

var dopelist = [dope1, dope2, dope3, dope4];

var dopelist = {
    dopename: [
        {
            'name': 'ludes',
            'minPrice': 11,
            'maxPrice': 60,
            'amount': 0
        },
        {
            'name': 'peyote',
            'minPrice': 100,
            'maxPrice': 700,
            'amount': 0
        },
        {
            'name': 'shrooms',
            'minPrice': 600,
            'maxPrice': 1400,
            'amount': 0
        },
        {
            'name': 'heroin',
            'minPrice': 1200,
            'maxPrice': 4000,
            'amount': 0
        }
    ]
};

dopelist.dopename.forEach(function(dopeIteration) {
    var dopeTable = $('[js-dope-table-content]');
    dopeTable.append('\
        <tr js-dope js-dope-'+dopeIteration.name+'>\
            <td><button class="button button--trade button--buy">+</button></td>\
            <td>'+dopeIteration.name+'</td>\
            <td js-dope-price></td>\
            <td js-dope-amount></td>\
            <td><button class="button button--trade button--sell">-</button></td>\
        </tr>\
    ');
    setRandomPrices();
    $('[js-dope-amount]').html(dopeIteration.amount);
});

$('[js-button-scootch]').on('click', function() {
    setRandomPrices();
});

function setRandomPrices() {
    dopelist.dopename.forEach(function(dopeIteration) {
        var randomPrice = Math.floor(Math.random() * ((dopeIteration.maxPrice - dopeIteration.minPrice)) + 1);
        $('[js-dope-'+dopeIteration.name+']').find('[js-dope-price]').html(randomPrice);
    });
};

updateButtons();

$('.button--buy').each(function() {
    var myRow = $(this).closest('tr');
    $(this).on('click', function() {
        var cashTrade = parseInt(myRow.find('[js-dope-price]').html());
        cash = cash - cashTrade;
        updateCash();
        updateButtons();
        updateDopeAmount(1);
    });
});

$('.button--sell').each(function() {
    var myRow = $(this).closest('tr');
    $(this).on('click', function() {
        var cashTrade = parseInt(myRow.find('[js-dope-price]').html());
        cash = cash + cashTrade;
        updateCash();
        updateButtons();
        updateDopeAmount(-1);
    });
});

function updateButtons() {
    dopelist.dopename.forEach(function(dopeIteration) {
        if (dopeIteration.amount <= 0) {
            $('[js-dope-'+dopeIteration.name+']').find('.button--sell').addClass('button--disabled');
        } else {
            $('[js-dope-'+dopeIteration.name+']').find('.button--sell').removeClass('button--disabled');
        }
        var currDopePrice = parseInt($('[js-dope-'+dopeIteration.name+']').find('[js-dope-price]').html());
        if (currDopePrice > cash) {
            $('[js-dope-'+dopeIteration.name+']').find('.button--buy').addClass('button--disabled');
        } else {
            $('[js-dope-'+dopeIteration.name+']').find('.button--buy').removeClass('button--disabled');
        }
    });
};

function updateDopeAmount(changeAmount) {


};
