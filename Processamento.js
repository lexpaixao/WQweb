  const resposta="Alex";
 
  function cadastro(){
    // Seleciona o formulário pelo ID
const formCadastro = document.getElementById("formulario");

formCadastro.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evita que a página recarregue

  // Pega os valores dos campos
  const nome_usuario = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmasenha= document.getElementById("confirmacaosenha").value;

  // Validação básica
  if(!nome_usuario || !email || !senha || !confirmasenha) {
    resposta=("Por favor, preencha todos os campos.")
    document.getElementById("resultado").textContent = resposta ;
    return;
  }

  if(senha!==confirmasenha){
    resposta="As senha não coincidem";
    document.getElementById("resultado").textContent = resposta ;
    return;
  }

  try {
    // Envia os dados para a sua API
    const response = await fetch("https://waterquality-xlq4.onrender.com/api/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome_usuario, email, senha })
    });

    const data = await response.json();

    if (response.ok) {
      resposta=(data.mensagem);
      document.getElementById("resultado").textContent = resposta ; // Usuário cadastrado com sucesso
      formCadastro.reset(); // Limpa o formulário
    } else {
      resposta=(data.erro || "Erro ao cadastrar usuário.")
      document.getElementById("resultado").textContent = resposta;
    }

  } catch (error) {
    document.getElementById("resultado").textContent = ("Erro ao conectar com a API:", error);
    document.getElementById("resultado").textContent =("Erro de conexão. Tente novamente mais tarde.");
  }
});

  }