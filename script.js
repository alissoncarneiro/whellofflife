var canvas = document.getElementById('myCanvas');
 
        canvas.addEventListener('mousemove', track_mouse, false);
        canvas.addEventListener('click', click_mouse, false);
 
        TextAlignment = {
            Left : 0,
            Center : 1,
            Right : 2,
            Justify : 3
        }
 
        function Point (x, y) {
            this.x = x;
            this.y = y;
        }
 
        function Band (center, minRadius, maxRadius,bandNo) {
            this.bandNo=bandNo;
            this.center = center;
            this.minRadius = minRadius;
            this.maxRadius = maxRadius;
        }
 
        function arc (band, startAngle, endAngle, text,arcNo,alignment) {
            this.position={bandNo:band.bandNo,arcPos:arcNo};
            this.band = band;
            this.startAngle = startAngle;
            this.endAngle = endAngle;
            this.text = text;
            this.alignment = (alignment !== undefined) ? alignment : TextAlignment.Center;
            if (arc.arcs === undefined) {
                arc.arcs = new Array();
            }
            arc.arcs.push(this);
           
        }
        
        arc.prototype.drawArcAfter = function (angle, text) {
                return new arc(this.band, this.endAngle, this.endAngle + angle, text);
            };

        arc.prototype.drawArcAfterUpTo = function (upToArc, text) {
                return new arc(this.band, this.endAngle, upToArc.startAngle, text);
            };
 
        arc.prototype.isInside = function (pos) {
          
                // http://stackoverflow.com/questions/6270785/how-to-determine-whether-a-point-x-y-is-contained-within-an-arc-section-of-a-c
                // Angle = arctan(y/x); Radius = sqrt(x * x + y * y);
                var result = false;
                var radius = Trig.distanceBetween2Points(pos, this.band.center);
                // we calculate atan only if the radius is OK
                if ((radius >= this.band.minRadius) && (radius <= this.band.maxRadius)) {
                     
                    var angle = Trig.angleBetween2Points(this.band.center, pos);
                  
                    var a = (angle < 0) ? angle + 2 * Math.PI : angle;
                    var sa = this.startAngle;
                    var ea = this.endAngle;
                 
                   
                    if (ea > 2 * Math.PI) {
                           
                        sa -= 2 * Math.PI;
                        ea -= 2 * Math.PI;
                    }
 
               if (sa > ea) {
                  
                        sa -= 2 * Math.PI;
                      
                    }
                   
                    if ((a >= sa) && (a <= ea)) {
                        
                        result = true;
                      
                       
                    }
                }
                
                return result;
            };
        
        arc.prototype.higlightIfInside = function (pos) {
                if (this.isInside(pos)) {
                    arc.isHighlighted = this;
                    drawArc(this, true);
                }
            };
        
        arc.prototype.doTask = function (pos) {
              if (this.isInside(pos)) {
                  drawArc(this,true);  
                  alert('You have clicked '+this.text );
                }
            };
        
        arc.lastHighlighted = null;
        arc.isHighlighted = null;
 
        arc.drawAll = function () {
            arc.arcs.forEach(function (a) {
               console.log('Draw arc');
                console.log(a);
                if(a.position.bandNo == 3 && a.position.arcPos == 3){
                     drawArc(a,true);
                }else{
                     drawArc(a);
                }
               
            });
        }
        
        arc.checkMousePos = function (pos) {
            arc.lastHighlighted = arc.isHighlighted;
            arc.isHighlighted = null;
            arc.arcs.forEach(function (a) {
              a.higlightIfInside(pos);
            });
            if ((arc.lastHighlighted !== null) && (arc.isHighlighted != arc.lastHighlighted)) {
               
                drawArc(arc.lastHighlighted);
            }
               
            // set cursor according to the highlight status
             canvas.style.cursor = (arc.isHighlighted !== null) ? 'pointer' : 'default';
            
        }
 
        arc.doTasks = function (pos) {
            arc.arcs.forEach(function (a) {
                a.doTask(pos);
            });
        }
 
        
        var Trig = {
            distanceBetween2Points: function (point1, point2) {
                var dx = point2.x - point1.x;
                var dy = point2.y - point1.y;
                return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            },
            angleBetween2Points: function (point1, point2) {
                var dx = point2.x - point1.x;
                var dy = point2.y - point1.y;
                return Math.atan2(dy, dx);
            },
            angleDiff: function (startAngle, endAngle) {
                var angleDiff = (startAngle - endAngle);
                angleDiff += (angleDiff > Math.PI) ? -2 * Math.PI : (angleDiff < -Math.PI) ? 2 * Math.PI : 0
                return angleDiff;
            }
        }
     
        var center = new Point(canvas.width / 2, canvas.height / 2);

