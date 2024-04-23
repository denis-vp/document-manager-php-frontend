import api from "./api.js"
import { validateDocument } from "./documentValidator.js"

addEventListener("DOMContentLoaded", (event) => main(event));

const addDocument = async (event) => {
    event.preventDefault();
    const document = {
        id: "placeholderId",
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

    const confirmation = window.confirm("Are you sure you want to add this document?");
    if (confirmation) {
        const response = await api.addDocument(document);
        alert(response.message);
    }
}

const cancel = (event) => {
    event.preventDefault();
    const confirmation = window.confirm("Are you sure you want to cancel?");
    if (confirmation) {
        window.location.href = "/public/pages/index.html";
    }
}

const main = async (event) => {
    $("#add-button").click(addDocument);
    $("#cancel-button").click(cancel);
};