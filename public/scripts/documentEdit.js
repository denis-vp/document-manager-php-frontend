import api from "./api.js";
import { validateDocument } from "./documentValidator.js"


addEventListener("DOMContentLoaded", (event) => main(event));

const update = async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const document = {
        documentId: id,
        title: $("#title").val(),
        author: $("#author").val(),
        description: $("#description").val(),
        numPages: parseInt($("#num-pages").val()),
        size: $("#size").val(),
        type: $("#type").val(),
        format: $("#format").val()
    };

    try {
        validateDocument(document);
    } catch (error) {
        alert(error.message);
        return;
    }

    const confirmation = window.confirm("Are you sure you want to update this document?");
    if (confirmation) {
        await api.updateDocument(id, document);
        window.location.href = "/public/pages/index.html";
    }
};

const cancel = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Are you sure you want to cancel?");
    if (confirmation) {
        window.location.href = "/public/pages/index.html";
    }
}

const main = async (event) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const document = await api.getDocument(id);

    $("#document-id").append(document.documentId);
    $("#title").attr("value", document.title);
    $("#author").attr("value", document.author);
    $("#description").attr("value", document.description);
    $("#num-pages").attr("value", document.numPages);
    $("#size").attr("value", document.size);
    $("#type").attr("value", document.type);
    $("#format").attr("value", document.format);

    $("#update-button").click(update);
    $("#cancel-button").click(cancel);
};