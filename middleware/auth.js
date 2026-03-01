const jwt = required('jsonwebtoken')


const auth = (req, res, next) => {
    try {
        const token = req.cookies.token
        // console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' })
        }
        //verify token
        const decoded = jwt.verify(token, process.env.jwt_secret)
        // console.log(decoded);
        req.userId = decoded.userId  
         next()
       
    } catch (error) {
        console.log(error)  
    }

}

module.exports = auth