import api from "./api.js";

addEventListener("DOMContentLoaded", (event) => main(event));

const main = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const document = await api.getDocument(id);

    $("#document-id").append(document.documentId);
    $("#title").append(document.title);
    $("#author").append(document.author);
    $("#description").append(document.description);
    $("#num-pages").append(document.numPages);
    $("#size").append(document.size);
    $("#type").append(document.type);
    $("#format").append(document.format);
};