const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


exports.loginpage = (req,res) => {
    res.render('loginpage');
}

exports.userloginpage = (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    pool.getConnection((err,Connection) => {
        if(err) throw err;
        console.log('Connected to database!');
        Connection.query('SELECT email,password FROM users WHERE email=? AND password=?'
        ,[email ,password]
        , (err,result) => {
            Connection.release();
        if(!err){
           res.redirect('dashboard');
        }else{
            res.send("Invalid Username and Password");
        }
        });
    })
}

exports.userlogin = (req,res) => {
    
}

exports.view = (req,res) => {
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');
        Connection.query('select * from students'
        , (err, rows) => {
            Connection.release();
        if(!err){
            res.render('dashboard', {rows} );
        }else {
            console.log('Error1');
        }
        console.log('The data from student table is:',rows);
        });
    });
} 

exports.find = (req,res) => {
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');

        let searchTerm = req.body.search;   
        Connection.query('select id,name,roll_no,department from students WHERE name LIKE ?'
        ,['%' + searchTerm + '%']
        , (err, rows) => {
            Connection.release();
        if(!err){
            res.render('dashboard', {rows} );
        }else {
            console.log('Error2');
        }
        console.log('The data from student table is:',rows);
        });
    })
}

exports.form = (req,res) => {
    res.render('add-user');
}


exports.create = (req,res) => {
    const {name, roll_no,department} = req.body;
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');   
        let qry1= "INSERT INTO students SET name=? , roll_no=?,department=?";
        Connection.query(qry1,
        [name,roll_no,department], (err, rows) => {
            Connection.release();
        if(!err){
            res.render('add-user', {alert: 'Details Added Successfully!'} );
        }else {
            console.log('Error3');
        }
        console.log('The data from student table is:',rows);
        }); 
    })
}


exports.edit = (req,res) => {
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');
        Connection.query('select id,name,roll_no,department from students WHERE id=?'
        ,[req.params.id]
        , (err, rows) => {
            Connection.release();
        if(!err){
            res.render('edit-user', {rows} );
        }else {
            console.log('Error4');
        }
        console.log('The data from student table is:',rows);
        });
    });
}


exports.update = (req,res) => {
    const {name, roll_no,department} = req.body;
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');
        Connection.query('UPDATE students SET name=?,roll_no=?,department=? WHERE id=?'
        ,[name,roll_no,department,req.params.id]
        , (err, rows) => {
            Connection.release();
        if(!err){
            pool.getConnection((err, Connection) => {
                if(err) throw err;
                console.log('Connected to database!');
                Connection.query('select id,name,roll_no,department from students WHERE id=?'
                ,[req.params.id]
                , (err, rows) => {
                    Connection.release();
                if(!err){
                    res.render('edit-user', {rows, alert:'Details Updated'} );
                }else {
                    console.log('Error5');
                }
                console.log('The data from student table is:',rows);
                });
            }); 
        }else {
            console.log('Error6');
        }
        console.log('The data from student table is:',rows);
        });
    });
}


exports.delete = (req,res) => {
    pool.getConnection((err, Connection) => {
        if(err) throw err;
        console.log('Connected to database!');
        Connection.query('DELETE FROM students WHERE id=?', [req.params.id], (err, rows) => {
            Connection.release();
        if(!err){
            res.redirect('/dashboard');
        }else {
            console.log('Error7');
        }
        console.log('The data from student table is:',rows);
        });
    });
}      