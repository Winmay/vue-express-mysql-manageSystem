var axios = require("axios");

module.exports = {
    ajaxGet (api, cb) {
        console.log(api);
        return new Promise((resolve,reject)=>{
            axios.get(api)
                .then(response => {
                    cb();
                    resolve();
                })
                .catch(err => {
                    console.log(err);
                })
        })
    },
    ajaxPost (api, post, cb) {
        console.log(api);
        return new Promise((resolve,reject)=>{
            axios.post(api, post)
                .then(response => {
                    cb();
                    resolve();
                })
                .catch(err => {
                    reject(err);
                    console.log(err);
                })
        })
    }
}