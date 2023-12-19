import { InputFieldController } from './input_api.js';

export function FormController(elementId, formConfig, callbacks) {

  this.element = document.getElementById(elementId);
  if (!this.element) {
    console.warn("No form element found with id = " + elementId);
    return;
  }
  
  // Impose à certains champs d'être 'validé, c'est-à-dire remplie 
  const controllers = {};
  for (const [key, config] of Object.entries(formConfig)) {
    let controller = undefined;

    switch (config.type) {
      case 'input':
        controller = new InputFieldController(key, {
          onblur: () => {
            validate();
          }
        });
        break;
      case 'textarea':
         controller = new InputFieldController(key, {
           onblur: () => {
            validate();
          }
        });
        break;
    }

    if (controller) {
      controllers[key] = controller;
    }
  }

  this.element.addEventListener('submit', (event) => {
    event.preventDefault();

    // permet d'avoir plusieurs champs de données pour le formulaire
    const data = {};
    for (const [key, controller] of Object.entries(controllers)) {
      data[key] = controller.getValue();
    }

    // renvoie les données saisies
    if (callbacks?.onsubmit) {
      callbacks.onsubmit(data);
    }
  })

  // permet de demander si les données saisies sont bien valides afin de rendre possible l'envoie
  const validate = () => {
    let isValid = true;
    for (const [key, controller] of Object.entries(controllers)) {
      isValid = controller.validate() && isValid;
    }
    console.log("Form valid ? ", isValid);

    if (callbacks?.onvalidate) {
      callbacks.onvalidate(isValid);
    }
  }

  validate();

  return {
    validate: validate,    
  }
}

