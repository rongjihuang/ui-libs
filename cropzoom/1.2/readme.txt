http://www.cropzoom.com.ar/
http://www.cropzoom.com.ar/documentation/

This plugin require: JQuery 1.4+,  JQuery UI 1.8+

CropZoom is a plugin that let you select an area of an image and then crop it.
whit this tool you also will be able to zoom in or to zoom out, to drag and also rotate an image.
this plugin needs ui.droppable, ui.resizable, ui.slider from JQuery UI to work.
Some code was taken from jquery.svgdom.js Written by Keith Wood.

Documentation
Requirements and Implementation
This plugin require: JQuery 1.4+,  JQuery UI 1.8+

<link href="css/jquery-ui-1.7.2.custom.css" rel="Stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.8.2.custom.min.js"></script>
<script type="text/javascript" src="js/jquery.cropzoom.js"></script>
$(document).ready(function(){
          var cropzoom = $('#crop_container2').cropzoom({
            width:400,
            height:300,
            bgColor: '#CCC',
            enableRotation:true,
            enableZoom:true,
            zoomSteps:10,
            rotationSteps:10,
            expose:{
                slidersOrientation: 'horizontal',
                zoomElement: '#zoom',
                rotationElement: '#rot',
                elementMovement:'#movement'
            },
            selector:{
              centered:true,
              borderColor:'blue',
              borderColorHover:'yellow'
            },
            image:{
                source:'chicas1024.jpg',
                width:1024,
                height:768,
                minZoom:50,
                maxZoom:200,
                startZoom:40,
                useStartZoomAsMinZoom:true,
                snapToContainer:true
            }
        });
});
Documentation
General parameters
Parameter Name	Default	Description
width	640	Width of the Container
Height	480	Height of the Container
bgColor	#000	Background of the Container
overlayColor	#000	Color of the overlay layer when drag the selector
enableRotation	true	Enable/Disable the rotation slider
enableZoom	true	Enable/Disable the zoom slider
rotationSteps	5	Set the steps for the rotation slider
zoomSteps	1	Set the steps for the zoom slider
restore		this restore the plugin to the original values
send		this method will send the information to the server for cropping.
Parameters
url: location of the server file to process the cropping
type: post / get
custom: json object to add in the request e.g. {id=1,username=’jhon’}
onSuccess: callback to get the response of the request.
e.g: cropzoom.send(‘process.php’,'POST’,{id:1},function(r){ alert(r); });

Selector Properties, Callbacks, methods.
Parameter Name	Default	Description
showPositionsOnDrag	true	Enable/Disable info of X and Y axis in the selector
showDimetionsOnDrag	true	Enable/Disable info of width and height in the selector
borderColor	yellow	Change the border color of the selector
borderColorHover	red	Change the border color of the selector on mouse over
Centered	false	Center the selector in the container
x	0	x axis value from selector
y	0	y axis value from selector
w	229	width of the selector (you can resize to this value as minimum)
h	100	height of the selector (you can resize to this value as minimum)
aspectRatio	false	this keep the aspect ratio of the selector when resize
maxWidth	null	this will be the limit of the selector width
maxHeight	null	this will be the limit of the selector height
bgInfoLayer	#FFF	this will be set the background-color of the info layer that appears over the selector
infoFontSize	10	this will be set the font-size of the info layer that appears over the selector
infoFontColor	blue	this will be set the font color of the info layer that appears over the selector
startWithOverlay	false	this will be turn on the dark overlay at start
hideOverlayOnDragAndResize	true	this will be turn on or turn of the dark overlay when you drag or resize.
setSelector		this method will positioned the selector in the axis given and set the width and height, the last parameter is if this transition will be animated fires when the selector is dragged
Parameters
x: value for x axis
y: value for y axis
w: value for width
h: value for height
animated: true/false
e.g: cropzoom.setSelector(15,15,200,100,true);

onSelectorDrag		fires when the selector is dragged
Parameters
object: selector
positions: x,y, width and height of the selector
onSelectorDragStop		fires when the selector drag stop
Parameters
object: selector
positions: x,y, width and height of the selector
onSelectorResize		fires when the selector is resized
Parameters
object: selector
positions: x,y, width and height of the selector
onSelectorResizeStop		fires when the selector resize stop
Parameters
object: selector
positions: x,y, width and height of the selector
Expose Properties.
Parameter Name	Default	Description
slidersOrientation	horizontal	set the direction of the zoom and rotation sliders into the exposed element
zoomElement	NULL	the DOM Element that will contain the zoom slider.
rotationElement	NULL	the DOM Element that will contain the rotation slider
elementMovement	NULL	the DOM Element that will contain the MOVEMENT CONTROL
movementSteps	5	number of pixel that the image will move when click on one of the buttons into the MOVEMENT CONTROL
Image Properties, Callbacks and methods.
Parameter	Default	Description
source		path of the image to use
rotation	0	rotation in degrees of the image
x NEW	0	x axis value
y NEW	0	y axis value
width	0	original width of the image
height	0	original height of the image
minZoom	10	percent of the minimum zoom of the image
maxZoom	150	percent of the maximum zoom of the image
startZoom	50	percent of the starting zoom of the image
useStartZoomAsMinZoom	true	use the minZoom property as startZoom promerty startZoom will be ignored
snapToContainer	false	this allow to drag the image into the container boundaries.
onZoom		fires when the image is zommed
Parameters
object: image
positions: x,y, width and height of the image
onRotate		fires when the image is rotated
Parameters
object: image
degrees: number of degrees
onImageDrag		fires when the image is dragged
Parameters
object: image
positions: x,y, width and height of the image