class UserController{
    static display = async(req,res)=>{
        try{
            res.send("display page")
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = UserController  