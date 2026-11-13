# TRAMA — Publicacao no GitHub (Web Development)

Este roteiro trata das etapas que dependem da **conta GitHub do aluno**.
Nao existe URL de repositorio ou organizacao criada automaticamente neste ZIP.

## 1. Criar uma organizacao

1. Entre no GitHub com sua propria conta.
2. Acesse https://github.com/settings/organizations e use a opcao de criar nova organizacao.
3. Escolha um nome disponivel, o plano oferecido pelo GitHub e finalize a criacao.
4. Dentro da organizacao, crie um **novo repositorio vazio** (sem adicionar README, LICENSE ou .gitignore automaticamente, pois ja existem arquivos locais).
5. Guarde a URL HTTPS verdadeira do repositorio criado.

## 2. Publicar os commits que ja existem no ZIP

Extraia o ZIP e abra o terminal **dentro da pasta** `TRAMA_LANDING_CITIZENTECH`.
A pasta `.git` esta inclusa e ja guarda as branches e merges locais.
Nao execute `git init` novamente e nao apague `.git`.

Confira o historico:

```bash
git branch -a
git log --oneline --graph --all
git rev-list --count main
```

Depois de criar o repositorio no GitHub, use a **URL real da sua organizacao e repositorio**:

```bash
git remote add origin https://github.com/ORGANIZACAO_REAL/REPOSITORIO_REAL.git
git push -u origin main
git push origin feature/galeria feature/formulario
```

Substitua `ORGANIZACAO_REAL/REPOSITORIO_REAL` pelos dados efetivos.
O GitHub podera pedir autenticacao pelo navegador, token ou Git Credential Manager.
Nunca compartilhe senha ou token dentro do projeto.

Se ja existir `origin`, confira com `git remote -v` antes de editar a URL.

## 3. Atualizar os arquivos de identificacao

No `equipe.txt`, `integrantes.txt` e na ficha do `README.md`, substitua
os campos marcados PENDENTE pela URL HTTPS verdadeira do repositorio.
Registre as alteracoes e publique:

```bash
git add README.md equipe.txt integrantes.txt
git commit -m "Registra URL do repositorio da equipe"
git push
```

## 4. Conferir os requisitos antes de enviar ao Teams

- Organizacao criada no GitHub com acesso ao repositorio.
- Repositorio contem `main`, `feature/galeria` e `feature/formulario`.
- Historico visivel na aba Commits com mais de 15 commits; merges presentes.
- Pagina abre com dois cliques em `index.html` e scripts funcionam offline.
- `equipe.txt` inclui Pedro Nilton Jardim Juvenal, RM 574225 e link verdadeiro.
- ZIP da pasta do projeto inclui todos os arquivos, inclusive `.git` (se necessario para manter o historico local; o GitHub tera copia independente do historico remoto).
- Entrega separada no Microsoft Teams da disciplina Web Development.

**Nao basta colocar o projeto no GitHub como um unico upload de arquivos:** use o `git push` deste repositorio para preservar o historico de commits e merges.
