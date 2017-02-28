var cell, layoutTarget, opt, data, img, cloneImg, cloneImg2, leftVertDiv, rightVertDiv;
var currentLayout = {cell1: "", cell2: "", cell3: "", layoutName: ""};
var savedLayouts = [];
/*we need variables to keep track of splits; this way we can allow multiple splits while allowing the user to switch from vertical to horizontal and vice versa; this sort of acts like a "marker"; the reason we need this is so that we can clear the div and make way for a new split, either hor or vert*/
var vertSplit = 0;
var horSplit = 0;
var currentDiv;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();

  data = ev.dataTransfer.getData("text");
  //get the image being dragged
  img = document.getElementById(data);
  //clone the image that is dragged
  cloneImg = img.cloneNode(true);
  //appendChild() inserts the cloned node to the document
  ev.target.appendChild(cloneImg);

  if (ev.target.id === "div1") {
    // alert("target equals div1")
    currentLayout.cell1 = data;
  } else if (ev.target.id === "div2") {
    currentLayout.cell2 = data;
  } else if (ev.target.id === "div3"){
    currentLayout.cell3 = data;
  }

  //display alert message after drop
  // alert("drop was successful! " + data + " was dropped into " + ev.target.id);
}

function addCell() {
  cell = document.createElement("div");
  document.getElementById("newCell").appendChild(cell);
}

function removeCell() {
  cell = document.getElementById("newCell");
  cell.removeChild(cell.childNodes[0]);
}

function updateDropdownMenu() {
  var myDropDownMenu = document.getElementById("dropDown");

  //now, populate the dropdown with the saved layouts
  opt = document.createElement("option");
  for (var i = 0; i < savedLayouts.length; i++) {
    opt.innerHTML = savedLayouts[i].layoutName;
    opt.value = savedLayouts[i].layoutName;
    myDropDownMenu.appendChild(opt);
  }
}

function clearLayout() {
  currentLayout = {cell1: "", layoutName: ""};
  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  //we need to reset vertSplit or else the number will be held in memory even after we clear layout
  vertSplit = 0;
}

function save() {
  if (currentLayout.cell1 === "" && currentLayout.cell2 === "" && currentLayout.cell3 === "") {
    alert("You didn't drag and drop an image onto a cell. Please do that first before saving a layout.");
  } else {
    currentLayout.layoutName = "layout" + (savedLayouts.length + 1);

    savedLayouts.push(currentLayout);

    updateDropdownMenu();
    clearLayout();
  }
}

function load() {
  // alert(document.getElementById(savedLayouts[0].cell1));

  document.getElementById("div1").innerHTML = "";
  document.getElementById("div2").innerHTML = "";
  document.getElementById("div3").innerHTML = "";
  // // alert("hi " + currentLayout.layoutName);
  if (document.getElementById("dropDown").length === 0) {
    alert("Oops. there is nothing to load. Try saving a layout first.");
  }

  var dropDownValue = document.getElementById("dropDown").value;

  for (var i = 0; i < savedLayouts.length; i++) {
    if (dropDownValue == savedLayouts[i].layoutName) {
      //append clones to dom
      //if document.getElementById(savedLayouts[0].cellx) != null, do append
      if (document.getElementById(savedLayouts[0].cell1) != null) {
        //get image
        var image1 = document.getElementById(savedLayouts[i].cell1);
        //clone image
        var cloneImg1 = image1.cloneNode(true);
        //append to DOM
        document.getElementById("div1").appendChild(cloneImg1);
      }

      if (document.getElementById(savedLayouts[0].cell2) != null) {
        var image2 = document.getElementById(savedLayouts[i].cell2);
        var cloneImg2 = image2.cloneNode(true);
        document.getElementById("div2").appendChild(cloneImg2);
      }

      if (document.getElementById(savedLayouts[0].cell3) != null) {
        var image3 = document.getElementById(savedLayouts[i].cell3);
        var cloneImg3 = image3.cloneNode(true);
        document.getElementById("div3").appendChild(cloneImg3);
      }
    }
  }
}

/**************************/
/********SPLIT DIVS********/
/**************************/
function chooseDiv() {
  currentDiv;

  var dropDownValue = document.getElementById("selectCell").value;

  if (dropDownValue === "cell1") {
    currentDiv = "div1";
  } else if (dropDownValue === "cell2") {
    currentDiv = "div2";
  } else if (dropDownValue === "cell3") {
    currentDiv = "div3";
  }
}

/*used for creating new nodes; apparently, we can't re-use the same node when appending to a div*/
function cloneRepository() {
  cloneImg = img.cloneNode(true);
  cloneImg2 = img.cloneNode(true);
}

