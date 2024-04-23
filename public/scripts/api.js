const SERVER = "http://localhost:80/document-manager-php-backend/index.php";

export const getDocuments = async (limit = 10, type = "", format = "") => {
    let params = `?limit=${limit}`;
    if (type !== "") params += `&type=${type}`;
    if (format !== "") params += `&format=${format}`;
    const response = await $.ajax({
        url: SERVER + "/document/list" + params,
        type: "GET",
        dataType: "json"
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.error(error);
    });
    return response;
};

export const getDocument = async (id) => {
    const response = await $.ajax({
        url: SERVER + "/document/get?documentId=" + id,
        type: "GET",
        dataType: "json"
    }).then((res) => {
        return res[0];
    }).catch((error) => {
        console.error(error);
    });
    return response;
};

export const addDocument = async (newDocument) => {
    const response = await $.ajax({
        url: SERVER + "/document/add",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            document: newDocument
        }),
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.error(error);
    });
    return response;
};

export const updateDocument = async (documentId, newDocument) => {
    const response = await $.ajax({
        url: SERVER + "/document/update?documentId=" + documentId,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify({
            document: newDocument
        }),
    }).then((res) => {
        return res;
    }).catch((error) => {
        console.error(error);
    });
    return response;
};

export const deleteDocument = async (documentId) => {
    const response = await $.ajax({
        url: SERVER + "/document/delete?documentId=" + documentId,
        type: "DELETE",
    }).catch((error) => {
        console.error(error);
    });
    return response;
};

export default { getDocuments, getDocument, addDocument, updateDocument, deleteDocument };
