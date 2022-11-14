class Body {
  
    constructor(x, y, w, h, options){
      this.pos = createVector(x,y);
      this.w = w;
      this.h = h;
      this.color = color(220);
      this.texture = options ? options.texture : null;
      this.invisible = false;
      this.textureH = h;
  
      
      this.jumping = false;
      this.attacking = false;
      this.crouching = false;
      this.step = 0;
      this.runAnimation = options ? options.runAnimation: null;
      this.jumpTexture = options ? options.jumpTexture: null;
      this.crouchTexture = options ? options.crouchTexture: null;
      
      this.attackAnimation = options ? options.attackAnimation: null;
      
    }
    
    show() {
      if(this.invisible) return;
      if(this.texture) {
        push();
        scale(1,-1)
        image(this.texture,this.pos.x,-this.pos.y - this.textureH, this.w,this.textureH)
        pop();
      } else {
        fill(this.color);
        rect(this.pos.x, this.pos.y, this.w, this.h);
      }
    }
    
    collide(other) {
      return (
      this.pos.x < other.pos.x + other.w &&
      this.pos.x + this.w > other.pos.x &&
      this.pos.y < other.pos.y + other.h &&
      this.h + player.pos.y > other.pos.y
      ) 
    }
  }