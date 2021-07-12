import {Autor} from "../Models/Autor"

export function showAutor(doc:HTMLElement,autor:Autor)
{
    const container = document.createElement("div");
    container.className = "classAutor";
    
    const img = document.createElement("img");
    img.src = autor.slika;
    container.appendChild(img);

    const text = document.createElement("span");
    text.innerHTML= `Autor: <br />${autor.ime} ${autor.prezime}`;
    container.appendChild(text);
    
    doc.appendChild(container);
}
