const con = require('../Configs/cone');

module.exports={
    insertUser(user){
        return new Promise((resolve,reject)=>{
            let query='INSERT INTO wannachat.users SET ?';
            con.query(query,[user],(err,rows)=>{
                if(err) reject(err);
                else resolve (true);
            });
        });
    },

    getUserById(id){
        return new Promise((resolve,reject)=>{
            con.query('select * from wannachat.users where user_id = ?', [id], (err,rows)=>{
                if(err) reject(err);
                else resolve(rows);
            })
        })
    }
}