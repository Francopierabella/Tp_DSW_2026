import express from "express";
import { Client } from "./client/client.entity.js";
const app = express();

const PORT = 3000;
app.use(express.json());
const clients : Client[] = [
    new Client("NameC1","LastNameC1","e_mailC1","passwordC1"),
    new Client("NameC2","LastNameC2","e_mailC2","passwordC2"),
    new Client("NameC3","LastNameC3","e_mailC3","passwordC3")

]

function sanitizeClientInput(req: express.Request, res: express.Response, next: express.NextFunction) {

    req.body.sanitizedInput = {
        name: req.body.name?.trim(),
        lastName: req.body.lastName?.trim(),
        e_mail: req.body.e_mail?.trim().toLowerCase(),
        password: req.body.password
    };

    // Elimina los campos que no fueron enviados
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });

    next();
}

app.get("/clients",(req,res) => {
    res.json(clients);
})

app.get("/clients/:id",(req,res) => {
    const clientWithThisId = clients.find((client : Client) =>  client.id === req.params.id);
    if (!clientWithThisId){
        res.status(404).send({message : "Client not found"})
    }
    else{
        res.json(clientWithThisId)
    }
})

app.post("/clients",sanitizeClientInput,(req,res) => {
    const {name,lastName,e_mail,password} = req.body.sanitizedInput;
    clients.push(new Client(
        name,
        lastName,
        e_mail,
        password
    ));
    res.status(201).json({message : "Client added successfully"});
})

app.put("/clients/:id", sanitizeClientInput, (req, res) => {

    const clientToChange = clients.find(
        client => client.id === req.params.id
    );

    if (!clientToChange) {
        return res.status(404).json({
            message: "Client not found"
        });
    }

    Object.assign(clientToChange, req.body.sanitizedInput);
    // ya no hace falta escribir
    // clientToChange.name = name ... etc,
    // Object lo hace, asignando solo los campos presentes en sanitizedInput
    res.json({
        message: "Client changed successfully"
    });

});
// app.put("/clients/:id",sanitizeClientInput,(req,res) => {
//     const clientToChange = clients.find((client) => client.id === req.params.id);
//     if (!clientToChange){
//         res.status(404).send({message : "Client not found" })
//     }
//     else{
//         const {name,lastName,e_mail,password} = req.body;
//         clientToChange.name = name
//         clientToChange.lastName = lastName
//         clientToChange.e_mail = e_mail // que pasa si pongo e_mail private
//         clientToChange.password = password // que pasa si pongo password private
//         res.json("Client changed successfully")
//     }

// })

app.patch("/clients/:id",sanitizeClientInput, (req,res) => {
    const clientToChangeSomething = clients.find((client) => client.id === req.params.id)
    if (!clientToChangeSomething){
        res.status(404).send({message : "Client not Found"})
    }
    else{
        Object.assign(clientToChangeSomething,req.body.sanitizedInput)
        res.json({
            message :  "Client changed successfully",
            newClient : clientToChangeSomething
            })
            }
})

app.delete("/clients/:id",(req,res) => {
    const clientToDelete = clients.findIndex((client) => client.id === req.params.id)
    if (clientToDelete === -1){
        res.status(404).send({message : "Client not Found"})
    }
    else{
        clients.splice(clientToDelete,1)
        res.json("Client deleted Successfully")
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})
