const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const canv = canvas.getContext('2d');

class Circle{
    constructor(x,y,dx,dy,radious,color){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radious = radious;
        this.color = color;
    }
    draw(){
        canv.beginPath();
        canv.arc(this.x,this.y,this.radious,0,Math.PI * 2,false);
        canv.strokeStyle = this.color;
        canv.stroke();
    }
    move(){
        if(this.x + this.radious>innerWidth || this.x - this.radious<0){
            this.dx = -this.dx;
        }
        if(this.y + this.radious>innerHeight || this.y - this.radious<0){
            this.dy = -this.dy;
        }
        this.x  += this.dx;
        this.y  += this.dy;
        this.draw();
    }
}

function generateArrayOfCircle(n){
    let circleArray = [];
    for (let i = 0; i < n; i++) {
        let radious = 20;
        let x = Math.random()*(window.innerWidth-radious*2)+radious;
        let y = Math.random()*(window.innerHeight-radious*2)+radious;
        let dx = Math.random()-0.5;
        let dy = Math.random()-0.5;        
        let color = "rgba("+255*Math.random()+","+255*Math.random()+","+255*Math.random()+",1)";
        circleArray.push(new Circle(x,y,dx,dy,radious,color));        
    }
    return circleArray;
}

circleArray =  generateArrayOfCircle(400); 

function animate(){
    requestAnimationFrame(animate);
    canv.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < circleArray.length; i++) {        
        circleArray[i].move();
    }    
}
animate();