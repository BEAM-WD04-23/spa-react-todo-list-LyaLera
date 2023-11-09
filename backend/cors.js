const corsHeaders = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", 'Origin, x-Requested-With, Content-Type, Accept, Authorization')
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE")
    next()
  }
  
  module.exports = corsHeaders