import * as soap from 'soap';
import { Menu } from './menu';

const url = 'http://192.168.0.9:8000/?wsdl';



soap.createClient(url,(err,client)=>{
    if(err){
        console.error('Erro ao criar cliente soap',err);
        return;
    }
    const menuInstance = new Menu(client);   
})