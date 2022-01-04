export default function validar_clave(password) {
  if (password.length >= 8) {
    var mayuscula = false;
    var minuscula = false;
    var numero = false;
    var caracter_raro = false;

    for (var i = 0; i < password.length; i++) {
      if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
        mayuscula = true;
      } else if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
        minuscula = true;
      } else if (password.charCodeAt(i) >= 48 && password.charCodeAt(i) <= 57) {
        numero = true;
      } else {
        caracter_raro = true;
      }
    }
    if (mayuscula === true && minuscula === true && caracter_raro === true && numero === true) {
      return true;
    }
  }
  return false;
};