/* =========================================================
   InCom Opérations
   SCRIPT.JS
========================================================= */


/* =========================================================
   RESPONSABLES
========================================================= */

const responsables = {

    "450": [
        "Kaoutar Benzaizoun",
        "Youssra Benayd",
        "Mostapha Haddani"
    ],

    "402": [
        "Oualid Elyoussfy",
        "Yassin Razma",
        "Aissa Elhart"
    ]

};


/* =========================================================
   PROJETS
========================================================= */

const projets = {

    Vestas: [
        "V163 WS",
        "V163 Damiel",
        "V136",
        "V110",
        "V236"
    ],

    Siemens: [
        "G145",
        "G170"
    ]

};


/* =========================================================
   V163 WS
   DONNÉES FOURNIES PAR L'UTILISATEUR

   Ces besoins correspondent à 12 Kits.
========================================================= */

const v163WS = [

    {
        nom: "PEEL PLY 1500MM SST PINK R92PA66",
        code: "GLSIN10407",
        besoin: 1804.4535,
        largeur: 1500,
        longueur: 100,
        superficieRouleau: 150
    },

    {
        nom: "PEEL PLY 500MM SST PINK R92PA66",
        code: "GLSIN10423",
        besoin: 281.2117,
        largeur: 500,
        longueur: 100,
        superficieRouleau: 50
    },

    {
        nom: "PEEL PLY 200MM SST PINK R92PA66",
        code: "GLSIN10424",
        besoin: 22.4948,
        largeur: 200,
        longueur: 100,
        superficieRouleau: 20
    },

    {
        nom: "PEEL PLY 300MM SST PINK R92PA66",
        code: "GLSIN10471",
        besoin: 245.2800,
        largeur: 300,
        longueur: 100,
        superficieRouleau: 30
    },

    {
        nom: "PEEL PLY 1000MM SST PINK R92PA66",
        code: "GLSIN11068",
        besoin: 154.8000,
        largeur: 1000,
        longueur: 100,
        superficieRouleau: 100
    },

    {
        nom: "MALLA INFUSION VERDE CLARA 1,37M X 175MTS",
        code: "INFIN10290",
        besoin: 453.5600,
        largeur: 1.37,
        longueur: 175,
        superficieRouleau: 239.75
    }

];


/* =========================================================
   ÉTAT ACTUEL
========================================================= */

let selectedPoste = "";
let selectedResponsable = "";
let selectedClient = "";
let selectedProjet = "";

let currentMaterials = [];


/* =========================================================
   NAVIGATION
========================================================= */

function showScreen(id) {

    document.querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });

    document.getElementById(id)
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   ACCUEIL → POSTES
========================================================= */

function goToPostes() {

    const list =
        document.getElementById("posteList");

    list.innerHTML = "";

    ["450", "402"].forEach(poste => {

        const button =
            document.createElement("button");

        button.textContent =
            "POSTE " + poste;

        button.onclick = function() {

            selectPoste(poste);

        };

        list.appendChild(button);

    });

    showScreen("posteScreen");
}


/* =========================================================
   POSTE
========================================================= */

function selectPoste(poste) {

    selectedPoste = poste;

    document.getElementById(
        "selectedPosteText"
    ).textContent =
        "Poste sélectionné : " + poste;

    const list =
        document.getElementById("responsableList");

    list.innerHTML = "";

    responsables[poste].forEach(personne => {

        const button =
            document.createElement("button");

        button.textContent = personne;

        button.onclick = function() {

            selectResponsable(personne);

        };

        list.appendChild(button);

    });

    showScreen("responsableScreen");
}


/* =========================================================
   RESPONSABLE
========================================================= */

function selectResponsable(personne) {

    selectedResponsable = personne;

    document.getElementById(
        "selectedResponsableText"
    ).textContent = personne;

    createProjectButtons();

    showScreen("projetScreen");
}


/* =========================================================
   PROJETS
========================================================= */

function createProjectButtons() {

    const list =
        document.getElementById("projetList");

    list.innerHTML = "";


    const titleVestas =
        document.createElement("h3");

    titleVestas.textContent =
        "Vestas";

    list.appendChild(titleVestas);


    projets.Vestas.forEach(projet => {

        const button =
            document.createElement("button");

        button.textContent = projet;

        button.onclick = function() {

            selectProject(
                "Vestas",
                projet
            );

        };

        list.appendChild(button);

    });


    const titleSiemens =
        document.createElement("h3");

    titleSiemens.textContent =
        "Siemens";

    titleSiemens.style.marginTop = "20px";

    list.appendChild(titleSiemens);


    projets.Siemens.forEach(projet => {

        const button =
            document.createElement("button");

        button.textContent = projet;

        button.onclick = function() {

            selectProject(
                "Siemens",
                projet
            );

        };

        list.appendChild(button);

    });

}


/* =========================================================
   PROJET
========================================================= */

function selectProject(client, projet) {

    selectedClient = client;
    selectedProjet = projet;

    calculateProject();

}


/* =========================================================
   CALCUL DU PROJET
========================================================= */

