console.debug("Created by Jakub Kurs. Contact: jakub.kurs@pl.experis.com");
var kanban = [
    "Column New",
    "Column Active",
    "Column Blocked",
    "Column Resolved",
    "Column Closed"
];

var kanbanValid = [
    "column-new",
    "column-active",
    "column-blocked",
    "column-resolved",
    "column-closed"
];

var users = [];
var funcTimer = 0;
var watchdog;
var doesWatchdogWorks = false;
var isReady = true
var usChScp = false
var doesAlllTasksLoaded = false
var hoverDetect = false
var lastUpdate = null
var isMakingBoard = false

var cd = 0;
var oXhr = window.XMLHttpRequest;

var knownEvents = [
    "_apis/IdentityPicker/Identities",
    "_apis/customerintelligence/Events",
    "_apis/Contribution/nodes/query"
]

class externalS{
    cd(txt){
        console.debug(`[${(new Date).toTimeString()}] ${txt}`)
    }
}

async function wtchdog() {
     window.XMLHttpRequest = newXHR;
};

class main{
    #tsr = 0;

    waitForElement(elementId, callBack, id){
        if(document.getElementsByClassName(elementId)[id] == undefined)
            callBack(false);
        if(this.#tsr >= 5){
            callBack(false);
        }
        this.#tsr++;
        window.setTimeout(function(){
            var element = document.getElementsByClassName(elementId)[id];
            if(element){
                callBack(true);
            }
        },500)
    }

    async startup(){
        var fRun = document.getElementsByClassName('board-tile').length;
        this.waitForElement("see-more-items", async function(v){
            if(v){
                document.getElementsByClassName('see-more-items')[0].click();
            }
        }, 0);
        this.waitForElement("see-more-items", async function(v){
            if(v){
                document.getElementsByClassName('see-more-items')[1].click();
            }
        }, 1);
        while(1 == 1){
            if(document.getElementsByClassName('board-tile').length > fRun && document.getElementsByClassName('status-indicator')[0].style.cssText == "display: none;"){
                break;
            }else{
                await sleep(1)
            }
        }
        await sleep(550)
        await wtchdog()
    }
    insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    async moveTaskToUser(element, user, taskStatus){
        if(taskStatus == "Issue" || document.getElementsByClassName(`${user}${this.handleColumn(taskStatus)}`)[0] == undefined){
            return clearInterval(watchdog);
        }else{
            document.getElementsByClassName(`${user}${this.handleColumn(taskStatus)}`)[0].appendChild(element);
        }
    }
    
    getUserColumnHeight(){
        let userColumns = [];
        var rth = this;
        Array.prototype.forEach.call(users, function(k){
            let biggestHeight = 0;
            Array.prototype.forEach.call(kanbanValid, function(s){
                if(document.getElementsByClassName(`${k}-${s}`)[0] == undefined){
                    return rth.getTasksAndUsers();
                }
                document.getElementsByClassName(`${k}-${s}`)[0].style.height = null;
                let actual = document.getElementsByClassName(`${k}-${s}`)[0].clientHeight;
                if(actual > biggestHeight)
                    biggestHeight = actual;
                document.getElementsByClassName(`${k}-${s}`)[0].style.height = `${biggestHeight}px`;
            }, userColumns, rth);
            Array.prototype.forEach.call(kanbanValid, function(s){
               if(document.getElementsByClassName(`${k}-${s}`)[0] == undefined){
                   return rth.getTasksAndUsers();
               }
                document.getElementsByClassName(`${k}-${s}`)[0].style.height = `${biggestHeight}px`;
            }, userColumns, rth);
        }, userColumns, rth);
        return userColumns;
    }
    
    handleColumn(string){
        let vasr = undefined;
        Array.prototype.forEach.call(kanban, function(k){
            if(string.includes(k)){
                switch(k){
                    case "Column New":
                        return vasr = `-column-new`;
                    case "Column Active":
                        return vasr = `-column-active`;
                    case "Column Blocked":
                        return vasr = `-column-blocked`;
                    case "Column Resolved":
                        return vasr = `-column-resolved`;
                    case "Column Closed":
                        return vasr = `-column-closed`;
                    default:
                        return vasr = `-column-new`;
                }
            }
        },vasr);
        return vasr;
    }
    