//var totalescala = 10;
//var base = 0.33;
//for (i = 0; i < totalescala; i++) {
//    var ri = new Band(center, 1, 75, 1);
//    var arci = new arc(ri, 0 * Math.PI, 0.33 * Math.PI, i,j);
//
//    for (j = 1; j < totalescala; j++) {
//        var arci = new arc(ri, base * Math.PI, (0.33*2) * Math.PI, i,j);
//
//        text += cars[i] + "<br>";
//    }
//}
var r1 = new Band(center, 1, 75,1);
        var arc1 = new arc(r1, 0 * Math.PI, 0.33 * Math.PI, "1",1);
        var arc1_1 = new arc(r1, 0.33 * Math.PI, 0.66 * Math.PI, "1",2);
        var arc1_2 = new arc(r1, 0.66 * Math.PI, 0.99 * Math.PI, "1",3);
        var arc1_3 = new arc(r1, 0.99 * Math.PI, 1.32 * Math.PI, "1",4);
        var arc1_4 = new arc(r1, 1.32 * Math.PI, 1.65 * Math.PI, "1",5);
        var arc1_5 = new arc(r1, 1.65 * Math.PI, 2 * Math.PI, "1",6);
        var arc1_6 = new arc(r1, 1.98 * Math.PI, 2.33 * Math.PI, "1",7);



var r2 = new Band(center, 75, 110,2);
        var arc2 = new arc(r2, 0 * Math.PI, 0.33 * Math.PI, "2",1);
        var arc2_1 = new arc(r2, 0.33 * Math.PI, 0.66 * Math.PI, "2",2);
        var arc2_2 = new arc(r2, 0.66 * Math.PI, 0.99 * Math.PI, "2",3);
        var arc2_3 = new arc(r2, 0.99 * Math.PI, 1.32 * Math.PI, "2",4);
        var arc2_4 = new arc(r2, 1.32 * Math.PI, 1.65 * Math.PI, "2",5);
        var arc2_5 = new arc(r2, 1.65 * Math.PI, 2 * Math.PI, "2",6);
        var arc2_6 = new arc(r2, 1.98 * Math.PI, 2.33 * Math.PI, "2",7);

        
var r3 = new Band(center, 110, 145,3);
        var arc3 = new arc(r3, 0 * Math.PI, 0.33 * Math.PI, "3",1);
        var arc3_1 = new arc(r3, 0.33 * Math.PI, 0.66 * Math.PI, "3",2);
        var arc3_2 = new arc(r3, 0.66 * Math.PI, 0.99 * Math.PI, "3",3);
        var arc3_3 = new arc(r3, 0.99 * Math.PI, 1.32 * Math.PI, "3",4);
        var arc3_4 = new arc(r3, 1.32 * Math.PI, 1.65 * Math.PI, "3",5);
        var arc3_5 = new arc(r3, 1.65 * Math.PI, 2 * Math.PI, "3",6);
        var arc3_6 = new arc(r3, 1.98 * Math.PI, 2.33 * Math.PI, "3",7);

var r4 = new Band(center, 145, 180,4);
        var arc4   = new arc(r4, 0    * Math.PI, 0.33 * Math.PI, "4",1);
        var arc4_1 = new arc(r4, 0.33 * Math.PI, 0.66 * Math.PI, "4",2);
        var arc4_2 = new arc(r4, 0.66 * Math.PI, 0.99 * Math.PI, "4",3);
        var arc4_3 = new arc(r4, 0.99 * Math.PI, 1.32 * Math.PI, "4",4);
        var arc4_4 = new arc(r4, 1.32 * Math.PI, 1.65 * Math.PI, "4",5);
        var arc4_5 = new arc(r4, 1.65 * Math.PI, 2    * Math.PI, "4",6);
        var arc4_6 = new arc(r4, 1.98 * Math.PI, 2.33 * Math.PI, "4",7);


var r5 = new Band(center, 180, 215,5);
        var arc5   = new arc(r5, 0    * Math.PI, 0.33 * Math.PI, "5",1);
        var arc5_1 = new arc(r5, 0.33 * Math.PI, 0.66 * Math.PI, "5",2);
        var arc5_2 = new arc(r5, 0.66 * Math.PI, 0.99 * Math.PI, "5",3);
        var arc5_3 = new arc(r5, 0.99 * Math.PI, 1.32 * Math.PI, "5",4);
        var arc5_4 = new arc(r5, 1.32 * Math.PI, 1.65 * Math.PI, "5",5);
        var arc5_5 = new arc(r5, 1.65 * Math.PI, 2    * Math.PI, "5",6);
        var arc5_6 = new arc(r5, 1.98 * Math.PI, 2.33 * Math.PI, "5",7);


