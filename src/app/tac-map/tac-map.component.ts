import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { TacMapService } from '../tac-map.service';

@Component({
  selector: 'tac-map',
  templateUrl: './tac-map.component.html',
  styleUrls: ['./tac-map.component.scss']
})
export class TacMapComponent implements AfterViewInit{

  tacMap:HTMLDivElement;
  currentMap = {
    name: "Bind",
    width: 2048,
    height: 2048
  }

  private tacMapTop: number = 0;
  private tacMapLeft: number = 0;

  private currentDraggable;

  constructor(
    private renderer: Renderer2,
    private service: TacMapService
  ){}

  ngAfterViewInit(){

    this.tacMap = <HTMLDivElement>document.getElementById('tacMap');

    this.renderer.listen(document, 'mousemove', (event) => {
      if (this.currentDraggable) {
        this.renderer.setStyle(this.currentDraggable, 'left', this.calculateLeft(event, this.currentDraggable));
        this.renderer.setStyle(this.currentDraggable, 'top', this.calculateTop(event, this.currentDraggable));
      }
      event.preventDefault();
      event.stopPropagation();
    });

    this.setupNavKeys();

  }



  private setupNavKeys(){

    const speed:number = 50;

    this.renderer.listen(document, 'keydown', (event) => {

      const key = event.keyCode;

      console.log(key);

      switch (key) {
        case 87:

          if (this.tacMapTop < 200) { 
            this.tacMapTop = this.tacMapTop + speed;
            this.renderer.setStyle(this.tacMap, 'top', this.tacMapTop+'px');
          }

          break;

        case 83:

          if (this.tacMapTop > ((this.currentMap.height/2 + 200) * -1)) { 
            this.tacMapTop = this.tacMapTop - speed;
            this.renderer.setStyle(this.tacMap, 'top', this.tacMapTop+'px');
          }

          break;

        case 65:

          if (this.tacMapLeft < 200) { 
            this.tacMapLeft = this.tacMapLeft + speed;
            this.renderer.setStyle(this.tacMap, 'left', this.tacMapLeft+'px');
          }

          break;

        case 68:

          if (this.tacMapLeft > ((this.currentMap.width/4 - 200) * -1)) { 
            this.tacMapLeft = this.tacMapLeft - speed;
            this.renderer.setStyle(this.tacMap, 'left', this.tacMapLeft+'px');
          }

          break;
      
        default:
          break;
      }


    });

  }



  addSprite(event) {

    const active = this.service.getActive();

    if (!active) { return; }

    if (event.target !== this.tacMap) {


    } else {

      const img = this.renderer.createElement('img');

      this.renderer.setAttribute(img, 'src', active.src);

      this.renderer.setStyle(img, 'position', 'absolute');
      this.renderer.setStyle(img, 'left', this.calculateLeft(event, img));
      this.renderer.setStyle(img, 'top', this.calculateTop(event, img));

      this.renderer.listen(img, 'mousedown', (event) => {
        this.currentDraggable = img;
        this.renderer.addClass(img, 'dragging');
        event.preventDefault();
        event.stopPropagation();
      });

      this.renderer.listen(img, 'mouseup', (event) => {
        this.currentDraggable = null;
        this.renderer.removeClass(img, 'dragging');
        event.preventDefault();
        event.stopPropagation();
      });

      this.renderer.listen(img, 'wheel', (event) => {

        const style = img.getAttribute('style');

        let angle = 1;

        if(style.includes('rotate')){
          angle = parseInt(style.split('rotate(')[1].split('deg)')[0]);
        }

        if(event.deltaY > 0){ angle = angle + 15; }
        if(event.deltaY < 0){ angle = angle - 15; }
        
        this.renderer.setStyle(img, 'transform', `rotate(${angle}deg)`);
        event.preventDefault();
        event.stopPropagation();
      });
  
      this.tacMap.appendChild(img)

    }
  
  }

  removeSprite(event) {
    if(event.target.tagName === "IMG"){
      this.tacMap.removeChild(event.target);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private calculateLeft(event, img: HTMLImageElement){

    const mapLeft = this.tacMap.getBoundingClientRect().left;

    let test = (event.clientX - mapLeft - img.width/2) + 'px';

    return test;

  }

  private calculateTop(event, img: HTMLImageElement){

    const mapTop = this.tacMap.getBoundingClientRect().top;

    return (event.clientY - mapTop - img.height/2) + 'px';

  }

}
