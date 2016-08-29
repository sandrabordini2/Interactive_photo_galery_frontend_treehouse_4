var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $caption = $("<p></p>");
var $nextPhoto = $('<div class="next-arrow"></div>');
var $prevPhoto = $('<div class="prev-arrow"></div>');

var imgArray = []; // images array
var counter = 0;

$overlay.append($image);
$overlay.append($caption);
$("body").append($overlay);

// when image is clicked
$("#gallery a").click(function(event){
event.preventDefault();
counter = 0;
i = 0;
var imageLocation = $(this).attr("href");
$("#gallery a").each(function(){
  i++;
  if ($(this).attr("href") === imageLocation ) {
          counter = i - 1;
  }
});


$image.attr("src", imageLocation);
$overlay.fadeIn();

var captionText = $(this).children("img").attr("alt");
$caption.text(captionText);

// arrows
$overlay.append($prevPhoto);
$overlay.append($nextPhoto);

});

//close overlay on mouse click

$overlay.click(function(){
$overlay.fadeOut(600);

});

// fill array with items

function populateArray() {
$(".gallery-item a").each(function() {
var itemObject = {
                itemURL : $(this).attr("href"),
			          itemCaption : $(this).children("img").attr("alt"),
			          itemType : "image"
              };
                imgArray.push(itemObject);

});
}


// Search

var $items = $(".gallery-item"); // get all the elements

$("#img_caption_search").keyup(function() {
var term = $.trim($(this).val()).toLowerCase();
$items.each(function(){

var altText = $(this).children("a").children("img").attr("alt").toLowerCase();

if (altText.indexOf(term) > -1) {
	$(this).removeClass("hide").fadeIn(); 
    
} else {
	$(this).fadeOut().addClass("hide"); 
    
}

});
});

populateArray();

// Arrows

function getNextItem() {
// check if counter is at the end. if not, +1
// else, go back to first image
if (counter < imgArray.length - 1 && counter >= 0) {
counter++;
} else {
counter = 0;
}
updateOverlay();
}

function getPrevItem() {
// check if counter is at the beginning. if not, -1
// else, go back to last image
if (counter <= imgArray.length - 1 && counter > 0) {
counter--;
} else {
counter = imgArray.length - 1;
}
updateOverlay();
}

function updateOverlay() {

$image.attr("src", imgArray[counter].itemURL);
$caption.text(imgArray[counter].itemCaption);

// animate the image
$image.hide();
$image.fadeIn();

// show captions
$caption.hide();
$caption.fadeIn();

}

//when next is clicked
$nextPhoto.click(function(event) {
getNextItem(1);
return false;
});

//when previous is clicked
$prevPhoto.click(function(event) {
getPrevItem(-1);
return false;
});


// esc key function.

    $(document).keydown(function(e) {
        if (e.which == 27) {
            $overlay.click();
        }
    });

    // next key function.


    $(document).keydown(function(e) {
        if (e.which == 39) {
            $nextPhoto.click();
        }
    });


    // previous key function.


    $(document).keydown(function(e) {
        if (e.which == 37) {
            $prevPhoto.click();
        }
    });