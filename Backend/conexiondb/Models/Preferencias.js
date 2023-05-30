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

    getPreferencias(usuario){
        return new Promise((resolve,reject)=>{
            con.query('select * from wannachat.preferencias_usuario where usuario = ? order by preferencia_id desc limit 1;', [usuario], (err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }

}