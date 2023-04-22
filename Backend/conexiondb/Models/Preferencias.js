const con = require('../Configs/cone');

module.exports={
    insertPreferencia(preferencia){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO wannachat.preferencias_usuario SET ?';
            con.query(query,[preferencia],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

}