import api from "./api.js";

addEventListener("DOMContentLoaded", (event) => main(event));

const deleteDocument = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const confirmation = window.confirm("Are you sure you want to delete this document?");
    if (confirmation) {
        await api.deleteDocument(id);
        window.location.href = "/public/pages/index.html";
    }
}

const main = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    const document = await api.getDocument(id);

    $("#document-id").append(document.documentId);
    $("#title").append(document.title);
    $("#author").append(document.author);

    $("#delete-button").click(deleteDocument);
};