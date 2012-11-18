/// <reference path="Ark.js" />
//asdasdasda//

var Aveds = Aveds || {};



 Aveds.AjaxSocket = Aveds.AjaxSocket || {};

Aveds.AjaxSocket.ArkHandler = "http://192.168.0.108:4986/Handler/ArkHandler.ashx";

Aveds.AjaxSocket.LocalHandler = "Handler.ashx";

Aveds.AjaxSocket.Socket = function () {
    this.Open = Aveds.AjaxSocket.Open;
    this.Close = Aveds.AjaxSocket.Close;
    this.Send = Aveds.AjaxSocket.Send;
    this.SendEvent = Aveds.AjaxSocket.SendEvent;
    this.Receive = Aveds.AjaxSocket.Receive;
    this.ReceiveEvent = Aveds.AjaxSocket.ReceiveEvent;
    this.ReceiveErrorEvent = Aveds.AjaxSocket.ReceiveErrorEvent;
    this.ReceiveHistory = Aveds.AjaxSocket.ReceiveHistory;
    this.SocketId = Aveds.AjaxSocket.GUID();
    this.Sid = 0;
    this.ArkId = 0;
    this.GUID = Aveds.AjaxSocket.GUID;
    this.Status = 0; /// 0 = Closed, 1 = Opened, 2 = Alive
};

Aveds.AjaxSocket.Open = function () {
    var ark = new Aveds.Ark.AvedsArk(Aveds.AjaxSocket.ArkHandler, Aveds.AjaxSocket.LocalHandler);
    var Rqu_A = new ark.Rqu_Ark();
    Rqu_A.ArkId = ark.GUID();
    Rqu_A.Data = "{'SocketId': '" + this.SocketId + "'}";
    Rqu_A.InterfaceId = 21;
    Rqu_A.Function = "Open";
    Rqu_A.Sid = this.Sid;
    var Rsp_A = new ark.Rsp_Ark(ark.SendArk(Rqu_A));
    if (Rsp_A.Success) {
        if (Rsp_A.Data.Success) {
            this.Status = 1;
            this.Receive(Rsp_A, this);
        }
    }
};

Aveds.AjaxSocket.Close = function () {
    this.Status = 0;
};

Aveds.AjaxSocket.Send = function (SocketData) {
    var ark = function () { };
    ark.prototype = new Aveds.Ark.AvedsArk(Aveds.AjaxSocket.ArkHandler, Aveds.AjaxSocket.LocalHandler);
    ark.prototype.MainObj = this;
    var Rqu_A = new ark.prototype.Rqu_Ark();
    Rqu_A.ArkId = ark.prototype.GUID();
    Rqu_A.Data = "{'SocketId':'" + this.SocketId + "','SocketData':'" + SocketData + "'}";
    Rqu_A.InterfaceId = 21;
    Rqu_A.Function = "Send";
    Rqu_A.Sid = this.Sid;



    ark.prototype.SendArk = function (Rqu_Ark, eventFunction, MainObj) {
        var ArkStr = this.Rqu_ArkToStr(Rqu_Ark);
        var a = [];
        a[0] = ArkStr;
        var aj = function () { };
        aj.prototype = new AjaxProxy(a, this.AjaxProxyHandler, this.AvedsArkHandler);
        aj.prototype.MainObj = MainObj;


        aj.prototype.PostAsyncRequest = function (eventFunction) {
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
                var xh = function () { };
                xh.prototype = this.xmlHttp;
                xh.prototype.MainObj = this.MainObj;
                xh.prototype.onreadystatechange = function () {
                    if (xh.prototype.readyState == 4 && xh.prototype.status == 200) {
                        eventFunction(xh.prototype.responseText, xh.prototype.MainObj);
                    }
                }
                this.xmlHttp.open("POST", url, true);
                this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                this.xmlHttp.send(q);
            }
        }
        if (eventFunction) {
            aj.prototype.PostAsyncRequest(eventFunction);
        }
        else {
            return eval("(" + aj.prototype.PostRequest() + ")");
        }
    }

    ark.prototype.SendArk(Rqu_A, this.SendEvent, this);
};

Aveds.AjaxSocket.SendEvent = function (e, MainObj) {
    var stop = e;

};

