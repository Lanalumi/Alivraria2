"""
Script para gerar diagrama de classes UML baseado no diagrama ER
"""
from graphviz import Digraph

# Criar o diagrama
dot = Digraph(comment='Diagrama de Classes UML - Alivraria', format='png')
dot.attr(rankdir='TB')
dot.attr('node', shape='record', style='filled')

# Definir as classes com seus atributos e métodos
# TipoForum
dot.node('TipoForum', '''TipoForum|
+ IdTipoForum: int [PK]
+ Tipo: string
||''', fillcolor='lightgreen')

# Autor
dot.node('Autor', '''Autor|
+ IdAutor: int [PK]
+ Nome: string
+ Sobre: string
+ Genero: string
||''', fillcolor='lightblue')

# ForumExclusivo
dot.node('ForumExclusivo', '''ForumExclusivo|
+ IdForumExclusivo: int [PK]
+ Titulo: string
+ Descricao: string
+ Genero: string
+ DataCriacao: datetime
+ IdAssinatura: int [FK]
+ IdAutor: int [FK]
+ IdTipoForum: int [FK]
||''', fillcolor='plum')

# Forum
dot.node('Forum', '''Forum|
+ IdForum: int [PK]
+ Nome: string
+ Descricao: string
+ Genero: string
+ Obra: string
+ IdTipoForum: int [FK]
||''', fillcolor='lightyellow')

# Assinatura
dot.node('Assinatura', '''Assinatura|
+ IdAssinatura: int [PK]
+ Nome: string
+ Descricao: string
||''', fillcolor='lightblue')

# Cupom
dot.node('Cupom', '''Cupom|
+ IdCupom: int [PK]
+ Desconto: decimal
+ DataCriacao: datetime
+ DataValidade: datetime
+ IdAssinatura: int [FK]
||''', fillcolor='plum')

# Evento
dot.node('Evento', '''Evento|
+ IdEvento: int [PK]
+ Nome: string
+ Descricao: string
+ DataEvento: date
||''', fillcolor='lightyellow')

# UsuariosAssinantes
dot.node('UsuariosAssinantes', '''UsuariosAssinantes|
+ IdAssinatura: int [FK]
+ IdUsuario: int [FK]
+ TotalAssinantes: int
||''', fillcolor='lightgreen')

# ConviteEvento
dot.node('ConviteEvento', '''ConviteEvento|
+ DataEnvio: date
+ DataEvento: date
+ Informacoes: string
+ IdEvento: int [FK]
+ IdAssinatura: int [FK]
||''', fillcolor='pink')

# Usuario
dot.node('Usuario', '''Usuario|
+ IdUsuario: int [PK]
+ Nome: string
+ Sobre: string
+ DataCadastro: datetime
+ TempoCadastro: string
+ IdEvento: int [FK]
||''', fillcolor='pink')

# ForumParticipantes
dot.node('ForumParticipantes', '''ForumParticipantes|
+ IdTipoForum: int [FK]
+ IdUsuario: int [FK]
+ IdForum: int [FK]
+ DataEntrada: datetime
+ UltimaInteracao: datetime
||''', fillcolor='pink')

# ForumExclusivoParticipantes
dot.node('ForumExclusivoParticipantes', '''ForumExclusivoParticipantes|
+ IdTipoForum: int [FK]
+ IdAssinatura: int [FK]
+ IdForumExclusivo: int [FK]
+ DataEntrada: datetime
+ UltimaInteracao: datetime
||''', fillcolor='pink')

# Favoritos
dot.node('Favoritos', '''Favoritos|
+ IdFavoritos: int [PK]
+ IdUsuario: int [FK]
||''', fillcolor='lightyellow')

# Inscricao
dot.node('Inscricao', '''Inscricao|
+ DataInscricao: date
+ ValorPago: decimal
+ IdEvento: int [FK]
+ IdUsuario: int [FK]
||''', fillcolor='lightgreen')

