//#region Ajax Class//////

function Ajax(ArraySet, Page) {
    this.array = ArraySet;
    this.page = Page;
    this.answer = "";
    this.CheckAjaxSupport = checkAjaxSupport;
    this.xmlHttp = null;
    this.GetRequest = getRequest;
    this.TimerRequest = timerRequest;
    this.GetAsyncRequest = getAsyncRequest;
    this.PostRequest = postRequest;
    this.PostAsyncRequest = postAsyncRequest;
    this.TimerAsyncRequest = timerAsyncRequest;

}

function postRequest() {
    this.xmlHttp = this.CheckAjaxSupport();
    if (this.xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var i;
    var q = "q=";
    for (i in this.array) {
        q = q + "&q" + i + "=" + escape(this.array[i]);
    }
    var url = this.page;
    url = url + "?sid=" + Math.random();
    this.xmlHttp.open("POST", url, false);
    this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xmlHttp.send(q);
    this.answer = this.xmlHttp.responseText;
    return this.answer;
}

function postAsyncRequest(eventFunction) {
    if (eventFunction == null) {
        alert("PostAsyncRequest(eventFunction) required 1 parameter");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        var xh = this.xmlHttp;
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                eventFunction(xh.responseText);
            }
        }
        this.xmlHttp.open("POST", url, true);
        this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xmlHttp.send(q);
    }
}

function getRequest() {
    this.xmlHttp = this.CheckAjaxSupport();
    if (this.xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var i;
    var q = "&q=";
    for (i in this.array) {
        q = q + "&q" + i + "=" + escape(this.array[i]);
    }
    var url = this.page;
    url = url + "?sid=" + Math.random();
    url = url + q;
    this.xmlHttp.open("GET", url, false);
    this.xmlHttp.send();
    this.answer = this.xmlHttp.responseText;
    return this.answer;
}

function getAsyncRequest(eventFunction) {
    if (eventFunction == null) {
        alert("GetAsyncRequest(eventFunction) required 1 parameter");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                eventFunction(xh.responseText);
            }
        }
        this.xmlHttp.open("GET", url, true);
        this.xmlHttp.send();
    }
}

