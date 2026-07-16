import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API
};

export async function listarAlunos(req, res, next) {  // adicione next aos parâmetros
  try {
    const alunos = await prisma.aluno.findMany({
      select: selectSemSenha,
    });
    res.json(alunos);
  } catch (erro) {
    next(erro);  // passa o erro para o middleware global
  }
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res, next) {
  try {
    const { id } = req.params; // extrai o id da URL
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) }, // converte string -> number
      select: selectSemSenha,     // omite senha/hash
    });

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }

    res.json(aluno); // retorna o aluno encontrado
  } catch (erro) {
    next(erro); // envia o erro para o middleware
  }
}
// --- Stubs para o desafio do aluno ---

// 🎯 POST /alunos — cria um novo aluno
// Dica: use prisma.aluno.create({ data: { ... }, select: selectSemSenha })
// Dica: os dados do aluno vêm de req.body (nome, email, senhaHash, cidade, frase, planosFuturos)
// Dica: retorne status 201 com o aluno criado
export async function criarAluno(req, res, next) {
  try {
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;
    const novoAluno = await prisma.aluno.create({
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos,
      },
    });

    res.status(201).json(novoAluno);
  } catch (erro) {
    next(erro);
  }
}

// 🎯 PUT /alunos/:id — atualiza um aluno existente
// Dica: use prisma.aluno.update({ where: { id: Number(id) }, data: { ... }, select: selectSemSenha })
// Dica: o id vem de req.params, os dados atualizados de req.body
// Dica: se o aluno não existir, o Prisma lança um erro — use try/catch
export async function atualizarAluno (req, res) {
  const {id} = req.params; // extrai oid da URL
  const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;
   try{
     const aluno = await prisma.aluno.update({
        where: { id: Number(id)},
        data: {
        nome: nome,
        email: email,
        senhaHash: senhaHash,
        cidade: cidade,
        frase: frase,
        planosFuturos: planosFuturos,
    },

   select: selectSemSenha // omite senhaHash
  })
   res.json(aluno); // retorna o aluno atualizado
  }

    catch(error) {
    return res.status(404).json({ erro: 'Aluno não encontrado`'});
    }

}
// 🎯 DELETE /alunos/:id — deleta um aluno
// Dica: use prisma.aluno.delete({ where: { id: Number(id) } })
// Dica: retorne status 204 (sem conteúdo) com res.status(204).end()
// Dica: se o aluno não existir, o Prisma lança um erro — use try/catch
// Dica: se o aluno não existir, o Prisma lança um erro use try/catch
export async function deletarAluno (req, res) {
    const {id} = req.params; // extrai o :id da URL
    try{
        await prisma.aluno.delete({
            where: { id: Number(id)} // converte string + number
        })
        res.status(204).end() 
    }
    catch(error){
        return res.status(404).json({erro: 'Aluno não encontrado'});
    }
   
  }