function calculateProject() {

    currentMaterials = [];


    /* -----------------------------------------
       V163 WS

       Besoin fourni = besoin pour 12 Kits
    ----------------------------------------- */

    if (selectedProjet === "V163 WS") {

        currentMaterials =
            v163WS.map(material => {

                const rouleaux =
                    Math.ceil(
                        material.besoin /
                        material.superficieRouleau
                    );


                const quantiteFournie =
                    rouleaux *
                    material.superficieRouleau;


                return {

                    ...material,

                    besoinFinal:
                        material.besoin,

                    formule:
                        material.besoin.toFixed(4) +
                        " ÷ " +
                        material.superficieRouleau.toFixed(4),

                    resultatDivision:
                        (
                            material.besoin /
                            material.superficieRouleau
                        ).toFixed(4),

                    rouleaux:
                        rouleaux,

                    quantiteFournie:
                        quantiteFournie

                };

            });

    }


    /* -----------------------------------------
       V163 DAMIEL

       Besoin Damiel =
       Besoin WS ÷ 48 × 56
    ----------------------------------------- */

    else if (
        selectedProjet === "V163 Damiel"
    ) {

        currentMaterials =
            v163WS.map(material => {

                const besoinFinal =
                    (
                        material.besoin /
                        48
                    ) * 56;


                const division =
                    besoinFinal /
                    material.superficieRouleau;


                const rouleaux =
                    Math.ceil(division);


                const quantiteFournie =
                    rouleaux *
                    material.superficieRouleau;


                return {

                    ...material,

                    besoinFinal:
                        besoinFinal,

                    formuleDamiel:
                        material.besoin.toFixed(4) +
                        " ÷ 48 × 56",

                    formuleRouleau:
                        besoinFinal.toFixed(4) +
                        " ÷ " +
                        material.superficieRouleau.toFixed(4),

                    resultatDivision:
                        division.toFixed(4),

                    rouleaux:
                        rouleaux,

                    quantiteFournie:
                        quantiteFournie

                };

            });

    }


    else {

        currentMaterials = [];

    }


    displayCalculation();

}


/* =========================================================
   AFFICHER LE CALCUL
========================================================= */

