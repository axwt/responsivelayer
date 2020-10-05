function makeLayerResponsive() {

  if (app.activeViewer) app.activeViewer.setActive();

  var comp = app.project.activeItem,
    selectedLayers,
    responsiveNull; // controller layer for background layer

  if (!comp || !(comp instanceof CompItem)) return !!alert("構図を開いてください");
  if (!comp.selectedLayers.length) return !!alert("レイヤーを選択してください");

  selectedLayers = comp.selectedLayers;

  app.beginUndoGroup("Add res controller");

  responsiveNull = comp.layers.addNull(comp.duration);;
  responsiveNull.name = 'レスポンシブコントローラー';
  responsiveNull.label = 0;
  responsiveNull.enabled = false;
  responsiveNull.transform.anchorPoint.setValue([50, 50]);
  responsiveNull.transform.position.expression = '[thisComp.width/2, thisComp.height/2]';
  responsiveNull.transform.scale.expression = 'origDimension = [' + comp.width + ', ' + comp.height + '];\n' +
    'x = thisComp.width;\n' +
    'y = thisComp.height;\n' +
    'r = origDimension[0]/origDimension[1];\n' +
    '(x/y >= r) ? [x,x] : [y * r, y * r];';


  for (var l = 0; l < selectedLayers.length; l++) {

    var layer = selectedLayers[l];
    var posValue = layer.transform.position;

    layer.parent = responsiveNull;

  }

  app.endUndoGroup();

};

makeLayerResponsive();