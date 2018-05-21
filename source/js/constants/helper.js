//helper.js

export const isImageExists = async (server_url, image_url) => {
    // var http = new XMLHttpRequest();
    // http.open('HEAD', image_url, false);
    // http.send();
    // return http.status != 404;

    // var http = new XMLHttpRequest();
    var url = server_url+"chk_image_availablity";
    var params = "image_name="+image_url;
    // http.open("POST", url, true);
    // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // let resp = await http.send(params);
    // console.log("status ===> ",image_url,http,http.status);
    // return http.status == 200;
    // http.onreadystatechange = function() {//Call a function when the state changes.
    //     if(http.readyState == 4 && http.status == 200) {
    //         return true;
    //     } else if(http.readyState == 4 && http.status == 404){
    //         return false;
    //     }
    // }
    

    // console.log("image status ===> ",http.status);
    let resp = await new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        xhr.onerror = function () {
            resolve(false);
        };
        xhr.send(params);
    });
    console.log("resp1234567890 ==> ",resp);
    return resp;
}
