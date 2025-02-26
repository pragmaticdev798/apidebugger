document.getElementById("method").addEventListener("change", function() {
    let methodSelector = document.getElementById("method");
    let requestBody = document.getElementById("requestBody");

    let imgContainer = document.getElementById("imgg");
    if (imgContainer) {
        imgContainer.remove();
    }
    let imggContainer = document.getElementById("chutki");
    if (imggContainer) {
        imggContainer.remove();
    }
    let imgggContainer = document.getElementById("daak");
    if (imgggContainer) {
        imgggContainer.remove();
    }
    let imggggContainer = document.getElementById("chully");
    if (imggggContainer) {
        imggggContainer.remove();
    }

    if (methodSelector.value === "GET" || methodSelector.value === "DELETE") {
        requestBody.classList.add("hidden");
    } else {
        requestBody.classList.remove("hidden");
    }

    if (methodSelector.value === "DELETE") {
        let bhosdiwale = document.createElement("img");
        bhosdiwale.id = "imgg";
        bhosdiwale.src = "imggg.png";
        bhosdiwale.style.width = "450px";
        bhosdiwale.style.height = "450px";
        document.body.appendChild(bhosdiwale);
    }

    if (methodSelector.value === "GET") {
        let chutiya = document.createElement("img");
        chutiya.id = "chutki";
        chutiya.src = "chutiya.png";
        chutiya.style.width = "450px";
        chutiya.style.height = "450px";
        document.body.appendChild(chutiya);
    }

    if (methodSelector.value === "POST") {
        let dakiya = document.createElement("img");
        dakiya.id = "daak";
        dakiya.src = "dakiya.png";
        dakiya.style.width = "450px";
        dakiya.style.height = "450px";
        document.body.appendChild(dakiya);
    }

    if (methodSelector.value === "PUT") {
        let akschuly = document.createElement("img");
        akschuly.id = "chully";
        akschuly.src = "put.png";
        akschuly.style.width = "450px";
        akschuly.style.height = "450px";
        document.body.appendChild(akschuly);
    }
});

async function fetchData() {
    const url = document.getElementById("apiUrl").value;
    const method = document.getElementById("method").value;
    const requestBodyEl = document.getElementById("requestBody");
    const requestBodyText = requestBodyEl.value;
    const statusEl = document.getElementById("status");
    const headersEl = document.getElementById("headers");
    const bodyEl = document.getElementById("body");
    const imageEl = document.getElementById("imagePreview");
    statusEl.innerText = "Fetching...";
    headersEl.innerText = "";
    bodyEl.innerText = "";
    imageEl.classList.add("hidden");
    imageEl.src = "";
    try {
        const options = { method };
        if (method === "POST" || method === "PUT") {
            options.headers = {"Content-Type": "application/json"};
            try {
                const jsonData = JSON.parse(requestBodyText);
                options.body = JSON.stringify(jsonData);
            } catch (jsonError) {
                statusEl.innerText = "Error: Invalid JSON in request body";
                return;
            }
        }
        const response = await fetch(url, options);
        statusEl.innerText = `Status: ${response.status} - ${response.statusText}`;
        statusEl.style.color="wheat";
        let headerText = "";
        response.headers.forEach((value, key) => {
            headerText += `${key}: ${value}\n`;
        });
        headersEl.innerText = headerText || "No headers available.";
        headersEl.style.color = "wheat";


        const contentType = response.headers.get("Content-Type") || "";

        if (contentType.includes("application/json")) {
            const jsonData = await response.json();
            bodyEl.innerText = JSON.stringify(jsonData, null, 2);
            bodyEl.style.color="wheat";
        } else if (contentType.includes("text")) {
            const textData = await response.text();
            bodyEl.innerText = textData;
            bodyEl.style.color="wheat";
        } else if (contentType.includes("image")) {
            const blobData = await response.blob();
            const imageURL = URL.createObjectURL(blobData);
            imageEl.src = imageURL;
            imageEl.classList.remove("hidden");
            imageEl.onerror = function() {
                bodyEl.innerText = "Failed to load image";
                bodyEl.style.color="wheat";
                imageEl.classList.add("hidden");
            };
        } else {
            const textData = await response.text();
            bodyEl.innerText = `Raw Response:\n${textData}`;
            bodyEl.style.color="wheat";
        }
    } catch (error) {
        statusEl.innerText = "Fetch Error: " + error.message;
        statusEl.style.color="wheat";
    }
}