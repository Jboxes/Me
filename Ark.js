/// <reference path="FP_Server.js" />


var Aveds = Aveds || {};

Aveds.Ark = Aveds.Ark || {};

Aveds.Ark.SessionId = Aveds.Ark.SessionId || {};

Aveds.Ark.AvedsArk = function (AvedsArkHandler, AjaxProxyHandler) {
    this.AvedsArkHandler = AvedsArkHandler;
    this.AjaxProxyHandler = AjaxProxyHandler;
    this.Rqu_Ark = Aveds.Ark.Rqu_Ark;
    this.Rsp_Ark = Aveds.Ark.Rsp_Ark;
    this.SendArk = Aveds.Ark.SendArk;
    this.GUID = Aveds.Ark.GUID;
    this.Rqu_ArkToStr = Aveds.Ark.Rqu_ArkToStr;
}

Aveds.Ark.Rqu_Ark = function (Rqu_Ark) {
    if (Rqu_Ark) {
        this.ArkId = Rqu_Ark.ArkId;
        this.ApiId = Rqu_Ark.ApiId;
        this.ApiKey = Rqu_Ark.ApiKey;
        this.Sid = Rqu_Ark.Sid;
        this.InterfaceId = Rqu_Ark.InterfaceId;
        this.Function = Rqu_Ark.Function;
        this.Data = Rqu_Ark.Data;
        this.DataType = Rqu_Ark.DataType;
        this.Watcher = Rqu_Ark.Watcher;
        this.WatcherTimer = Rqu_Ark.WatcherTimer;
    }
    else {
        this.ArkId = "";
        this.ApiId = "";
        this.ApiKey = "";
        this.Sid = "";
        this.InterfaceId = "";
        this.Function = "";
        this.Data = "";
        this.DataType = "";
        this.Watcher = "";
        this.WatcherTimer = "";
    }


}

Aveds.Ark.Rsp_Ark = function (Rsp_Ark) {
    if (Rsp_Ark) {
        this.ArkId = Rsp_Ark.ArkId;
        this.Sid = Rsp_Ark.Sid;
        this.InterfaceId = Rsp_Ark.InterfaceId;
        this.Data = Rsp_Ark.Data;
        this.DataType = Rsp_Ark.DataType;
        this.Success = Rsp_Ark.Success;
        this.ErrorMsg = Rsp_Ark.ErrorMsg;
    }
    else {
        this.ArkId = "";
        this.Sid = "";
        this.InterfaceId = "";
        this.Data = "";
        this.DataType = "";
        this.Success = "";
        this.ErrorMsg = "";
    }
}

Aveds.Ark.SendArk = function (Rqu_Ark, eventFunction) {
    var ArkStr = this.Rqu_ArkToStr(Rqu_Ark);

    var a = [];
    a[0] = ArkStr;
    var aj = new AjaxProxy(a, this.AjaxProxyHandler, this.AvedsArkHandler);
    if (eventFunction) {
        aj.PostAsyncRequest(eventFunction);
    }
    else {
        return eval("(" + aj.PostRequest() + ")");
    }
}

Aveds.Ark.GUID = function() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j == 8 || j == 12 || j == 16 || j == 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result
}

Aveds.Ark.Rqu_ArkToStr = function (Rqu_Ark) {
    if (Rqu_Ark == undefined) {
        return '';
    }
    var r = [];
    if (typeof Rqu_Ark == 'string') {
        return '"' + Rqu_Ark.replace(/([\"\\])/g, "\\$1").replace(/(\n)/g, "\\n").replace(/(\r)/g, "\\r").replace(/(\t)/g, "\\t") + '"';
    }
    if (typeof Rqu_Ark == "object") {
        if (!Rqu_Ark.sort) {
            for (var i in Rqu_Ark)
                r.push('"' + i + '":' + this.Rqu_ArkToStr(Rqu_Ark[i]));
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(Rqu_Ark.toString)) {
                r.push('toString:' + Rqu_Ark.toString.toString());
            }
            r = "{" + r.join() + "}"
        } else {
            for (var i = 0; i < Rqu_Ark.length; i++)
                r.push(this.Rqu_ArkToStr(Rqu_Ark[i]))
            r = "[" + r.join() + "]";
        }
        return r;
    }
    return Rqu_Ark.toString().replace(/\"\:/g, "':''");
}






