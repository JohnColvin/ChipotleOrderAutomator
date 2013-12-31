var ChipotleFiller = {

  _selectEntree: function(entree) {
    ChipotleSelector.entreeRadios().filter('[value="' + entree + '"]').click();
  },

  _selectFillings: function(fillings) {
    $.each(fillings, function(index, fillingId) {
      $('input[data-itemid="' + fillingId + '"]').click();
    });
  },

  _fillInComment: function(comment) {
    ChipotleSelector.commentInput().val(comment);
  },

  _addChipsAndDrinks: function(types_and_quantities) {
    $.each(types_and_quantities, function(type, quantity) {
      $('div[data-itemid="' + type + '"] select').val(quantity).change();
    });
  },

  _selectTacoQuantity: function(quantity) {
    ChipotleSelector.tacoQuantitySelect().val(quantity).change();
  },

  _selectMeal: function(meal) {
    this._selectEntree(meal.entree);
    if (meal.entree == 'TacosMenuItem') {
      this._selectTacoQuantity(meal.TacoQuantity);
    }
    this._selectFillings(meal.fillingIds);
    this._fillInComment(meal.comment);
    this._addChipsAndDrinks(meal.chipsAndDrinks);
  },

  _selectStoredMeal: function(result) {
    meal = result.chipotle_group_order_meal;
    if (meal != undefined) { ChipotleFiller._selectMeal(meal); }
  },

  doIt: function() {
    chrome.storage.sync.get('chipotle_group_order_meal', ChipotleFiller._selectStoredMeal)
  },

  fillName: function() {
    var full_name = $("#dvSignIn .signInTitle2 cufon").attr('alt').split('@')[0].toLowerCase();
    names = $.map(full_name.split('.'), function(name) {
      return name.charAt(0).toUpperCase() + name.slice(1);
    });

    $('#mealName').val(names.join(' '));
  },
}