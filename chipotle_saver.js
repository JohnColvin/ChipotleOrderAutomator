var ChipotleSaver = {

  saveMeal: function() {
    this.meal = {};
    this._saveEntree();
    if (this.meal.entree == 'TacosMenuItem') {
      this._saveTacoQuantity();
    }
    this._saveFillings();
    this._saveComment();
    this._saveChipsAndDrinks();
    chrome.storage.sync.set({'chipotle_group_order_meal': this.meal});
  },

  _saveEntree: function() {
    this.meal.entree = ChipotleSelector.entreeRadios().filter(':checked').val();
  },

  _saveTacoQuantity: function() {
    this.meal.TacoQuantity = ChipotleSelector.tacoQuantitySelect().val();
  },

  _saveChipsAndDrinks: function() {
    this.meal.chipsAndDrinks = {};
    meal = this.meal;
    $('div[data-itemid] select').each(function(i, select) {
      var $select = $(select);
      var itemId = $select.closest('div[data-itemid]').data('itemid')
      var quantity = $select.val();
      meal.chipsAndDrinks[itemId] = quantity;
    });
  },

  _saveComment: function() {
    this.meal.comment = ChipotleSelector.commentInput().val();
  },

  _saveFillings: function() {
    this.meal.fillingIds = $('input[data-itemid]:checked').map(function(i, input){ return $(input).data('itemid') }).toArray();
  }
}