    createUserSpan(user){
        let w = document.getElementsByClassName("content-container row content")[0];
        let zs = w.getElementsByClassName("cell");
        let vasd = 0;
        var rth = this;
        Array.prototype.forEach.call(zs, function(k){
            let cls = undefined;
            switch(vasd){
                case 0:
                    cls = `${user}-${kanbanValid[vasd]}`;
                    break;
                case 1:
                    cls = `${user}-${kanbanValid[vasd]}`;
                    break;
                case 2:
                    cls = `${user}-${kanbanValid[vasd]}`;
                    break;
                case 3:
                    cls = `${user}-${kanbanValid[vasd]}`;
                    break;
                case 4:
                    cls = `${user}-${kanbanValid[vasd]}`;
                    break;
            }
            var tEl = document.getElementsByClassName(cls)[0]
            if(tEl === undefined){
                let newEl = document.createElement("div");
                newEl.className = `${user}-${kanbanValid[vasd]}`;
                if(vasd == 0)
                    newEl.innerHTML = `<span style="font-size: 115%"><strong>${user}</strong></span>`;
                if(vasd !== 0)
                    newEl.setAttribute('style', 'padding-top: 39px;')
                newEl.style.marginTop = "20px";
                newEl.innerHTML += ` <span style="font-size: 115%">${kanban[vasd].replace('Column ', "")}</span><hr style="border: 1px solid rgb(152 198 255); border-radius: 5px; background-color: rgb(152 198 255)">`
                newEl.classList.add("animate__animated")
                newEl.classList.add("animate__slideInUp")
                rth.insertAfter(newEl, k.getElementsByClassName("member-border-line")[0])
            }
            vasd++;
        }, vasd, rth)
        document.getElementsByClassName('content-container')[0].style.visibility = "visible";
    }
   
    async getTasksAndUsers(){
        if(document.getElementsByClassName('tabbed-focus')[0] !== undefined  || document.getElementsByClassName('combo-behavior')[0] !== undefined)
            return false;
        let s = document.getElementsByClassName('board-tile');
        let tofobjc = []
        ext.cd("Collecting all tasks on board")
        isMakingBoard = true
        Array.prototype.forEach.call(s,function(wr){
                let tmp = wr.getElementsByClassName('identity-picker-resolved-name')
                if(tmp !== "")
                    tofobjc.splice(-1, 0, wr)
        });
        tofobjc.sort(function(a, b){
            if(a.getElementsByClassName('identity-picker-resolved-name')[0] !== undefined){
                if(a.getElementsByClassName('identity-picker-resolved-name') !== ""){
                    return parseFloat(a.getElementsByClassName('id')[0].innerHTML) - parseFloat(b.getElementsByClassName('id')[0].innerHTML)
                }
            }
        }) 
        tofobjc.sort(function(a, b){
            if(a.getElementsByClassName('identity-picker-resolved-name')[0] !== undefined){
                if ( a.getElementsByClassName('identity-picker-resolved-name')[0].innerHTML == "Unassigned"){
                    return 0
                }else{
                    return -1;
                }
            }
        })
        var rth = this;
        Array.prototype.forEach.call(tofobjc, function(wr){
            if(wr.getAttribute('aria-label') == "Issue"){
                isReady = false
                return clearInterval(watchdog)
            }
            let kwr = 0;
            let o = wr.getElementsByClassName('identity-picker-resolved-name')
            Array.prototype.forEach.call(o, function(a){
                if(wr.classList.contains('filterHide'))
                    return false;
                if(kwr%2 !== 1){
                    if(document.getElementsByClassName(`${a.innerHTML}-column-new`)[0] == undefined){
                        if(users.indexOf(a.innerHTML) === -1){
                            users.splice(0, 0, a.innerHTML);  
                            if(o.length > 1)
                                rth.createUserSpan(`${a.innerHTML}`);  
                        }
                    }
                    if(users.indexOf(a.innerHTML) !== -1){
                        rth.moveTaskToUser(wr, a.innerHTML, wr.getAttribute('aria-label'));
                            if(o.length == 1 || o.length == 0){
                                rth.moveTaskToUser(wr, "Unassigned", wr.getAttribute('aria-label'));
                        }else{
                            rth.moveTaskToUser(wr, a.innerHTML, wr.getAttribute('aria-label'));
                        }
                    }
                    kwr++;
                }
            }, kwr, rth);
        }, rth)
        await restoreWatchDog();
        isReady = true;
    }
}

/*
    > Main
*/
var ext = new externalS;
var m = new main;

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function findDestrutiveEvents(url){
    Array.prototype.forEach.call(knownEvents,function(wr){
        if(url.includes(wr)){
            return true
        }
        return false
    });
 }

function newXHR() {
    var rXhr = new oXhr();
    rXhr.addEventListener("readystatechange", async function(s) { 
        if(!findDestrutiveEvents(s.target.responseURL) || !doesWatchdogWorks){
            ext.cd("Web event triggered. Waiting for next event...") 
            await updateBoardAfterLastEvent()
        }
    }, false);
    return rXhr;
}
 
function restoreWatchDog(){
    doesWatchdogWorks = false;
    clearInterval(watchdog);
    watchdog = null;
}

async function updateBoardAfterLastEvent(){
    if(doesWatchdogWorks == true){
        return;
    }else{
        if(isMakingBoard)
            return false;
        doesWatchdogWorks = true
        watchdog = await setInterval(async () => {
               await m.getTasksAndUsers();
               await m.getUserColumnHeight();
               await restoreWatchDog();
        }, 100);
    }
}

m.startup();