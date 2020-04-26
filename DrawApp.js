$(function(){
   
    // declare varibles

    //painting/eraising or not
    var paint = false; 

    //painting or eraising
    var paint_erase = "paint"; 

    //get canvas and context
    var canvas = document.getElementById("paint");
        var ctx = canvas.getContext("2d");

        //get the canvas container
        var container = $("#container");

        //mouse position
        var mouse = {x: 0, y: 0};

        //onload load saved work from localStorage
        if(localStorage.getItem("imgCanvas") != null){
           var img = new Image();
           img.onload = function(){
               ctx.drawImage(img, 0, 0);
           }
           img.src = 
           localStorage.getItem("imgCanvas");
        };
        //set drawing parameters (lineWidth, lineJoin, lineCap)
    // set line width
    ctx.lineWidth = 3;
    // set line color
    ctx.lineCap = "round";
    // set line join style(bevel, round, miter);
    ctx.lineJoin = "round";

//click inside container
    container.mousedown(function(){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft; //distance between container and left border of the page
        mouse.y = e.pagey - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });


// move the mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft; //distance between container and left border of the page
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
                } else {
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    //mouse up -> not painting/erasing anymore
    container.mouseup(function(){
        paint = false;
    });

    //if we leave the container we are not painting/erasing anymore
    container.mouseup(function(){
        paint = false;
    });

    //click on the reset button
    $("#reset").click(function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint_erase = "paint";
      $("#erase").removeClass("eraseMode");
    });
    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        } else {
            window.alert("your browser does not support local storage!");
        } 
    });

    //click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint") {
            paint_erase = "erase";
        } else {
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
            });

    //change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color", $(this).val());     
    });
    //change linewidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });

});



