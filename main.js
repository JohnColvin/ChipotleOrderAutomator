ChipotleFiller.doIt();

$('#submitGroupOrder a, #addToBag a').click(function() {
  ChipotleSaver.saveMeal();
  setTimeout(ChipotleFiller.fillName, 600);
});