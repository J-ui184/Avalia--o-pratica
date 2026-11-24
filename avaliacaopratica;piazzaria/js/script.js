const precos = {
  calabresa: 45,
  mussarela: 40,
  frango: 50
};

const form = document.getElementById("form-pedido");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  try {
    const nome = document.getElementById("nome").value.trim();
    const sabor = document.getElementById("sabor").value;
    const qtdTexto = document.getElementById("quantidade").value;
    const quantidade = Number(qtdTexto);

    if (nome === "" || nome.length < 3) {
      throw new Error("Digite um nome com pelo menos 3 letras.");
    }

    if (sabor === "") {
      throw new Error("Escolha um sabor de pizza.");
    }

    if (qtdTexto === "" || isNaN(quantidade) || !Number.isInteger(quantidade)) {
      throw new Error("Digite uma quantidade válida (número inteiro).");
    }

    if (quantidade < 1 || quantidade > 50) {
      throw new Error("A quantidade deve ser entre 1 e 50.");
    }

    const precoUnitario = precos[sabor];
    const subtotal = precoUnitario * quantidade;

    let desconto = 0;
    if (quantidade >= 5) {
      desconto = subtotal * 0.10;
    }

    const total = subtotal - desconto;

    resultado.className = "resultado sucesso";
    resultado.innerHTML =
      "<h3>Pedido de " + nome + "</h3>" +
      "<p>Subtotal: R$ " + subtotal.toFixed(2) + "</p>" +
      "<p>Desconto: R$ " + desconto.toFixed(2) + "</p>" +
      "<p><strong>Total a pagar: R$ " + total.toFixed(2) + "</strong></p>";

  } catch (erro) {
    resultado.className = "resultado erro";
    resultado.innerHTML = "<p><strong>Erro:</strong> " + erro.message + "</p>";
  }
});
