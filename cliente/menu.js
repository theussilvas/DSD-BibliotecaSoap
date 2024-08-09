"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const readline = __importStar(require("readline"));
class Menu {
    constructor(client) {
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
    showOptions() {
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
    handleOption(option) {
        switch (option) {
            case '1':
                this.client.listarLivros((err, result) => {
                    if (err) {
                        console.error('Erro ao listar livros:', err);
                    }
                    else {
                        if (result && result.listarLivrosResult && Array.isArray(result.listarLivrosResult.string)) {
                            console.log("Lista de Livros Disponíveis:");
                            result.listarLivrosResult.string.forEach((livro, index) => {
                                console.log(`${index + 1}. ${livro}`);
                            });
                        }
                        else {
                            console.log("Nenhum livro disponível.");
                        }
                    }
                    console.log();
                    this.showOptions();
                });
                break;
            case '2':
                this.rl.question("Digite o nome do autor: ", (autor) => {
                    this.client.livrosAutor({ author: autor.trim() }, (err, result) => {
                        if (err) {
                            console.error("Erro ao procurar livros por autor:", err);
                        }
                        else {
                            if (result && result.livrosAutorResult && Array.isArray(result.livrosAutorResult.string)) {
                                console.log(`Livros disponíveis de ${autor}:`);
                                result.livrosAutorResult.string.forEach((livro, index) => {
                                    console.log(`${index + 1}. ${livro}`);
                                });
                            }
                            else {
                                console.log("Nenhum livro disponível para este autor.");
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
                    this.client.pegarLivro({ nome: nomeNormalizado }, (err, result) => {
                        if (err) {
                            console.error("Erro ao pegar livro:", err);
                        }
                        else {
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
                    this.client.devolverLivro({ nome: nomeNormalizado }, (err, result) => {
                        if (err) {
                            console.error("Erro ao devolver livro:", err);
                        }
                        else {
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
                        this.client.addLivro(params, (err, result) => {
                            if (err) {
                                console.error("Erro ao adicionar", err);
                            }
                            console.log(result);
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
exports.Menu = Menu;
