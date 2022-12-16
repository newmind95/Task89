import EventEmitter from "eventemitter3";
import image from "../images/planet.svg";

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: "ready",
    };
  }

  constructor() {
    super();
		
		this._loading = document.querySelector('.progress')
		console.log(this._loading)

    //const box = document.createElement("div");
    //box.classList.add("box");
    //box.innerHTML = this._render({
      //name: "Placeholder",
     // terrain: "placeholder",
     // population: 0,
    //});

    //document.body.querySelector(".main").appendChild(box);
		
		this._create()
		
    this.emit(Application.events.READY);
  }

	async _load() {
    let url = 'https://swapi.boom.dev/api/planets'
    const result = []
    do {
      const response = await fetch(url)
      const planets = await response.json()
      url = planets.next;
      result.push(...planets.results)
    } while(url) 
		return result
	}

	_create() {
		this._load()
			.then((planets) => planets.forEach(planet => {
        
        const div = document.createElement('div')
        div.classList.add('box')
        div.innerHTML = this._render({
          name: planet.name,
          terrain: planet.terrain,
          population: planet.population,
        })
        this._stopLoading()
        document.body.querySelector('.main').appendChild(div)
			}));
	}

  _startLoading() {
    this._loading.style.visibility = 'visible'
  }

  _stopLoading() {
    this._loading.style.visibility = 'hidden'
  }

  _render({ name, terrain, population }) {
    return `
<article class="media">
  <div class="media-left">
    <figure class="image is-64x64">
      <img src="${image}" alt="planet">
    </figure>
  </div>
  <div class="media-content">
    <div class="content">
    <h4>${name}</h4>
      <p>
        <span class="tag">${terrain}</span> <span class="tag">${population}</span>
        <br>
      </p>
    </div>
  </div>
</article>
    `;
  }
}