function timerRequest(eventFunction, delay) {
    if (eventFunction == null || delay == null) {
        alert("TimerRequest(eventFunction,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;
        setInterval(function () {
            xh.open("GET", url, false);
            xh.send();
            eventFunction(xh.responseText);
        }, delay);
    }
}

function timerAsyncRequest(eventFunction, delay) {
    if (eventFunction == null || delay == null) {
        alert("TimerAsyncRequest(div,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }

        var i;
        var q = "&q=";
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }

        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;

        setInterval(function () {
            xh.open("GET", url, true);
            xh.send();
            xh.onreadystatechange = function () {
                if (xh.readyState == 4 && xh.status == 200) {
                    eventFunction(xh.responseText);
                }
            }
        }, delay);

    }
}

function checkAjaxSupport() {
    try {
        // Firefox, Opera 8.0+, Safari
        this.xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return this.xmlHttp;
}
//#endregion

//#region Ajax Proxy Class//////

function AjaxProxy(ArraySet, Page, ProxyPage) {
    this.array = ArraySet;
    this.page = Page;
    this.proxyPage = ProxyPage;
    this.answer = "";
    this.CheckAjaxSupport = checkAjaxSupport;
    this.xmlHttp = null;
    this.TimerRequest = timerRequest;
    this.PostRequest = postRequest;
    this.PostAsyncRequest = postAsyncRequest;
    this.TimerAsyncRequest = timerAsyncRequest;

}

function postRequest() {
    this.xmlHttp = this.CheckAjaxSupport();
    if (this.xmlHttp == null) {
        alert("Your browser does not support AJAX!");
        return;
    }
    var i;
    var q = "q=" + this.proxyPage;
    for (i in this.array) {
        q = q + "&q" + i + "=" + escape(this.array[i]);
    }
    var url = this.page;
    url = url + "?sid=" + Math.random();
    this.xmlHttp.open("POST", url, false);
    this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    this.xmlHttp.send(q);
    this.answer = this.xmlHttp.responseText;
    return this.answer;
}

function postAsyncRequest(eventFunction) {
    if (eventFunction == null) {
        alert("PostAsyncRequest(eventFunction) required 1 parameter");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "q=" + this.proxyPage;
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        var xh = this.xmlHttp;
        xh.onreadystatechange = function () {
            if (xh.readyState == 4 && xh.status == 200) {
                eventFunction(xh.responseText);
            }
        }
        this.xmlHttp.open("POST", url, true);
        this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xmlHttp.send(q);
    }
}

function timerRequest(eventFunction, delay) {
    if (eventFunction == null || delay == null) {
        alert("TimerRequest(eventFunction,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }
        var i;
        var q = "&q=" + this.proxyPage;
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }
        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;
        setInterval(function () {
            xh.open("POST", url, false);
            xh.send();
            eventFunction(xh.responseText);
        }, delay);
    }
}

function timerAsyncRequest(eventFunction, delay) {
    if (eventFunction == null || delay == null) {
        alert("TimerAsyncRequest(div,delay) required 2 parameters");
    }
    else {
        this.xmlHttp = this.CheckAjaxSupport();
        if (this.xmlHttp == null) {
            alert("Your browser does not support AJAX!");
            return;
        }

        var i;
        var q = "&q=" + this.proxyPage;
        for (i in this.array) {
            q = q + "&q" + i + "=" + escape(this.array[i]);
        }

        var url = this.page;
        url = url + "?sid=" + Math.random();
        url = url + q;
        var xh = this.xmlHttp;

        setInterval(function () {
            xh.open("POST", url, true);
            xh.send();
            xh.onreadystatechange = function () {
                if (xh.readyState == 4 && xh.status == 200) {
                    eventFunction(xh.responseText);
                }
            }
        }, delay);

    }
}

function checkAjaxSupport() {
    try {
        // Firefox, Opera 8.0+, Safari
        this.xmlHttp = new XMLHttpRequest();
    }
    catch (e) {
        // Internet Explorer
        try {
            this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {
            this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    return this.xmlHttp;
}
//#endregion

//#region Json Class//////
function Json(JsonHandler, TableName, ProxyPage) {
    this.JH = JsonHandler;
    this.TableName = TableName;
    this.ProxyPage = ProxyPage;
    this.Insert = insert;
    this.Update = update;
    this.Delete = Del;
    this.Select = select;
    this.SecureSelect = secureSelect;
    this.Search = search;
    this.SecureSearch = secureSearch;
    this.WildSearch = wildSearch;
    this.SelectAll = selectAll;
    this.GetTableStructure = getTableStructure;
}

function Del(id, eventFunction) {
    var a = new Array();
    a[0] = "delete";
    a[1] = this.TableName;
    a[2] = id;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        return aj.PostRequest();
    }
}

function selectAll(eventFunction) {
    var a = new Array();
    a[0] = "selectAll";
    a[1] = this.TableName;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        var JObj = eval('(' + aj.PostRequest() + ')');
        return JObj;
    }
}

function update(JsonObj, eventFunction) {
    var updateObj;
    updateObj = "{";
    for (var key in JsonObj) {
        updateObj += "'" + key + "':'" + JsonObj[key] + "',";
    }
    updateObj = updateObj.slice(0, updateObj.length - 1);
    updateObj += "}";
    var a = new Array();
    a[0] = "update";
    a[1] = this.TableName;
    a[2] = updateObj;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        return aj.PostRequest();
    }
}

function insert(JsonObj, eventFunction) {
    var insertObj;
    insertObj = "{";
    for (var key in JsonObj) {
        insertObj += "'" + key + "':'" + JsonObj[key] + "',";
    }
    insertObj = insertObj.slice(0, insertObj.length - 1);
    insertObj += "}";
    var a = new Array();
    a[0] = "insert";
    a[1] = this.TableName;
    a[2] = insertObj;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        return aj.PostRequest();
    }
}

function search(JsonObj, WhereKey, WhereValue) {
    var returnObj = new Array();
    var x = 0
    for (var i = 0; i < JsonObj.length; i++) {

        if (JsonObj[i][WhereKey] == WhereValue) {

            returnObj[x] = JsonObj[i];
            x = x + 1;
        }

    }

    return returnObj;
}

function wildSearch(JsonObj, WhereKey, WhereValue) {


    var RgEx = new RegExp(escape(WhereValue), "i");
    var returnObj = new Array();
    var x = 0


    for (var i = 0; i < JsonObj.length; i++) {

        if (RgEx.test(JsonObj[i][WhereKey])) {

            returnObj[x] = JsonObj[i];
            x = x + 1;
        }
    }

    return returnObj;

}

function select(JsonObj, Id) {
    var returnObj;
    for (var i = 0; i < JsonObj.length; i++) {

        if (JsonObj[i]["ID"] == Id) {

            returnObj = JsonObj[i];

        }

    }

    return returnObj;

}

function getTableStructure(eventFunction) {
    var a = new Array();
    a[0] = "getTableStructure";
    a[1] = this.TableName;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        var JObj = eval('(' + aj.PostRequest() + ')');
        return JObj;
    }
}

function secureSelect(Id, eventFunction) {
    var a = new Array();
    a[0] = "secureSelect";
    a[1] = this.TableName;
    a[2] = Id;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        var JObj = eval('(' + aj.PostRequest() + ')');
        return JObj;
    }
}

function secureSearch(WhereKClause, eventFunction) {
    var a = new Array();
    a[0] = "secureSearch";
    a[1] = this.TableName;
    a[2] = WhereKClause;
    var aj;
    if (this.ProxyPage) {
        aj = new AjaxProxy(a, this.JH, this.ProxyPage);
    }
    else {
        aj = new Ajax(a, this.JH);
    }
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        var JObj = eval('(' + aj.PostRequest() + ')');
        return JObj;
    }
}
//#endregion