/*  **********************   *
        FORMSPREE  FORM 
 *  **********************   */
// constante  donde  almacenar  los  datos  del  formulario.
const $form = document.querySelector('#formulario')

$form.addEventListener('submit', handleSubmit)

async function handleSubmit(event) {
    event.preventDefault()  // evitamos  que  se  recargue  la  pagina  despues  de enviado  el  formulario.
    const form = new FormData(this)	//  nos  guardamos  la  info  del  formulario,  la  guardamos  en  la  constante  form.
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
    if (response.ok) {
        this.reset()
        alert('Thanks for write us. You will have news about us soon  B )  .')
    }
}


/*********************
	CONTACT  FORM
**********************/
const formulario = document.getElementById('formulario');  // constante  donde  almacenar  los  datos  del  formulario.
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {

	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	compania: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
	mensaje: /^[a-zA-ZÀ-ÿ\s]{10,140}$[\.-!',?]?/, // Letras, espacios, y signos de puntuacion opcional. Pueden llevar acentos. 10 a 140 caract.
}


const campos = {
	
	nombre: false,
	compania: false,
	correo: false,
	telefono: false,
    mensaje: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;

		case "compania":
			validarCampo(expresiones.compania, e.target, 'compania');
		break;

		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break;

        case "mensaje":
			validarCampo(expresiones.mensaje, e.target, 'mensaje');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', handleSubmit) 

//  handleSubmit  maneja  el  envio  del  formulario  a  travez  de  FORMSPREE  y  controla  el  correcto  llenado  del  mismo.
async function handleSubmit(e) {
	e.preventDefault();

	//  FORMSPREE,  nos  guardamos  la  info  del  formulario,  la  guardamos  en  la  constante  form.
	const form = new FormData(this)	

	const terminos = document.getElementById('terminos');
	
	//  FORMSPREE  API  rest  y  fetch.
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    })
	//  end  FORMSPREE.
	if(campos.nombre && campos.compania && campos.correo && campos.telefono && campos.mensaje){
		formulario.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
}