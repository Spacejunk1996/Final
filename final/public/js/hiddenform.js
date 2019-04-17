function deleteTabs(text) {
    const json = {"id": text};
    doFormRequest("/tabs/delete", "post", json);
}

/*function renameTabs(text) {
    const json = {"name": text};
    doFormRequest("/tabs", "put", json);
}*/

function doFormRequest(url, action, json)
{
    var form = document.createElement("form");
    form.action = url;
    form.method = action;
    for (var key in json)
    {
        if (json.hasOwnProperty(key))
        {
            var val = json[key];
            input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = val;
            form.appendChild(input);
        }
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}