function splitVertical() {
  chooseDiv();
  cloneRepository();
  vertSplit++;
  //clear the html before creating the inner divs
  /*if no clear is done, divs will stack vertically each time user clicks on a split button*/
  if (vertSplit === 1) {
    document.getElementById(currentDiv).innerHTML = "";
  }
  if (horSplit > 0) {
    document.getElementById(currentDiv).innerHTML = "";
  }
  
  leftVertDiv = document.createElement("div");
  rightVertDiv = document.createElement("div");

  //if cell is empty, let user split it if they want
  //but how do we find out if cell is "empty"?

  //append image onto divs
  leftVertDiv.append(cloneImg);
  rightVertDiv.append(cloneImg2);

  //style divs
  leftVertDiv.style.cssText = "width: 60px; height: 120px; border: .5px solid black";
  rightVertDiv.style.cssText = "width: 60px; height: 120px; border: .5px solid black;";

  /*gives a side by side look for the inner divs*/
  leftVertDiv.style.display = "inline-block";
  /*removes space between the two inner divs; the small space is a result of using inline-block display*/
  leftVertDiv.style.display = "table-cell";
  rightVertDiv.style.display = "inline-block";
  rightVertDiv.style.display = "table-cell";

  //append div to dom
  document.getElementById(currentDiv).appendChild(leftVertDiv);
  document.getElementById(currentDiv).appendChild(rightVertDiv);
  horSplit = 0;
}

// //this fn works, but only for splitting empty divs
// function splitVertical() {
//   // alert("you pressed the split vert btn");
//   chooseDiv();
//   vertSplit++;
//   //clear the html before creating the inner divs
//   /*if no clear is done, divs will stack vertically each time user clicks on a split button*/
//   if (horSplit > 0) {
//     document.getElementById(currentDiv).innerHTML = "";
//   }
//
//   //create new divs
//   var leftVertDiv = document.createElement("div");
//   var rightVertDiv = document.createElement("div");
//   //style divs
//   leftVertDiv.style.cssText = "width: 60px; height: 120px; border: 1px solid black";
//   rightVertDiv.style.cssText = "width: 60px; height: 120px; border: 1px solid black";
//
//   /*gives a side by side look for the inner divs*/
//   leftVertDiv.style.display = "inline-block";
//   /*removes space between the two inner divs; the small space is a result of using inline-block display*/
//   leftVertDiv.style.display = "table-cell";
//   rightVertDiv.style.display = "inline-block";
//   rightVertDiv.style.display = "table-cell";
//
//   //append div to dom
//   document.getElementById(currentDiv).appendChild(leftVertDiv);
//   document.getElementById(currentDiv).appendChild(rightVertDiv);
//   horSplit = 0;
// }

function splitHorizontal() {
  chooseDiv();
  horSplit++;
  if (vertSplit > 0) {
    document.getElementById(currentDiv).innerHTML = "";
  }
  //create new divs
  var topHorDiv = document.createElement("div");
  var bottomHorDiv = document.createElement("div");
  //style divs
  topHorDiv.style.cssText = "width: 120px; height: 60px; border: 1px solid black";
  bottomHorDiv.style.cssText = "width: 120px; height: 60px; border: 1px solid black";

  // topHorDiv.style.display = "inline-block";
  // topHorDiv.style.display = "table-cell";
  // bottomHorDiv.style.display = "inline-block";
  // bottomHorDiv.style.display = "table-cell";

  //append divs to dom
  document.getElementById(currentDiv).appendChild(topHorDiv);
  document.getElementById(currentDiv).appendChild(bottomHorDiv);
  vertSplit = 0;
}



//Issue 1
/***********************************/
/*swap layout divs on drag and drop*/
/***********************************/
//code not swapping divs but is allowing drop
//we need to get the div we are dragging from
// var originalDiv = cloneImg;
//we need to assign our target drop
// var targetDiv = ev.currentTarget.firstElementChild;
//replace the targetDiv with the data (i.e. originalDiv with the image)
// ev.currentTarget.replaceChild(cloneImg, targetDiv);
// originalDiv.appendChild(cloneImg);

//Issue 3
/*user drops image onto all three cells and saves layout 1, then creates and saves a new layout 2 with images in cell1 and cell3; when loading layout 2, the image in cell3 will not appear*/

//Issue 4
/*user drops image onto cell2 and cell3 and saves layout 1, then creates and saves a new layout 2 with images in cell1 and cell 3; when loading layout 2, the images will not appear at all*/

//Issue 5
/*splitVertical (with an image in a cell) only works if it is the second button that is pressed; in other words, for splitVertical to work as expected, the user has to press splitHorizontal first before pressing splitVertical*/

//Issue 2 (issue went away; not sure why)
/*when user drops image from pallet onto layout, say cell1, and the user drops another image on top of cell1, that image will appear in cell3, regardless of whether cell2 or cell3 are occupied or not, if the user 1) saves the current layout (after doing the 2nd drop on cell1), and 2) loads the layout; don't know why this is happening; try looking at drop function*/
