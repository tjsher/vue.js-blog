var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: 'password',
    database: 'blog',
});
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/img', express.static('img'));
app.all('*', function(req, res, next) {
    console.log("收到请求");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});
var formidable = require("formidable");
fs = require("fs");

app.post("/login", function(req, res) {
    console.log("login");
    console.log(JSON.stringify(req.body));
    let adminName = req.body.adminName;
    let adminPass = req.body.adminPass;
    let avatar = 1;
    console.log(adminName, adminPass);
    connection.query("select adminName adminPass from \
                    admin where adminName=? and adminPass=?", [adminName, adminPass],
        function(err, rows) {
            if (err)
                throw err;
            if (rows)
                if (adminName == rows.adminName) {
                    console.log("验证成功！");
                    res.send(JSON.stringify({ code: 200 }));
                }
            else
                res.send(JSON.stringify({ code: 199 }));
        });
});


app.post("/articleImage", function(req, res) {
    console.log("articleImage");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.uploadDir = "./img/";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) {}
        console.log("files---------------\n", files);
        connection.query("update articles set img_url = ? where", [adminName, adminPass],
            function(err, rows) {
                if (err)
                    throw err;
                if (rows)
                    if (adminName == rows.adminName) {
                        console.log("验证成功！");
                        res.send(JSON.stringify({ code: 200 }));
                    }
                else
                    res.send(JSON.stringify({ code: 199 }));
            });
    });
});

app.post("/addArticle", function(req, res) {
    console.log("addArticle1");
    console.log(JSON.stringify(req.body));
    if (req.body.type === "text") { //文本
        connection.query("insert into articles (title,author,content,img_url) values(?,?,?,?)",
            [req.body.title, req.body.author, req.body.content, "aaaa"],
            function(err, rows) {
                if (err)
                    throw err;
                if (rows)
                    res.send(JSON.stringify({ code: 200 }));

                else
                    res.send(JSON.stringify({ code: 199 }));
            });

    } else //图片
    {
        console.log("addArticle2");
        var form = new formidable.IncomingForm();
        form.uploadDir = "./img/";
        form.keepExtensions = true;
        form.parse(req, function(err, fields, files) {
            if (err) {}
            console.log("files---------------\n", files);
            connection.query("update articles set img_url = ? where img_url =?;",
                [files.path, "aaaa"],
                function(err, rows) {
                    if (err)
                        throw err;
                    if (rows)
                        res.send(JSON.stringify({ code: 200 }));
                    else
                        res.send(JSON.stringify({ code: 199 }));
                });

        });
    }
});
app.get("/bilibili", function(req, res) {
    console.log("bilibili");

    connection.query("select * from biliRank;", function(err, rows) {
        if (err)
            throw err;
        if (rows)
            res.send(JSON.stringify({ code: 200, data: rows }));
    });
});

app.get("/steam", function(req, res) {
    console.log("steam");

    connection.query("select * from steamDiscount;", function(err, rows) {
        if (err)
            throw err;
        console.log(rows);
        if (rows)
            res.send(JSON.stringify({ code: 200, data: rows }));
    });
});

app.get("/getArticleList", function(req, res) {
    console.log("getArticleList");

    connection.query("select id,img_url,title,description,views,likes \
                            from articles;", function(err, rows) {
        if (err)
            throw err;

        var string = JSON.stringify(rows);
        var data = JSON.parse(string);
        if (data)
            res.send(JSON.stringify({ code: 200, data: data }));
    });
});

app.get("/getArticleDetail", function(req, res) {
    console.log("getArticleDetail");
    let id = req.query.id;
        connection.query("call viewsadd(?)",[id]); //存储过程
    connection.query("select * \
        from articles where id = ?;", [id], function(err, rows) {
        if (err)
            throw err;

        var string = JSON.stringify(rows);
        var data = JSON.parse(string);
        if (data)
            res.send(JSON.stringify({ code: 200, data: data }));
    });
});

app.listen(3000, function() {
    console.log("在3000端口监听中...");
});