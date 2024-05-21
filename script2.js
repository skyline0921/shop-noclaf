let ipt01 = document.getElementById("ipt1")
let ipt02 = document.getElementById("ipt2")
let ipt03 = document.getElementById("ipt3")
let ipt04 = document.getElementById("ipt4")

let container = document.getElementById("container")
let form = document.getElementById("form")

let identify = document.getElementsByClassName("identify") 

let isValid = false

function advance() {
  console.log(ipt01.value,ipt02.value,ipt03.value)

    if(ipt01.value == "" || ipt02.value == "" || ipt03.value == "" || ipt04.value == "") {
      alert("Houve um erro por favor verifique os campos.")
      return
    }
    else{
      isValid = true
      container.removeChild(form)
      container.innerHTML += createCode(); 
      return;
    }
}

function createCode() {
  return `
  <section class= "secTwo">
    <div class="payment">
      <header class= "pt2">
          <div class="pass2">2</div>
          <h3>Pagamento</h3>
          <img class="logo" src="./assents/logo-dark_noclaf.png" alt="">
      </header>

      <section>
        <div class="firstForm" onclick="pix()">
            <h3>Pix</h3>
            <img class="formPay" src="./assents/pix.svg" alt="">
        </div>

        <div class="secondForm" onclick="money()">
            <h3>Dinheiro</h3>
            <img class="formPay" src="./assents/money.svg" alt="">
        </div>

        <div class="thirdForm" onclick="credit()" >
            <h3>Crédito</h3>
            <img class="formPay" src="./assents/cartão.svg" alt="">
        </div>
      </section>
    </div>
  </section>`
}

function back() {
    let allDivs = document.querySelectorAll('.all');
    console.log(allDivs);
    let lastDiv = allDivs[allDivs.length - 1];
    console.log(lastDiv);

    if (lastDiv) {
      container.removeChild(lastDiv);
    }
}

function pix() {
  container.innerHTML += `
<div class="all">
    <div class="pix">
      <div class="leave" onclick="back()">
        <span>Voltar</span>
        <img class="x" src="./assents/X.svg" alt="">
      </div>
      <h2>Faça o Pix aqui.</h2>
        <img class="codeQr" src="./assents/qrcoDeDestaque.jpg" alt="">
      </div>
    </div>
</div>`
}

function money() {
  alert("Pagar na loja. Enviaremos a notificação quando o produto estiver no estabelecimento.")
}

function credit() {
  container.innerHTML += `
  <div class="all">
    <div class="fieldsAll">
      <div class="clean"  onclick="back()">
        <span>Voltar</span>
        <img class="x" src="./assents/X.svg" alt="">
      </div>

      <span>Número do cartão</span>
      <input type="text" name="cartNumber" id="cartNumber" placeholder="1234 1234 1234 1234" maxlength="19">

      <span>Validade (mês/ano)</span>
      <input type="text" name="validate" id="validate" placeholder="MM/AA" maxlength="5">
  
      <span>Cód. de segurança</span>
      <input type="text" name="security" id="security" placeholder="- -" maxlength="4">

      <span>Nome e sobrenome do titular</span>
      <input type="text" name="nameHolder" id="nameHolder" placeholder="ex: Maria de Almeida Cruz">

      <span>CPF do titular</span>
      <input type="text" name="input5" id="ipt5" placeholder="000.000.000-00" maxlength="14">

      <button class="finalyBuyBtn" onclick="finalyBuy()" type="button">Comprar agora <img class="padlock" src="./assents/padlock-svgrepo-com.svg"</button>
    </div>
  </div>`

  const ipt05 = document.getElementById("ipt5")

  ipt05.addEventListener('input', function(event) {
    let value = event.target.value;
  
    event.target.value = formatCPF(value);
  })

  const cartNumber = document.getElementById("cartNumber")

  cartNumber.addEventListener('input', function(event) {
    let value = event.target.value;
  
    event.target.value = formatCartNumber(value);
  })

  const validate = document.getElementById("validate")

  validate.addEventListener('input', function(event) {
    let value = event.target.value;
  
    event.target.value = formatValidate(value);
  })

}

