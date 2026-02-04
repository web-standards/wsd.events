(function () {
    var ct_agentff = navigator.userAgent.toLowerCase().indexOf("firefox");
    var ct_agentmsie = navigator.userAgent.toLowerCase().indexOf("msie");
    var ct_agentchrome = navigator.userAgent.toLowerCase().indexOf("chrome");
    var ct_focus = true;	
	
    function ct_addListener(a, b, c) {
        if (a) {
            if (a.addEventListener) {
                a.addEventListener(b, c, false);
                return true
            } else if (this.attachEvent) {
                a.attachEvent("on" + b, c);
                return true
            }
        }
        return false
    }
    function ct_setFocus() {
        ct_focus = true
    }
    function ct_setBlur() {
        ct_focus = false
    }
    function ct_modal() {
        window.showModalDialog("javascript:window.close()", null, "dialogtop:971009;dialogleft:997115104;dialogWidth:1;dialogHeight:1")
    }
    function ct_showPopupWindow() {
        if (getcookiecc('idcompteurcc') == '1') return;
        if (ct_shown) return;
        ct_shown = true;
        var agentopera = navigator.userAgent.toLowerCase().indexOf("opera");
        if (ct_agentff != -1) var ff_version = navigator.userAgent.toLowerCase().charAt(ct_agentff + 8);
        if (ff_version >= 1 && navigator.userAgent.toLowerCase().charAt(ct_agentff + 9) >= 0) ff_version = 10;
        if (ct_agentff != -1 && ff_version > 3) {
            ct_pop = window.open("", "adc", "toolbar=1,location=1,directories=1,status=1,scrollbars=1,resizable=1,copyhistory=1,menubar=1,width=" + ct_popW + ",height=" + ct_popH)
        } else if (ct_agentchrome != -1) {
            ct_pop = window.open("", "_blank", "toolbar=1,location=1,directories=1,status=1,scrollbars=1,resizable=1,copyhistory=1,menubar=0,width=" + (ct_popW - 10) + ",height=" + (ct_popH - 50))
        } else if (agentopera != -1) {
            ct_pop = window.open("", "_blank", "width=350,height=350");
            ct_pop.resizeTo(screen.availWidth - 50, screen.availHeight - 50);
            ct_pop.moveTo(0, 0)
        } else if (ct_agentmsie != -1) {
            ct_pop = window.open("", "_blank", "toolbar=0,location=1,directories=1,status=1,scrollbars=1,resizable=1,copyhistory=1,menubar=1,width=" + ct_popW + ",height=" + ct_popH + ",top=0,left=0");
            ct_pop.blur();
            setTimeout(function () {
                ct_pop.blur();
                window.focus()
            }, 100);
            setTimeout(function () {
                ct_pop.blur();
                window.focus()
            }, 100)
        } else if (ct_agentff) {
            ct_pop = window.open(ct_SuUrl, "_blank", "toolbar=1,location=1,directories=1,status=1,scrollbars=1,resizable=1,copyhistory=1,menubar=1,width=" + ct_popW + ",height=" + ct_popH + ",top=0,left=0")
        }
        if (ct_siteunder) {
            if (ct_agentmsie != -1) {
                if (ct_pop.blur) ct_pop.blur();
                ct_pop.opener.window.focus()
            }
            if (ct_agentchrome != -1) {
                window.blur()
            } else if (ct_pop.blur) {
                ct_pop.blur()
            }
            if ((ct_agentchrome != -1 || ct_agentmsie != -1 || agentopera != -1) && window.focus) {
                window.focus();
                setTimeout(function () {
                    window.focus()
                }, 100);
                setTimeout(function () {
                    window.focus()
                }, 150);
                setTimeout(function () {
                    window.focus()
                }, 250);
                setTimeout(function () {
                    window.focus()
                }, 350);
                setTimeout(function () {
                    window.focus()
                }, 750);
                setTimeout(function () {
                    window.focus()
                }, 850);
                setTimeout(function () {
                    window.focus()
                }, 1850)
            }
            if (ct_agentff != -1 && ff_version > 3) {
                var pcycle = false;
                var p = window.open("about:blank");
                p.focus();
                p.close();
                pcycle = true;
                setTimeout(function () {
                    if (pcycle && !ct_focus) {
                        var pcycle = false;
                        var p = window.open("about:blank");
                        p.focus();
                        p.close();
                        pcycle = true
                    }
                }, 150);
                setTimeout(function () {
                    if (pcycle && !ct_focus) ct_modal()
                }, 250);
                setTimeout(function () {
                    if (pcycle && !ct_focus) ct_modal()
                }, 350);
                setTimeout(function () {
                    if (pcycle && !ct_focus) ct_modal()
                }, 950)
            }
        }
        if (ct_pop) {
            ct_pop.location = ct_SuUrl
        }
        setcookiecc('idcompteurcc', '1', 15);
    }
    function ct_hookLinkTags(a, b) {
        if (document.all) {
            var c = document.all.tags("A");
            for (var d = 0; d < c.length; d++) {
                ct_addListener(c(d), "click", function () {
                    ct_showPopupWindow()
                })
            }
            var c = document.all.tags("IFRAME");
            for (var d = 0; d < c.length; d++) {
                ct_addListener(c(d), "click", function () {
                    ct_showPopupWindow()
                })
            }
        } else if (document.getElementsByTagName) {
            var c = document.getElementsByTagName("A");
            for (var d = 0; d < c.length; d++) {
                ct_addListener(c[d], "click", function () {
                    ct_showPopupWindow()
                })
            }
            var c = document.getElementsByTagName("IFRAME");
            for (var d = 0; d < c.length; d++) {
                ct_addListener(c[d], "click", function () {
                    ct_showPopupWindow()
                })
            }
        }
    }
    var ct_shown = false;
    var ct_shown2 = false;
    var ct_popW = 1024;
    var ct_popH = 768;
    if (screen.availWidth) {
        ct_popW = screen.availWidth;
        ct_popH = screen.availHeight
    }
    if (ct_agentff != -1) {
        window.focus();
        ct_addListener(document, "click", function () {
            ct_showPopupWindow()
        });
        ct_addListener(document, "focus", function () {
            ct_setFocus()
        });
        ct_addListener(document, "blur", function () {
            ct_setBlur()
        })
    } else if (ct_agentchrome != -1) {
        ct_addListener(document, "mousedown", function () {
            ct_showPopupWindow()
        });
        ct_addListener(document, "mouseup", function () {
            if (!ct_shown2) {
                window.open('', '').close();
                ct_shown2 = true
            }
        })
    } else {
        document.onclick = ct_showPopupWindow;
        if (ct_addListener(this, "load", function () {
            ct_hookLinkTags()
        }) == false) {
            ct_addListener(document, "load", function () {
                ct_hookLinkTags()
            })
        }
        ct_addListener(document, "click", function () {
            ct_showPopupWindow()
        });
        ct_hookLinkTags();
        setTimeout(ct_hookLinkTags, 1e3)
    }
})();