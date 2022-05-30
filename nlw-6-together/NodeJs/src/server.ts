import express, { response } from 'express';

const app = express();

app.get('/test',(req,res)=>{
    return response.send('Olá, NLW')
});

app.post('/test-post',(req,res)=>{
    
});

app.listen(3000, () => {
    console.log('server is running')
});