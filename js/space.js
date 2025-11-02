document.addEventListener('DOMContentLoaded',()=>{
    const input = document.getElementById('inputBuscar');
    const buscar = document.getElementById('btnBuscar');
    const contenedor = document.getElementById('contenedor');
    
    buscar.addEventListener('click', ()=>{
        const elemento = input.value.trim();
        if (elemento === '')return;
        document.getElementById("spinner").style.opacity = 100;
        document.getElementById("spinner").style.display = "block";
        fetch(`https://images-api.nasa.gov/search?q=${encodeURIComponent(elemento)}&media_type=image`)
        .then(response => response.json())
        .then(data =>{
            document.getElementById("spinner").style.display = "none";
            document.getElementById("spinner").style.opacity = 0;
            contenedor.innerHTML= ""; 

            const item  = data.collection.items;
            if(item.length===0){
                contenedor.innerHTML="<p>No se encontaron resultados.</p>"
                return;
            }

            item.forEach(ele=>{
                const datos = ele.data[0];
                const imagen = ele.links?.[0]?.href || "";
                const titulo = datos.title || "Sin título";
                const descripcion = datos.description || "Sin descripción";
                const fecha = datos.date_created?.split("T")[0] || "Sin fecha";

                const card = document.createElement("div");
                card.className = "card bg-dark text-white m-2";
                card.style.width = "18rem";

                card.innerHTML = `
                <img src="${imagen}" class="card-img-top" alt="${titulo}">
                <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <div class="card-text overflow-auto" style="max-height: 120px;">
                ${descripcion}
                </div>
                <p class="card-text"><small class="text-muted">📅 ${fecha}</small></p>
                </div>
                `;

                contenedor.appendChild(card);
            });

        });
    });
})