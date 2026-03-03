module.exports = {
    apps: [
        {
            name: "hambali-furniture-frontend",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3002
            }
        }
    ]
}