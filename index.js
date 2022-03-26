const express=require("express")

const mongoose=require("mongoose")

const app= express()

app.use(express.json())//middleware



// mongo connect
const connect=()=>{
    return mongoose.connect(`mongodb+srv://riyazMongo:Riyaz123@cluster0.nfiqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
}




// userSchema
const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String,required:true}
})
// user model
const Users=mongoose.model("user1",userSchema)




// section schema
const sectionSchema= new mongoose.Schema({
    section_name:{type:String,required:true}
    
})
// section model
const Sections=mongoose.model("section",sectionSchema)




// books schema
const booksSchema=new mongoose.Schema({
    name:{type:String,required:true},
    body:{type:String,required:true},
    sectionID:{type:mongoose.Schema.Types.ObjectId}
})
// books model
const Books=mongoose.model("book",booksSchema)




// author schema
const authorSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId}
})
// author model
const Authors=mongoose.model("author",authorSchema)



// book-author schema
const book_authorSchema=new mongoose.Schema({
    bookID:{type:mongoose.Schema.Types
    .ObjectId},
    authorID:{type:mongoose.Schema.Types
        .ObjectId}
})
// book-author model
const Book_authors=mongoose.model("book_author",book_authorSchema)



// checked_out schema
const checked_outSchema=new mongoose.Schema({
    userID:{type:mongoose.Schema.Types
        .ObjectId},
    bookID:{type:mongoose.Schema.Types
        .ObjectId},
    checkedoutTime:{type:Date,default:null},
    checkedinTime:{type:Date,default:null}

})

const Checked_out=mongoose.model("checked_out",checked_outSchema)

app.post("/users",async(req,res)=>{
    try{
          const users=await Users.create(req.body)
          return res.status(200).send(users)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/users",async(req,res)=>{
    try{
          const users=await Users.find({}).lean().exec()
          return res.status(200).send(users)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})





app.post("/sections",async(req,res)=>{
    try{
          const sections=await Sections.create(req.body)
          return res.status(200).send(sections)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/sections",async(req,res)=>{
    try{
          const sections=await Sections.find({}).lean().exec()
          return res.status(200).send(sections)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})



app.post("/books",async(req,res)=>{
    try{
          const books=await Books.create(req.body)
          return res.status(200).send(books)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/books",async(req,res)=>{
    try{
          const books=await Books.find({}).lean().exec()
          return res.status(200).send(books)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})




app.post("/authors",async(req,res)=>{
    try{
          const authors=await Authors.create(req.body)
          return res.status(200).send(authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/authors",async(req,res)=>{
    try{
          const authors=await Authors.find({}).lean().exec()
          return res.status(200).send(authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/books/:authorID",async(req,res)=>{
    try{
     const books = await Book_authors.findById(req.params.authorID).populate("bookID")
     return res.status(200).send(books)
    }
    catch
    {
        return res.status(500).send(err.message)
    }
})





app.post("/book_authors",async(req,res)=>{
    try{
          const book_authors=await Book_authors.create(req.body)
          return res.status(200).send(book_authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/book_authors",async(req,res)=>{
    try{
          const book_authors=await Book_authors.find({}).lean().exec()
          return res.status(200).send(book_authors)
    }
    catch(err)
    {
        return res.status(500).send(err.message)
    }
})

app.get("/books/:sectionID",async(req,res)=>{
    try{
     const books=await Books.findById(req.params.sectionID)
     return res.status(200).send(books)
    }
    catch{
        return res.status(500).send(err.message)
    }
})







app.listen(3400,async()=>{
    try{
         await  connect()
         console.log("post 3400 is working fine")
    }
    catch(err)
    {
      console.log(err.message)
    }
})