// 🎯 Desafio: modifique o logger para exibir o status code e o tempo de resposta
// Dica: use Date.now() para marcar o início e calcular a duração
// Dica: use res.on('finish', () => { ... }) para capturar o momento em que a resposta é enviada
// Dica: dentro do callback do finish, res.statusCode contém o código (200, 404, etc.)
export default function logger(req, res, next) {
 const inicio = Date.now()
 res.on('finish' , () => {
    const duracao = Date.now() - inicio;
    const agora =new Date().toISOString();
    console.log(`[${agora}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracao}ms)`);
  })
next();
} // implemente aqui