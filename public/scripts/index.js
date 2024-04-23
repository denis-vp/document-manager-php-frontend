import api from "./api.js";

addEventListener("DOMContentLoaded", (event) => main(event));

const openDetails = (event) => {
    const id = event.target.parentElement.parentElement.id;
    window.location.href = "/public/pages/documentDetails.html?id=" + id;
}

const openDelete = (event) => {
    const id = event.target.parentElement.parentElement.id;
    window.location.href = "/public/pages/documentDelete.html?id=" + id;
}

const openEdit = (event) => {
    const id = event.target.parentElement.parentElement.id;
    window.location.href = "/public/pages/documentEdit.html?id=" + id;
}

const listItemFactory = (id, title, author, numPages, type) => {
    let item = $("<li></li>").addClass("list-group-item");
    item.attr("id", id);
    item.append($("<h4></h4>").text(title));
    item.append($("<p></p>").text("Author: " + author));
    item.append($("<p></p>").text(numPages + " pages"));
    item.append($("<p></p>").text("Type: " + type));

    let detailsButton = $("<button></button>").addClass("btn btn-primary");
    detailsButton.on("click", openDetails);
    detailsButton.text("Details");
    let deleteButton = $("<button></button>").addClass("btn btn-danger ms-2");
    deleteButton.on("click", openDelete);
    deleteButton.text("Delete");
    let editButton = $("<button></button>").addClass("btn btn-warning ms-2");
    editButton.on("click", openEdit);
    editButton.text("Edit");

    let buttonContainer = $("<div></div>").addClass("d-flex justify-content-end");
    buttonContainer.append(detailsButton);
    buttonContainer.append(deleteButton);
    buttonContainer.append(editButton);

    item.append(buttonContainer);

    return item;
}

const populateList = async (type = "", format = "") => {
    const limit = 100;
    const documents = await api.getDocuments(limit, type, format);
    const list = $("#document-list");
    list.empty();
    documents.forEach(document => {
        list.append(listItemFactory(document.documentId, document.title, document.author, document.numPages, document.type));
    });
}

const changePrevSearch = (newValue) => {
    $("#previous-search").text("");
    $("#previous-search").append("<b>Previous search:</b> ");
    $("#previous-search").append(newValue);
}

const main = async (event) => {
    populateList();
    $("#type-search-input").on("change", async (event) => {
        const type = event.target.value;
        changePrevSearch(type);
        populateList(type);
    });
    $("#format-search-input").on("change", async (event) => {
        const format = event.target.value;
        changePrevSearch(format);
        populateList("", format);
    });
};
