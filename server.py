from spyne import Application, rpc, ServiceBase, Integer, Unicode, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

class BibliotecaService(ServiceBase):
    livros = [
        {"nome":"O Senhor dos Anéis", "autor":"J.R.R. Tolkien"},
        {"nome":"O Pequeno Príncipe", "autor":"Antoine de Saint-Exupéry"},
        {"nome":"Dom Quixote", "autor":"Miguel de Cervantes"},
        {"nome":"Cem Anos de Solidão", "autor":"Gabriel García Márquez"},
        {"nome":"A Montanha Mágica", "autor":"Thomas Mann"},
        {"nome":"O Apanhador no Campo de Centeio", "autor":"J.D. Salinger"},
        {"nome":"Ulisses", "autor":"James Joyce"},
        {"nome":"A Divina Comédia", "autor":"Dante Alighieri"},
        {"nome":"Os Lusíadas", "autor":"Luís de Camões"}
    ]
    
    @rpc(Unicode, Unicode, _returns=Unicode)
    def addLivro(ctx, nome, autor):
        BibliotecaService.livros.append({"nome":nome, "autor":autor})
        return "Livro adicionado"
        
    @rpc (_returns = Iterable(Unicode))
    def listarLivros(ctx):
        results = [f"{livro['nome']} - {livro['autor']}" for livro in BibliotecaService.livros]
        return results

    @rpc (Unicode, _returns = Iterable(Unicode))
    def livrosAutor(ctx,author):
        result = [f"{livro['nome']} - {livro['autor']}" for livro in BibliotecaService.livros if livro['autor'] == author]
        return result

application = Application([BibliotecaService], 'spyne.library.soap', in_protocol =Soap11(validator='lxml'),
out_protocol =Soap11())

wsgi_app = WsgiApplication(application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    server = make_server('127.0.0.1',8000, wsgi_app)
    print("Rodando na porta 8000")
    server.serve_forever()