const fs = require("fs");
const httpMsgs = require("http-msgs");
const path = require("path");

let replaceParams = function(curHtml, params){
    let returnHtml = curHtml;
    for (const key in params) {
        let reg = new RegExp(`{{${key}}}`, "g");
        returnHtml = returnHtml.replace(reg, params[key]);

    }
    return returnHtml;
}

exports.pageWideTemplate = function(body, req, res, params){
    try {
        let curHtml='';
        fs.readFile(path.join(__dirname, "/html/partials/header.html"), "utf8", function(err, data){
            if(err){
                throw err;
            }else{
                curHtml = data;
                fs.readFile(path.join(__dirname, `/html/${body}`), "utf8", function(err, data){
                    if(err){
                        throw err;
                    }else{
                        curHtml += data;
                        fs.readFile(path.join(__dirname, "/html/partials/footer.html"), "utf8", function(err, data){
                            if(err){
                                throw err;
                            }else{
                                curHtml += data;
                                curHtml = replaceParams(curHtml, params);
                                httpMsgs.sendHTML(req, res, curHtml);
                            }
                        })
                    }
                })
            }
        })
        
    } catch (error) {
        httpMsgs.send500(req, res, error);
        
    }

}

exports.siebarTemplate= function(){
    
}








// let replacestring = function(curHtml, param){
//     let returnHtml =curHtml;
//     for (const key in param) {
//         let patt = new RegExp(`{{${key}}}`, "g");
//         console.log(param[key]);
//         console.log(patt);
//         returnHtml = returnHtml.replace(patt, param[key]);
//     }

//     return returnHtml;

//    }