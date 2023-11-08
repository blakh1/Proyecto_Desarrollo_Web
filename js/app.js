const filterButton = document.querySelector(".filterButton");

let carsContainer = document.querySelector("#carsContainer");

yearOptions();

function yearOptions() {
  const selectYear = document.querySelector(".year");
  for (let i = 2023; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}

fetch("https://ha-front-api-proyecto-final.vercel.app/brands")
  .then(function (res) {
    return res.json();
  })
  .then(function (brands) {
    const marcas = document.querySelector(".marcas");

    for (let i = 0; i < brands.length; i++) {
      const marca = brands[i];
      const opcionMarcas = document.createElement("option");
      opcionMarcas.innerHTML = marca;
      marcas.append(opcionMarcas);
    }
  });

const marcas = document.querySelector(".marcas");
marcas.addEventListener("change", () => {
  fetch(
    "https://ha-front-api-proyecto-final.vercel.app/models?brand=" +
      marcas.value
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (model) {
      const modelo = document.querySelector(".modelo");
      modelo.innerHTML = "";
      for (let i = 0; i < model.length; i++) {
        const modelOption = document.createElement("option");
        const actualModel = model[i];
        modelOption.append(actualModel);
        modelo.append(modelOption);
      }
    });
});

fetch("https://ha-front-api-proyecto-final.vercel.app/cars")
  .then(function (res) {
    return res.json();
  })
  .then(function (cars) {
    for (const car of cars) {
      carsContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="row border-bottom mb-4 pb-4">
                            <div class="col-12 col-lg-4">
                                <div class="position-relative">
                                <span class="new badge text-white bg-warning position-absolute status">${
                                  car.status === 1 ? "Nuevo" : "Usado"
                                }</span>
                                
                                    <img
                                        src="${car.image}"
                                        class="img-fluid border p-2 mb-3 mb-lg-0"
                                        alt=".."
                                    />
                                    <div
                                        class="new position-absolute px-2 rounded spanNew d-none"
                                    >
                                        <strong class="text-white"
                                            >Nuevo</strong
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-8 d-flex flex-column">
                                <div class="card-body">
                                    <div
                                        class="d-flex justify-content-between align-items-center"
                                    >
                                        <h3 class="card-title carName fs-6">
                                        ${car.brand + " " + car.model} 
                                        </h3>
                                        <div class="datosDelAuto d-flex">
                                            <p class="year me-1 my-0">${
                                              car.year
                                            }</p>
                                            |
                                            <p class="price mx-1 my-0">
                                            ${"USD " + car.price_usd}
                                            </p>
                                            |
                                            <p class="stars ms-1 my-0">
                                                <i class="bi bi-star-fill"></i
                                                ><i class="bi bi-star-fill"></i
                                                ><i class="bi bi-star-fill"></i
                                                ><i class="bi bi-star-half"></i
                                                ><i class="bi bi-star"></i>
                                            </p>
                                        </div>
                                    </div>
                                    <p class="card-text my-3">
                                    ${car.description}
                                    </p>
                                </div>
                                <div class="buttons">
                                    <button
                                        class="btn saleButton"
                                        type="submit"
                                    >
                                        <i class="bi bi-cart3 bg-success p-2 rounded-1 text-white">Comprar</i> 
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-dark"
                                    >
                                        <i class="bi bi-plus-square"></i> Mas
                                        información
                                    </button>
                                    <button
                                        type="button"
                                        class="btn btn-outline-dark"
                                    >
                                        <i class="bi bi-share"></i> Compartir
                                    </button>
                                </div>
                            </div>
                        </div>`
      );
    }
  });

filterButton.addEventListener("click", () => {
  const marcas = document.querySelector(".marcas");
  const modelos = document.querySelector(".modelo");
  const year = document.querySelector(".year");
  const estadoOption = document.querySelector(".estadoOption");
  carsContainer.innerHTML = `
    <div class="d-flex justify-content-center align-items-center contenedorCarga">
      <div class="spinner-border carga" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  let consulta = "";
  if (year.value !== "Seleccionar...") {
    consulta += "year=" + year.value;
  }
  if (marcas.value !== "Seleccionar...") {
    consulta += "&brand=" + marcas.value;
  }
  if (modelos.value !== "Seleccionar...") {
    consulta += "&model=" + modelos.value;
  }
  if (estadoOption.value === "Nuevo") {
    consulta += "&status=" + 1;
  } else if (estadoOption.value === "Usado") {
    consulta += "&status=" + 0;
  }
  fetch("https://ha-front-api-proyecto-final.vercel.app/cars?" + consulta)
    .then(function (autoFiltrado) {
      return autoFiltrado.json();
    })
    .then(function (autoFiltrado) {
      carsContainer.innerHTML = "";
      carsCards(autoFiltrado);
      console.log(consulta);
      console.log();
      const alerta = document.querySelector(".alerta");
      if (carsContainer.innerHTML === "") {
        carsContainer.innerHTML = `<div class="  alerta alert alert-danger d-flex align-items-center" role="alert">
            <svg class=" bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
            No se han encontrado resultados
          </div>
          </div>`;
      }
    })
    .catch(function (err) {
      console.error(err);
    });
});

function carsCards(cars) {
  const autos = cars;
  for (const car of cars) {
    carsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="row border-bottom mb-4 pb-4">
                          <div class="col-12 col-lg-4">
                              <div class="position-relative">
                              <span class="new badge text-white bg-warning position-absolute status">${
                                car.status === 1 ? "Nuevo" : "Usado"
                              }</span>
                              
                                  <img
                                      src="${car.image}"
                                      class="img-fluid border p-2 mb-3 mb-lg-0"
                                      alt=".."
                                  />
                                  <div
                                      class="new position-absolute px-2 rounded spanNew d-none"
                                  >
                                      <strong class="text-white"
                                          >Nuevo</strong
                                      >
                                  </div>
                              </div>
                          </div>
                          <div class="col-12 col-lg-8 d-flex flex-column">
                              <div class="card-body">
                                  <div
                                      class="d-flex justify-content-between align-items-center"
                                  >
                                      <h3 class="card-title carName">
                                      ${car.brand + " " + car.model} 
                                      </h3>
                                      <div class="datosDelAuto d-flex">
                                          <p class="year me-1 my-0">${
                                            car.year
                                          }</p>
                                          |
                                          <p class="price mx-1 my-0">
                                          ${"USD " + car.price_usd}
                                          </p>
                                          |
                                          <p class="stars ms-1 my-0">
                                              <i class="bi bi-star-fill"></i
                                              ><i class="bi bi-star-fill"></i
                                              ><i class="bi bi-star-fill"></i
                                              ><i class="bi bi-star-half"></i
                                              ><i class="bi bi-star"></i>
                                          </p>
                                      </div>
                                  </div>
                                  <p class="card-text my-3">
                                  ${car.description}
                                  </p>
                              </div>
                              <div class="buttons">
                                  <button
                                      class="btn saleButton"
                                      type="submit"
                                  >
                                      <i class="bi bi-cart3 bg-success p-2 rounded-1 text-white">Comprar</i> 
                                  </button>
                                  <button
                                      type="button"
                                      class="btn btn-outline-dark"
                                  >
                                      <i class="bi bi-plus-square"></i> Mas
                                      información
                                  </button>
                                  <button
                                      type="button"
                                      class="btn btn-outline-dark"
                                  >
                                      <i class="bi bi-share"></i> Compartir
                                  </button>
                              </div>
                          </div>
                      </div>`
    );
  }
}
