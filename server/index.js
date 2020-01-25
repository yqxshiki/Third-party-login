const express = require("express")

const app = express();

const axios = require("axios")


const querystring = require("querystring")

app.use(require("cors")())

app.use(express.json())

// github参数
const config = {
    _id: "86c03bc7e8030d6046cb",
    _secret: "6141ca43a9c6466444bd3c250afcccf1829b8638"
}

app.get("/", async (req, res) => {
    res.send("ok")
})


app.get("/github/login", async (req, res) => {
    let path = 'https://github.com/login/oauth/authorize?client_id=' + config._id
    res.redirect(path)
})


app.get("/callback", async (req, res) => {
    // 认证成功，回掉带回认证状态
    let code = req.query.code;
    const params = {
        client_id: config._id,
        client_secret: config._secret,
        code: code
    }

    let data = await axios.post("https://github.com/login/oauth/access_token", params);

    const access_token = querystring.parse(data.data).access_token;
    // res.send(access_token)
    data = await axios.get('https://api.github.com/user?access_token=' + access_token)

    console.log(data.data)
    res.send(data.data)

})

app.listen(3000, () => {
    console.log(`http://localhost:3000`)
})