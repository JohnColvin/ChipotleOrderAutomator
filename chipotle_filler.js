var ChipotleFiller = {

  selectEntree: function(entree) {
    this._entreeRadios().filter('[value="' + entree + '"]').click();
  },

  selectFillings: function(fillings) {
    $.each(fillings, function(index, fillingId) {
      $('input[data-itemid="' + fillingId + '"]').click();
    });
  },

  fillInComment: function(comment) {
    this._commentInput().val(comment);
  },

  addChipsAndDrinks: function(types_and_quantities) {
    $.each(types_and_quantities, function(type, quantity) {
      $('div[data-itemid="' + type + '"] select').val(quantity).change();
    });
  },

  selectTacoQuantity: function(quantity) {
    this._tacoQuantitySelect().val(quantity).change();
  },

  selectMeal: function(meal) {
    ChipotleFiller.selectEntree(meal.entree);
    if (meal.entree == 'TacosMenuItem') {
      ChipotleFiller.selectTacoQuantity(meal.TacoQuantity);
    }
    ChipotleFiller.selectFillings(meal.fillingIds);
    ChipotleFiller.fillInComment(meal.comment);
    ChipotleFiller.addChipsAndDrinks(meal.chipsAndDrinks);
  },

  saveMeal: function() {
    var meal = {};
    meal.entree = this._entreeRadios().filter(':checked').val();
    if (meal.entree == 'TacosMenuItem') {
      meal.TacoQuantity = this._tacoQuantitySelect().val();
    }
    meal.fillingIds = $('input[data-itemid]:checked').map(function(i, input){ return $(input).data('itemid') }).toArray();
    meal.comment = this._commentInput().val();
    meal.chipsAndDrinks = {}
    $('div[data-itemid] select').each(function(i, select) {
      $select = $(select);
      var itemId = $select.closest('div[data-itemid]').data('itemid')
      var quantity = $select.val();
      meal.chipsAndDrinks[itemId] = quantity;
    });
    chrome.storage.sync.set({'chipotle_group_order_meal': meal});
  },

  doIt: function() {
    chrome.storage.sync.get('chipotle_group_order_meal', function(result) {
      meal = result.chipotle_group_order_meal;
      if (meal != undefined) {
        ChipotleFiller.selectMeal(meal);
      }
    });
  },

  fillName: function() {
    var full_name = $("#dvSignIn .signInTitle2 cufon").attr('alt').split('@')[0].toLowerCase();
    names = $.map(full_name.split('.'), function(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    $('#mealName').val(names.join(' '));
  },

  _entreeRadios: function() {
    return $('input[name="entrees"]');
  },

  _tacoQuantitySelect: function() {
    return $('select[name=selectQty]');
  },

  _commentInput: function() {
    return $('#txtAdditional');
  }
}

ChipotleFiller.doIt();

$('#submitGroupOrder a, #addToBag a').click(function() {
  ChipotleFiller.saveMeal();
  setTimeout(ChipotleFiller.fillName, 600);
});