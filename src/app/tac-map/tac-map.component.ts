import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'tac-map',
  templateUrl: './tac-map.component.html',
  styleUrls: ['./tac-map.component.scss']
})
export class TacMapComponent implements AfterViewInit{

  tacMap:HTMLDivElement;

  ngAfterViewInit(){

    this.tacMap = <HTMLDivElement>document.getElementById('tacMap');

  }



  addSprite(event) {

    if (event.target !== this.tacMap) {


    } else {

      const img = new Image();
      img.src = 'assets/smoke.png';
      img.style.position = 'absolute';
      img.style.left = this.calculateLeft(event);
      img.style.top = this.calculateTop(event);
  
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

  private calculateLeft(event){

    const mapLeft = this.tacMap.getBoundingClientRect().left;

    let test = (event.clientX - mapLeft - 32) + 'px';

    return test;

  }

  private calculateTop(event){

    const mapTop = this.tacMap.getBoundingClientRect().top;

    return (event.clientY - mapTop - 32) + 'px';

  }

}
