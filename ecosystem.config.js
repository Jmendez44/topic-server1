module.exports = {
  apps : [
      {
        name: "topicks-api",
        script: "./src/index.js",
        watch: true,
        env: {
            "DB_CONNECTION": "mongodb+srv://JAY:1234@testcluster1-kpwsg.mongodb.net/test?retryWrites=true&w=majority"
        }
      }
  ]
}