# Livro
dot.node('Livro', '''Livro|
+ IdLivro: int [PK]
+ Nome: string
+ Sinopse: string
+ DataLancamento: date
+ Genero: string
+ IdAutor: int [FK]
+ IdFavoritos: int [FK]
||''', fillcolor='plum')

# Definir os relacionamentos baseados no diagrama ER
# TipoForum -> Autor (1 para muitos)
dot.edge('TipoForum', 'Autor', label='classifica\n1..*', arrowhead='vee')

# TipoForum -> ForumExclusivo (1 para muitos)
dot.edge('TipoForum', 'ForumExclusivo', label='classifica\n1..*', arrowhead='vee')

# TipoForum -> Forum (1 para muitos)
dot.edge('TipoForum', 'Forum', label='tipo\n1..*', arrowhead='vee')

# TipoForum -> ForumParticipantes (1 para muitos)
dot.edge('TipoForum', 'ForumParticipantes', label='classifica\n1..*', arrowhead='vee')

# TipoForum -> ForumExclusivoParticipantes (1 para muitos)
dot.edge('TipoForum', 'ForumExclusivoParticipantes', label='classifica\n1..*', arrowhead='vee')

# Autor -> ForumExclusivo (1 para muitos)
dot.edge('Autor', 'ForumExclusivo', label='cria\n1..*', arrowhead='vee')

# Autor -> Livro (1 para muitos)
dot.edge('Autor', 'Livro', label='escreve\n1..*', arrowhead='vee')

# Assinatura -> ForumExclusivo (1 para muitos)
dot.edge('Assinatura', 'ForumExclusivo', label='habilita\n1..*', arrowhead='vee')

# Assinatura -> UsuariosAssinantes (1 para muitos)
dot.edge('Assinatura', 'UsuariosAssinantes', label='relaciona\n1..*', arrowhead='vee')

# Assinatura -> Cupom (1 para muitos)
dot.edge('Assinatura', 'Cupom', label='permite\n1..*', arrowhead='vee')

# Assinatura -> ConviteEvento (1 para muitos)
dot.edge('Assinatura', 'ConviteEvento', label='oferece\n1..*', arrowhead='vee')

# Assinatura -> ForumExclusivoParticipantes (1 para muitos)
dot.edge('Assinatura', 'ForumExclusivoParticipantes', label='tem\n1..*', arrowhead='vee')

# Evento -> ConviteEvento (1 para muitos)
dot.edge('Evento', 'ConviteEvento', label='possui\n1..*', arrowhead='vee')

# Evento -> Inscricao (1 para muitos)
dot.edge('Evento', 'Inscricao', label='recebe\n1..*', arrowhead='vee')

# Usuario -> UsuariosAssinantes (1 para muitos)
dot.edge('Usuario', 'UsuariosAssinantes', label='assina\n1..*', arrowhead='vee')

# Usuario -> ForumParticipantes (1 para muitos)
dot.edge('Usuario', 'ForumParticipantes', label='participa\n1..*', arrowhead='vee')

# Usuario -> Favoritos (1 para muitos)
dot.edge('Usuario', 'Favoritos', label='possui\n1..*', arrowhead='vee')

# Usuario -> Inscricao (1 para muitos)
dot.edge('Usuario', 'Inscricao', label='realiza\n1..*', arrowhead='vee')

# Forum -> ForumParticipantes (1 para muitos)
dot.edge('Forum', 'ForumParticipantes', label='possui\n1..*', arrowhead='vee')

# ForumExclusivo -> ForumExclusivoParticipantes (1 para muitos)
dot.edge('ForumExclusivo', 'ForumExclusivoParticipantes', label='tem\n1..*', arrowhead='vee')

# Favoritos -> Livro (1 para muitos)
dot.edge('Favoritos', 'Livro', label='contem\n1..*', arrowhead='vee')

# Renderizar o diagrama
import os
output_path = os.path.join(os.path.dirname(__file__), 'diagrama_classes_uml')
dot.render(output_path, cleanup=True)
print(f"Diagrama UML gerado com sucesso: {output_path}.png")
