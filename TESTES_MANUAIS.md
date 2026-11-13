# Testes manuais da landing — TRAMA Web Development

Abra `index.html` em um navegador moderno, sem iniciar servidores. Para testar o comportamento offline, desconecte a internet apos carregar a pagina (as fontes locais de sistema substituem Google Fonts).

1. **Original preservado:** acesse Visao geral, Problema, Tecnologia, Objetivos, Publico-alvo e Beneficios; teste as abas Artistas, Instituicoes e Apoiadores.
2. **Galeria:** clique seta direita e esquerda; confirme que a imagem, seu titulo e o contador mudam entre os 3 estados. Clique em cada um dos 3 pontos. Com o componente focado, use as teclas de seta. Clique Pausar e Retomar.
3. **Formulario vazio:** clique em Validar mensagem; o navegador deve impedir envio, marcar campos e apresentar mensagens de erro.
4. **Campos invalidos:** preencha nome com `A`, e-mail com `abc`, selecione perfil vazio, digite mensagem curta. Confirme que cada erro aparece.
5. **Campos validos:** nome `Exemplo Teste`, e-mail `teste@exemplo.com`, qualquer perfil e uma mensagem com mais de 10 caracteres. Confirme a mensagem de sucesso e a pre-visualizacao na mesma pagina. Nenhuma requisicao de envio e feita.
6. **Limpar:** clique em Limpar campos; confirme que desaparecem erros, aviso, previa e contador volta a `0 / 500`.
7. **DOM seguro:** digite `<script>alert(1)</script>` na mensagem. O texto deve aparecer literalmente na previa, nunca executar codigo.
8. **Responsividade:** use F12 > dispositivo movel e teste em 390px e 768px. Menu lateral funciona pelo botao sanduiche.
9. **Git local:** abra terminal dentro da pasta e use `git rev-list --count main` (mais de 15), `git branch -a` e `git log --graph --oneline --all`.
10. **GitHub:** apos publicar, confirme pelo navegador que as branches e os commits aparecem no repositorio da organizacao.
