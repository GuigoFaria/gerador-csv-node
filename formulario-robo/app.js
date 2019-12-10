const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs');
const csv = require('json2csv').parse


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.render('index');
});
app.post('/criarDoc', async (req, res, next) => {
    try {
        const object = {
            1: Boolean(req.body.aviso),
            2: Boolean(req.body.trct),
            3: Boolean(req.body.ponto),
            4: Boolean(req.body.atestado_afastamento),
            5: Boolean(req.body.demonstrativo_medias),
            6: Boolean(req.body.carta_apresentacao),
            7: Boolean(req.body.ficha_atualizacao),
            8: Boolean(req.body.holerites),
            9: Boolean(req.body.seguro_desemprego),
            10: Boolean(req.body.extrato_fgts),
            11: Boolean(req.body.extrato_analitico_fgts),
            12: Boolean(req.body.chave_fgts),
            13: Boolean(req.body.extrato_fins_rescisorios),
            14: Boolean(req.body.comprovante_pagamento),
            "data": req.body.data

        };

        const fields = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "data", ]
        const opts = {
            fields
        }

        const csvParse = csv(object,opts)


        await fs.writeFile("C:\\Users\\guilherme.faria\\Desktop\\Teste\\minharequisicao.csv", csvParse, (erro) => {
            if (erro) {
                res.render("deu-errado")
            }
            res.render("deu-certo")
        })
    } catch (err) {
        console.log(err)
    }


})

app.listen(port, err => {
    console.log(`Server is listening on ${port}`);
});