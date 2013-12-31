var ChipotleSelector = {
  entreeRadios: function() {
    return $('input[name="entrees"]');
  },

  tacoQuantitySelect: function() {
    return $('select[name=selectQty]');
  },

  commentInput: function() {
    return $('#txtAdditional');
  }
}