Aveds.AjaxSocket.Receive = function (e, MainObj) {
    if (MainObj.Status != 0) {
        MainObj.Status = 2;
        MainObj.ReceiveEvent(e, MainObj);
        var ark = function () { };
        ark.prototype = new Aveds.Ark.AvedsArk(Aveds.AjaxSocket.ArkHandler, Aveds.AjaxSocket.LocalHandler);
        ark.prototype.MainObj = MainObj;
        var Rqu_A = new ark.prototype.Rqu_Ark();
        if (MainObj.ArkId == 0) {
            MainObj.ArkId = ark.prototype.GUID();
        }
        Rqu_A.ArkId = MainObj.ArkId; //MainObj.SocketId; //ark.prototype.GUID();
        Rqu_A.Data = "{'SocketId': '" + MainObj.SocketId + "' }";
        Rqu_A.InterfaceId = 21;
        Rqu_A.Function = "Receive";
        Rqu_A.Watcher = true;
        Rqu_A.WatcherTimer = 1000;
        Rqu_A.Sid = MainObj.Sid;


        ark.prototype.SendArk = function (Rqu_Ark, eventFunction, MainObj) {
            var ArkStr = this.Rqu_ArkToStr(Rqu_Ark);
            var a = [];
            a[0] = ArkStr;
            var aj = function () { };
            aj.prototype = new AjaxProxy(a, this.AjaxProxyHandler, this.AvedsArkHandler);
            aj.prototype.MainObj = MainObj;


            aj.prototype.PostAsyncRequest = function (eventFunction) {
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
                    var xh = function () { };
                    xh.prototype = this.xmlHttp;
                    xh.prototype.MainObj = this.MainObj;
                    xh.prototype.onreadystatechange = function () {
                        if (xh.prototype.readyState == 4) {
                            if (xh.prototype.status == 200) {
                                eventFunction(xh.prototype.responseText, xh.prototype.MainObj);
                            }
                            else {
                                xh.prototype.MainObj.ReceiveErrorEvent(xh.prototype, xh.prototype.MainObj);
                                return;
                            }
                        }
                    }
                    this.xmlHttp.open("POST", url, true);
                    this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    this.xmlHttp.send(q);
                }
            }


            if (eventFunction) {
                aj.prototype.PostAsyncRequest(eventFunction);
            }
            else {
                return eval("(" + aj.prototype.PostRequest() + ")");
            }
        }

        ark.prototype.SendArk(Rqu_A, MainObj.Receive, MainObj);


    }
};

Aveds.AjaxSocket.ReceiveErrorEvent = function (e, MainObj) {

}

Aveds.AjaxSocket.ReceiveEvent = function (e, MainObj) {
    var stop = e;
};

Aveds.AjaxSocket.ReceiveHistory = function (BeginIndex, EndIndex) {
    var ark = function () { };
    ark.prototype = new Aveds.Ark.AvedsArk(Aveds.AjaxSocket.ArkHandler, Aveds.AjaxSocket.LocalHandler);
    ark.prototype.MainObj = this;
    var Rqu_A = new ark.prototype.Rqu_Ark();
    Rqu_A.ArkId = ark.prototype.GUID();
    Rqu_A.Data = "{'SocketId':'" + this.SocketId + "','BeginIndex':'" + BeginIndex + "','EndIndex':'" + EndIndex + "'}";
    Rqu_A.InterfaceId = 21;
    Rqu_A.Function = "ReceiveHistoryData";
    Rqu_A.Sid = this.Sid;



    ark.prototype.SendArk = function (Rqu_Ark, eventFunction, MainObj) {
        var ArkStr = this.Rqu_ArkToStr(Rqu_Ark);
        var a = [];
        a[0] = ArkStr;
        var aj = function () { };
        aj.prototype = new AjaxProxy(a, this.AjaxProxyHandler, this.AvedsArkHandler);
        aj.prototype.MainObj = MainObj;


        aj.prototype.PostAsyncRequest = function (eventFunction) {
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
                var xh = function () { };
                xh.prototype = this.xmlHttp;
                xh.prototype.MainObj = this.MainObj;
                xh.prototype.onreadystatechange = function () {
                    if (xh.prototype.readyState == 4 && xh.prototype.status == 200) {
                        eventFunction(xh.prototype.responseText, xh.prototype.MainObj);
                    }
                }
                this.xmlHttp.open("POST", url, true);
                this.xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                this.xmlHttp.send(q);
            }
        }
        if (eventFunction) {
            aj.prototype.PostAsyncRequest(eventFunction);
        }
        else {
            return eval("(" + aj.prototype.PostRequest() + ")");
        }
    }

    ark.prototype.SendArk(Rqu_A, this.ReceiveHistoryEvent, this);
}

Aveds.AjaxSocket.ReceiveHistoryEvent = function (e, MainObj) {
    var stop = e;
}

Aveds.AjaxSocket.GUID = function () {
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



