import * as soap from 'soap';

const url = 'http://127.0.0.1:8000/?wsdl';



soap.createClient(url,(err,client)=>{
    if(err){
        console.error('Erro ao criar cliente soap',err);
        return;
    }

    client.listarLivros((err:string,result:string)=>{
        if(err){
            console.error('Erro ao executar')
        }

        console.log('Todos os livros', result)
    })

    // client.addLivro('The Great Gatsby','F. Scott Fitzgerald', (err: any, result: any)=>{
    //     if(err){
    //         console.error('Erro ao adicionar livro',err);
    //         return;
    //     }
    //     console.log('Livro adicionado', result);
    // })
})