function displayCalculation() {

    const info =
        document.getElementById(
            "selectionInfo"
        );


    info.innerHTML = `

        <strong>Poste :</strong>
        ${selectedPoste}

        <br>

        <strong>Responsable :</strong>
        ${selectedResponsable}

        <br>

        <strong>Client :</strong>
        ${selectedClient}

        <br>

        <strong>Projet :</strong>
        ${selectedProjet}

    `;


    const container =
        document.getElementById(
            "calculationResult"
        );


    if (currentMaterials.length === 0) {

        container.innerHTML = `

            <div class="selection-info">

                Les données de ce projet
                seront ajoutées prochainement.

            </div>

        `;

        showScreen("calculScreen");

        return;

    }


    let html = `

        <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>Matériel</th>

                    <th>Besoin</th>

                    <th>Largeur</th>

                    <th>M² / Rouleau</th>

                    <th>Calcul</th>

                    <th>Rouleaux</th>

                </tr>

            </thead>

            <tbody>

    `;


    currentMaterials.forEach(material => {

        let calculTexte = "";


        if (
            selectedProjet ===
            "V163 Damiel"
        ) {

            calculTexte =
                `${material.formuleDamiel}
                <br>
                =
                ${material.besoinFinal.toFixed(4)}
                m²
                <br><br>
                ${material.formuleRouleau}
                =
                ${material.resultatDivision}`;

        }

        else {

            calculTexte =
                `${material.besoin.toFixed(4)}
                ÷
                ${material.superficieRouleau.toFixed(4)}
                =
                ${material.resultatDivision}`;

        }


        html += `

            <tr>

                <td>

                    <strong>
                        ${material.nom}
                    </strong>

                    <div class="material-code">

                        ${material.code}

                    </div>

                </td>


                <td>

                    ${material.besoinFinal.toFixed(4)}
                    m²

                </td>


                <td>

                    ${material.largeur}
                    ${material.largeur > 10 ? "mm" : "m"}

                </td>


                <td>

                    ${material.superficieRouleau.toFixed(4)}
                    m²

                </td>


                <td>

                    ${calculTexte}

                </td>


                <td>

                    <strong>
                        ${material.rouleaux}
                    </strong>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

        </div>

    `;


    container.innerHTML = html;

    showScreen("calculScreen");

}


/* =========================================================
   DEMANDE
========================================================= */

function showDemande() {

    const date =
        new Date()
        .toISOString()
        .split("T")[0];


    let html = `

        <div class="document-header">

            <h2>
                DEMANDE DE MATÉRIEL
            </h2>

            <p>
                InCom GROUP OPÉRATIONS
            </p>

        </div>


        <div class="document-meta">

            <strong>Date :</strong>
            ${date}

            <br>

            <strong>Poste :</strong>
            ${selectedPoste}

            <br>

            <strong>Responsable :</strong>
            ${selectedResponsable}

            <br>

            <strong>Client :</strong>
            ${selectedClient}

            <br>

            <strong>Projet :</strong>
            ${selectedProjet}

        </div>


        <div class="table-wrapper">

        <table>

            <thead>

                <tr>

                    <th>Matériel</th>

                    <th>Code</th>

                    <th>Besoin</th>

                    <th>Largeur</th>

                    <th>M²/Rouleau</th>

                    <th>Calcul</th>

                    <th>Rouleaux</th>

                </tr>

            </thead>

            <tbody>

    `;


    currentMaterials.forEach(material => {

        let calcul = "";


        if (
            selectedProjet ===
            "V163 Damiel"
        ) {

            calcul = `

                ${material.besoin.toFixed(4)}
                ÷ 48 × 56
                =
                ${material.besoinFinal.toFixed(4)}
                m²

                <br>

                ${material.besoinFinal.toFixed(4)}
                ÷
                ${material.superficieRouleau.toFixed(4)}
                =
                ${material.resultatDivision}

            `;

        }

        else {

            calcul = `

                ${material.besoin.toFixed(4)}
                ÷
                ${material.superficieRouleau.toFixed(4)}
                =
                ${material.resultatDivision}

            `;

        }


        html += `

            <tr>

                <td>
                    ${material.nom}
                </td>

                <td>
                    ${material.code}
                </td>

                <td>
                    ${material.besoinFinal.toFixed(4)}
                    m²
                </td>

                <td>
                    ${material.largeur}
                    ${material.largeur > 10 ? "mm" : "m"}
                </td>

                <td>
                    ${material.superficieRouleau.toFixed(4)}
                    m²
                </td>

                <td>
                    ${calcul}
                </td>

                <td>

                    <strong>
                        ${material.rouleaux}
                    </strong>

                </td>

            </tr>

        `;

    });


    html += `

            </tbody>

        </table>

        </div>

    `;


    /* -----------------------------------------
       DÉTAIL DE LA QUANTITÉ FOURNIE
    ----------------------------------------- */

    html += `

        <div class="roll-details">

            <strong>
                Quantité fournie :
            </strong>

            <br>
            <br>

    `;


    currentMaterials.forEach(material => {

        html += `

            ${material.nom}

            :

            ${material.rouleaux}

            ×

            ${material.superficieRouleau.toFixed(2)}

            =

            <strong>
                ${material.quantiteFournie.toFixed(2)}
                m²
            </strong>

            <br>

        `;

    });


    html += `

        </div>

    `;


    document.getElementById(
        "demandeDocument"
    ).innerHTML = html;


    showScreen("demandeScreen");

}


/* =========================================================
   RETOURS
========================================================= */

function goHome() {

    showScreen("homeScreen");

}

function goToResponsables() {

    selectPoste(selectedPoste);

}

function goToProjets() {

    createProjectButtons();

    showScreen("projetScreen");

}

function goToCalcul() {

    showScreen("calculScreen");

}


/* =========================================================
   IMPRESSION
========================================================= */

function printDemande() {

    window.print();

}


/* =========================================================
   PARTAGE
========================================================= */

async function shareDemande() {

    let text =
        "DEMANDE DE MATÉRIEL\n\n";

    text +=
        "InCom GROUP OPÉRATIONS\n\n";

    text +=
        "Poste : " +
        selectedPoste +
        "\n";

    text +=
        "Responsable : " +
        selectedResponsable +
        "\n";

    text +=
        "Client : " +
        selectedClient +
        "\n";

    text +=
        "Projet : " +
        selectedProjet +
        "\n\n";


    currentMaterials.forEach(material => {

        text +=
            material.nom +
            "\n";

        text +=
            "Besoin : " +
            material.besoinFinal.toFixed(4) +
            " m²\n";

        text +=
            "Rouleaux : " +
            material.rouleaux +
            "\n\n";

    });


    if (
        navigator.share
    ) {

        try {

            await navigator.share({

                title:
                    "InCom - Demande de matériel",

                text:
                    text

            });

        }

        catch(error) {

            console.log(error);

        }

    }

    else {

        alert(
            "Le partage Android n'est pas disponible dans ce navigateur."
        );

    }

}


/* =========================================================
   WHATSAPP
========================================================= */

function shareWhatsApp() {

    let text =
        "DEMANDE DE MATÉRIEL\n\n";

    text +=
        "Poste : " +
        selectedPoste +
        "\n";

    text +=
        "Responsable : " +
        selectedResponsable +
        "\n";

    text +=
        "Projet : " +
        selectedProjet +
        "\n\n";


    currentMaterials.forEach(material => {

        text +=
            material.nom +
            "\n";

        text +=
            "Besoin : " +
            material.besoinFinal.toFixed(4) +
            " m²\n";

        text +=
            "Rouleaux : " +
            material.rouleaux +
            "\n\n";

    });


    const url =
        "https://wa.me/?text=" +
        encodeURIComponent(text);


    window.open(
        url,
        "_blank"
    );

}


/* =========================================================
   IMAGE
========================================================= */

function saveImage() {

    alert(
        "La génération d'image sera connectée dans la version Android finale."
    );

}


/* =========================================================
   PDF
========================================================= */

function savePDF() {

    window.print();

}


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "InCom Opérations chargé correctement."
        );

    }
);
