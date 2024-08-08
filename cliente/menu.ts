import * as readline from 'readline';

export class Menu {
    private rl: readline.Interface;
    private client: any;

    constructor(client:any) {
        this.client = client;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Bem vindo a biblioteca");
        console.log();
        console.log("O que deseja fazer?");
        this.showOptions();
    }

    private showOptions() {
        console.log("1- Ver livros disponíveis");
        console.log("2 - Procurar livro por autor");
        console.log("3 - Pegar um livro");
        console.log("4 - Devolver um livro");
        console.log("5 - Adicionar um livro");
        this.rl.question('Escolha uma opção: ', (answer) => {
            this.handleOption(answer);
        });
    }

    private handleOption(option: string) {
        switch (option) {
            case '1':
                this.client.listarLivros((err: string, result: any) => {
                    if (err) {
                        console.error('Erro ao listar livros:', err);
                    } else {
                        // Verifica se a lista de livros existe e é um array
                        if (result && result.listarLivrosResult && Array.isArray(result.listarLivrosResult.string)) {
                            console.log("Lista de Livros:");
                            result.listarLivrosResult.string.forEach((livro: string, index: number) => {
                                console.log(`${index + 1}. ${livro}`);
                            });
                        } else {
                            console.log("Nenhum livro encontrado.");
                        }
                    }
                    console.log();
                    this.showOptions();
                });
                break;
            case '2':
                console.log("Você escolheu procurar livro por autor.");
                break;
            case '3':
                console.log("Você escolheu pegar um livro.");
                break;
            case '4':
                console.log("Você escolheu devolver um livro.");
                break;

            case '5':
                console.log();
                this.rl.question("Digite o nome do livro:",(livro)=>{
                    this.rl.question("Digite o nome do autor:", (autor)=>{
                        const params = {
                            nome:livro,
                            autor:autor
                        };

                        this.client.addLivro(params,(err:any,result:any)=>{
                            if(err){
                                console.error("Erro ao adicionar",err);
                            }
                            console.log(result);
                            this.showOptions()
                        });
                    });
                });
                break;
            case '6':
                console.log("Saindo...");
                this.rl.close();
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
                this.showOptions();
                break;
        }
        
    }
}

