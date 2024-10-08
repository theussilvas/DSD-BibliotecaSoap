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
const soap = __importStar(require("soap"));
const url = 'http://127.0.0.1:8000/?wsdl';
soap.createClient(url, (err, client) => {
    if (err) {
        console.error('Erro ao criar cliente soap', err);
        return;
    }
    client.listarLivros((err, result) => {
        if (err) {
            console.error('Erro ao executar');
        }
        console.log('Todos os livros', result);
    });
    // client.addLivro('The Great Gatsby','F. Scott Fitzgerald', (err: any, result: any)=>{
    //     if(err){
    //         console.error('Erro ao adicionar livro',err);
    //         return;
    //     }
    //     console.log('Livro adicionado', result);
    // })
});
