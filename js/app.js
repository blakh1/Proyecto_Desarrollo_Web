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
                                        <i class="bi bi-cart3"></i> Comprar
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