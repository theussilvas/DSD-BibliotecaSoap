from spyne import Application, rpc, ServiceBase, Integer, Unicode, Iterable
from spyne.protocol.soap import Soap11
from spyne.server.wsgi import WsgiApplication

class BibliotecaService(ServiceBase):
    livros = [
        {"nome": "O Senhor dos Anéis", "autor": "J.R.R. Tolkien", "disponivel": True},
        {"nome": "O Pequeno Príncipe", "autor": "Antoine de Saint-Exupéry", "disponivel": True},
        {"nome": "Dom Quixote", "autor": "Miguel de Cervantes", "disponivel": True},
        {"nome": "Cem Anos de Solidão", "autor": "Gabriel García Márquez", "disponivel": True},
        {"nome": "A Montanha Mágica", "autor": "Thomas Mann", "disponivel": True},
        {"nome": "O Apanhador no Campo de Centeio", "autor": "J.D. Salinger", "disponivel": True},
        {"nome": "Ulisses", "autor": "James Joyce", "disponivel": True},
        {"nome": "A Divina Comédia", "autor": "Dante Alighieri", "disponivel": True},
        {"nome": "Os Lusíadas", "autor": "Luís de Camões", "disponivel": True}
    ]
    
    @rpc(Unicode, Unicode, _returns=Unicode)
    def addLivro(ctx, nome, autor):
        BibliotecaService.livros.append({"nome": nome, "autor": autor, "disponivel": True})
        return "Livro adicionado"
        
    @rpc(_returns=Iterable(Unicode))
    def listarLivros(ctx):
        # Retorna todos os livros, indicando se estão disponíveis ou emprestados
        results = [
            f"{livro['nome']} - {livro['autor']} ({'Disponível' if livro['disponivel'] else 'Emprestado'})" 
            for livro in BibliotecaService.livros
        ]
        return results

    @rpc(Unicode, _returns=Iterable(Unicode))
    def livrosAutor(ctx, author):
        # Retorna todos os livros de um autor específico, indicando se estão disponíveis ou emprestados
        result = [
            f"{livro['nome']} - {livro['autor']} ({'Disponível' if livro['disponivel'] else 'Emprestado'})"
            for livro in BibliotecaService.livros if livro['autor'] == author
        ]
        return result
    
    @rpc(Unicode, _returns=Unicode)
    def pegarLivro(ctx, nome):
        nome = nome.strip().lower()  # Normaliza a entrada
        for livro in BibliotecaService.livros:
            if livro['nome'].lower() == nome:
                if livro['disponivel']:
                    livro['disponivel'] = False
                    return f"Você pegou o livro '{livro['nome']}'."
                else:
                    return f"O livro '{livro['nome']}' já está emprestado."
        return f"O livro '{nome}' não foi encontrado."
    
    @rpc(Unicode, _returns=Unicode)
    def devolverLivro(ctx, nome):
        nome = nome.strip().lower()  # Normaliza a entrada
        for livro in BibliotecaService.livros:
            if livro['nome'].lower() == nome:
                if not livro['disponivel']:
                    livro['disponivel'] = True
                    return f"Você devolveu o livro '{livro['nome']}'."
                else:
                    return f"O livro '{livro['nome']}' não estava emprestado."
        return f"O livro '{nome}' não foi encontrado."

application = Application([BibliotecaService], 'spyne.library.soap',
                          in_protocol=Soap11(validator='lxml'),
                          out_protocol=Soap11())

wsgi_app = WsgiApplication(application)

if __name__ == '__main__':
    from wsgiref.simple_server import make_server
    server = make_server('192.168.0.9', 8000, wsgi_app)
    print("Rodando na porta 8000")
    server.serve_forever()
