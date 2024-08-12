import * as readline from 'readline';

export class Menu {
    private rl: readline.Interface;
    private client: any;

    constructor(client: any) {
        this.client = client;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log("Bem vindo à biblioteca");
        console.log();
        console.log("O que deseja fazer?");
        this.showOptions();
    }

    private showOptions() {
        console.log("1 - Ver livros disponíveis");
        console.log("2 - Procurar livro por autor");
        console.log("3 - Pegar um livro");
        console.log("4 - Devolver um livro");
        console.log("5 - Adicionar um livro");
        console.log("6 - Sair");
        this.rl.question('Escolha uma opção: ', (answer) => {
            this.handleOption(answer.trim());
        });
    }

    private handleOption(option: string) {
        switch (option) {
            case '1':
                this.client.listarLivros((err: string, result: any) => {
                    if (err) {
                        console.error('Erro ao listar livros:', err);
                    } else {
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
                this.rl.question("Digite o nome do autor: ", (autor) => {
                    this.client.livrosAutor({ author: autor.trim() }, (err: any, result: any) => {
                        if (err) {
                            console.error("Erro ao procurar livros por autor:", err);
                        } else {
                            if (result && result.livrosAutorResult && Array.isArray(result.livrosAutorResult.string)) {
                                console.log(`Livros de ${autor}:`);
                                result.livrosAutorResult.string.forEach((livro: string, index: number) => {
                                    console.log(`${index + 1}. ${livro}`);
                                });
                            } else {
                                console.log("Nenhum livro encontrado para este autor.");
                            }
                        }
                        console.log();
                        this.showOptions();
                    });
                });
                break;
            case '3':
                this.rl.question("Digite o nome do livro que deseja pegar emprestado: ", (nomeLivro) => {
                    const nomeNormalizado = nomeLivro.trim();
                    this.client.pegarLivro({ nome: nomeNormalizado }, (err: any, result: any) => {
                        if (err) {
                            console.error("Erro ao pegar livro:", err);
                        } else {
                            console.log(result.pegarLivroResult);
                        }
                        console.log();
                        this.showOptions();
                    });
                });
                break;
            case '4':
                this.rl.question("Digite o nome do livro que deseja devolver: ", (nomeLivro) => {
                    const nomeNormalizado = nomeLivro.trim();
                    this.client.devolverLivro({ nome: nomeNormalizado }, (err: any, result: any) => {
                        if (err) {
                            console.error("Erro ao devolver livro:", err);
                        } else {
                            console.log(result.devolverLivroResult);
                        }
                        console.log();
                        this.showOptions();
                    });
                });
                break;
            case '5':
                this.rl.question("Digite o nome do livro: ", (livro) => {
                    this.rl.question("Digite o nome do autor: ", (autor) => {
                        const params = {
                            nome: livro.trim(),
                            autor: autor.trim()
                        };
                        this.client.addLivro(params, (err: any, result: any) => {
                            if (err) {
                                console.error("Erro ao adicionar livro:", err);
                            } else {
                                console.log("Livro adicionado com sucesso!");
                            }
                            this.showOptions();
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