function finalyBuy() {
  const cartNumber = document.getElementById("cartNumber").value;
  const validate = document.getElementById("validate").value;
  const security = document.getElementById("security").value;
  const nameHolder = document.getElementById("nameHolder").value;
  const cpfHolder = document.getElementById("ipt5").value;

  if (!cartNumber || !validate || !security || !nameHolder || !cpfHolder) {
    alert("Todos os campos são obrigatórios.");
    return;
  }

  const cardRegex = /^(\d{4} \d{4} \d{4} \d{4})$/;
  if (!cardRegex.test(cartNumber)) {
    alert("Número do cartão inválido.");
    return;
  }

  const validateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
  if (!validateRegex.test(validate)) {
    alert("Data de validade inválida.");
    return;
  }

  if (security.length < 3 || isNaN(security)) {
    alert("Código de segurança inválido.");
    return;
  }

  if (!validateCPF(cpfHolder)) {
    alert("CPF do titular inválido.");
    return;
  }

  alert("Muito obrigado pela compra");

  window.location.href = "/index.html";
}

function validateCPF(cpf) {
  var Soma = 0
  var Resto

  var strCPF = String(cpf).replace(/[^\d]/g, '')
  
  if (strCPF.length !== 11)
     return false
  
  if ([
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    ].indexOf(strCPF) !== -1)
    return false

  for (i=1; i<=9; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(9, 10)) )
    return false

  Soma = 0

  for (i = 1; i <= 10; i++)
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i)

  Resto = (Soma * 10) % 11

  if ((Resto == 10) || (Resto == 11)) 
    Resto = 0

  if (Resto != parseInt(strCPF.substring(10, 11) ) )
    return false

  return true
}

function validatePhone(phone) {
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
  return phoneRegex.test(phone);
}

function advance() {
  console.log(ipt01.value, ipt02.value, ipt03.value)

  if (!validateCPF(ipt04.value)) {
      alert("Por favor, insira um CPF válido.");
      return;
  }

  if (!validatePhone(ipt03.value)) {
      alert("Por favor, insira um número de telefone válido.");
      return;
  }

  if (ipt01.value == "" || ipt02.value == "" || ipt03.value == "" || ipt04.value == "") {
      alert("Houve um erro por favor verifique os campos.")
      return;
  } else {
      isValid = true;
      container.removeChild(form);
      container.innerHTML += createCode();
      return;
  }
}

function formatCPF(cpf) {
  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
}

function formatCartNumber(fcn) {
   fcn = fcn.replace(/\D/g, '');

   fcn = fcn.replace(/(\d{4})(?=\d)/g, '$1 ');
   
   fcn = fcn.trim();

   return fcn;
}

function formatValidate(fvd) {
  fvd = fvd.replace(/\D/g, '');

  if (fvd.length > 2) {
      fvd = fvd.replace(/(\d{2})(\d{1,2})/, '$1/$2');
  }

  if (fvd.length > 5) {
      fvd = fvd.substring(0, 5);
  }

  return fvd;
}

function formatCardCredit(card) {
  card = card.replace(/\D/g, '');

  card = card.replace(/(\d{4})(\d)/, '$1 $2');
  card = card.replace(/(\d{4})(\d)/, '$1 $2');
  card = card.replace(/(\d{4})(\d)/, '$1 $2');
  card = card.replace(/(\d{4})(\d)/, '$1 $2');

  return card;
}

function formatPhone(phone) {
  phone = phone.replace(/\D/g, '');

  phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
  phone = phone.replace(/(\d)(\d{4})$/, '$1-$2');

  return phone;
}

ipt04.addEventListener('input', function(event) {
  let value = event.target.value;

  event.target.value = formatCPF(value);
})

ipt03.addEventListener('input', function(event) {
  let value = event.target.value;

  event.target.value = formatPhone(value);
})