//var r6 = new Band(center, 215, 250,6);
//        var arc6   = new arc(r6, 0    * Math.PI, 0.33 * Math.PI, "6",1);
//        var arc6_1 = new arc(r6, 0.33 * Math.PI, 0.66 * Math.PI, "6",2);
//        var arc6_2 = new arc(r6, 0.66 * Math.PI, 0.99 * Math.PI, "6",3);
//        var arc6_3 = new arc(r6, 0.99 * Math.PI, 1.32 * Math.PI, "6",4);
//        var arc6_4 = new arc(r6, 1.32 * Math.PI, 1.65 * Math.PI, "6",5);
//        var arc6_5 = new arc(r6, 1.65 * Math.PI, 2 *    Math.PI, "6",6);
//        var arc6_6 = new arc(r6, 1.98 * Math.PI, 2.33 * Math.PI, "6",7);



        var context = canvas.getContext('2d');
 
        arc.drawAll();
 
        function drawArc(arc, isHighlighted) {
            var gapsAtEdgeAngle = Math.PI / 400;
            var isCounterClockwise = false;
 
            var startAngle = arc.startAngle + gapsAtEdgeAngle;
            var endAngle = arc.endAngle - gapsAtEdgeAngle;
            context.beginPath();

            var radAvg = (arc.band.maxRadius + arc.band.minRadius) / 2;
            context.arc(arc.band.center.x, arc.band.center.y, radAvg, startAngle, endAngle, isCounterClockwise);
            context.lineWidth = arc.band.maxRadius - arc.band.minRadius;

            // line color
            context.strokeStyle = isHighlighted ? 'grey' : 'lightgrey';
            context.stroke();

            drawTextAlongArc(arc.text, center, radAvg, startAngle, endAngle, arc.alignment);
        }
 
        function drawTextAlongArc(text, center, radius, startAngle, endAngle, alignment) {
            var fontSize = 12;
            var lineSpacing = 4;
            var lines = text.split('\n');
            var lineCount = lines.length;
 
            radius = radius + (lineCount - 1) / 2 * (fontSize + lineSpacing)
 
            lines.forEach(function (line) {
                drawLineAlongArc(context, line, center, radius, startAngle, endAngle, fontSize, alignment);
                radius -= (fontSize + lineSpacing);
            });           
        }
 
        function drawLineAlongArc(context, str, center, radius, startAngle, endAngle, fontSize, alignment) {
            var len = str.length, s;
            context.save();
 
            context.font = fontSize + 'pt Calibri';
            context.textAlign = 'center';
            context.fillStyle = 'black';
 
            // check if the arc is more at the top or at the bottom part of the band
            var upperPart = ((startAngle + endAngle) / 2) > Math.PI;
 
            // reverse the aligment direction if the arc is at the bottom
            // Center and Justify is neutral in this sence
            if (!upperPart) {
                if (alignment == TextAlignment.Left) {
                    alignment = TextAlignment.Right;
                }
                else if (alignment == TextAlignment.Right) {
                    alignment = TextAlignment.Left;
                }
            }
 
            //var metrics = context.measureText(str);
            var metrics = context.measureText(str.replace(/./gi, 'W'));
            var textAngle = metrics.width / (radius - fontSize / 2);
 
            var gapsAtEdgeAngle = Math.PI / 80;
 
            if (alignment == TextAlignment.Left) {
                startAngle += gapsAtEdgeAngle;
                endAngle = startAngle + textAngle;
            }
            else if (alignment == TextAlignment.Center) {
                var ad = (Trig.angleDiff(endAngle, startAngle) - textAngle) / 2;
                startAngle += ad;
                endAngle -= ad;
            }
            else if (alignment == TextAlignment.Right) {
                endAngle -= gapsAtEdgeAngle;
                startAngle = endAngle - textAngle;
            }
            else if (alignment == TextAlignment.Justify) {
                startAngle += gapsAtEdgeAngle;
                endAngle -= gapsAtEdgeAngle;
            }
            else {
                // alignmet not supported
                // show some kind of warning
                // or fallback to default?
            }
 
            // calculate text height and adjust radius according to font size
            if (upperPart) {
                // if it is in the upper part, we have to change the orientation as well -> multiply by -1
                radius = -1 * (radius - fontSize / 2);
            }
            else {
                radius += fontSize / 2; //*
            }
 
            context.translate(center.x, center.y);
 
            var angleStep = Trig.angleDiff(endAngle, startAngle) / len;
 
            if (upperPart) {
                angleStep *= -1;
                context.rotate(startAngle + Math.PI / 2);
            }
            else {
                context.rotate(endAngle - Math.PI / 2);
            }
 
            context.rotate(angleStep / 2);
 
            for (var n = 0; n < len; n++) {
                context.rotate(-angleStep);
                context.save();
                context.translate(0, radius);
                s = str[n];
                context.fillText(s, 0, 0);
                context.restore();
            }
            context.restore();
        }
 
 
        function track_mouse(e) {
            var target = e.currentTarget;
            var mousePos = getMousePos(target, e);
            arc.checkMousePos(mousePos);
        }
 
        function click_mouse(e) {

            var target = e.currentTarget;
            console.log('ALISSON');
            console.log('ALISSON');
            var mousePos = getMousePos(target, e);
 
            arc.doTasks(mousePos);
        }
 
        function getMousePos(canvas, evt) {
            var rect = canvas.getBoundingClientRect();
            return {
                x: evt.clientX - rect.left,
                y: evt.clientY - rect.top
            };
        }
