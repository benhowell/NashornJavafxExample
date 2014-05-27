load("fx:base.js");
load("fx:controls.js");
load("fx:graphics.js");

var File = Java.type("java.io.File");

function start(primaryStage) {
  primaryStage.title = "Slideshow";

  var images = new java.util.ArrayList();
  var captions = new java.util.ArrayList();
  
  var root = new StackPane();
  var gridpane = new GridPane();
  var heading = new Label("My Aussie Slideshow");
  heading.setStyle("-fx-font-size: 30pt;");
  
  gridpane.add(heading, 0, 0); // c, r
  
  var imageView = new ImageView();
  imageView.setImage(new Image(fileToURL("Footy.png")));
  images.add(imageView);
  captions.add("Footy");
  imageView = new ImageView();
  imageView.setImage(new Image(fileToURL("Warnie.png")));
  images.add(imageView);
  captions.add("Warnie");
  imageView = new ImageView();
  imageView.setImage(new Image(fileToURL("Servo.png")));
  images.add(imageView);
  captions.add("Servo");
  
  var cur = 0;
  
  var borderpane = new BorderPane(images[cur]);
  BorderPane.setAlignment(images[cur], Pos.CENTER);
  gridpane.add(borderpane, 0, 1); // c, r
  GridPane.setHalignment(borderpane, HPos.CENTER)
  
  var col = new ColumnConstraints();
  col.setPercentWidth(100);
  col.setHalignment(HPos.CENTER);
  gridpane.getColumnConstraints().addAll(col);

  var caption = new Label(captions[cur]);
  caption.setStyle("-fx-font-size: 30pt;");
  gridpane.add(caption, 0, 2); // c, r
  
  var hbox = new HBox();
  var separator = new Separator();
  separator.maxWidth(12);
  separator.setStyle("visibility: hidden;");
  
  var prevButton = new Button();
  prevButton.text = "<- Back";
  prevButton.onAction = function(){
    if(cur > 0)
      cur--;
    else
      cur=images.size() -1;
    borderpane.setCenter(images[cur]);
    caption.text = captions[cur];
  }
  
  var nextButton = new Button();
  nextButton.text = "Next ->";
  nextButton.onAction = function(){
    if(cur < images.size() -1)
      cur++;
    else
      cur=0;
    borderpane.setCenter(images[cur]);
    caption.text = captions[cur];
  }
  
  hbox.getChildren().addAll(prevButton, separator, nextButton);
  
  var buttongrid = new GridPane();
  buttongrid.setAlignment(Pos.CENTER);
  buttongrid.add(hbox, 0, 0);
  gridpane.add(buttongrid, 0, 3); // c, r
  GridPane.setHalignment(hbox, HPos.CENTER)
  
  root.children.add(gridpane);
  primaryStage.scene = new Scene(root, 800, 600);
  primaryStage.show();
}

function fileToURL(file) {
    return new File(file).toURI().toURL().toExternalForm();
}
