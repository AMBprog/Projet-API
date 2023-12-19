export function InputFieldController(elementId, callbacks) {

  console.log("Initializing form element with id : " + elementId);

  //Recherche par l'identifiant de l'élément dans ce controleur
  this.element = document.getElementById(elementId);
  if (!this.element) {
    // Si il n'est pas trouvé, la console nous le retournera
    console.warn("Form element not found with id " + key);
    return undefined;
  }  

  //fonction pour valider les champs
  const validate = () => {
    const currentValue = this.element.value;
    return !!currentValue;
  }

  // permet de remettre à zero le statut de validation 
  const updateDisplay = (isValid) => {
    this.element.classList.remove('is-valid');
    this.element.classList.remove('is-invalid');

    // Et de l'ajouter à la bonne classe
    if (isValid) {
      this.element.classList.add('is-valid');
    } else {
      this.element.classList.add('is-invalid');
    }
  }

  // Calcul de si la valeur est valide ou non
  this.element.addEventListener('blur', () => {        
    const isValid = validate();

    // Met à jour le statut en fonction de si il est valide ou non
    updateDisplay(isValid);

    // Signaler qui le blur est arrivé sur ce contrôleur
    if (callbacks?.onblur) {
      callbacks.onblur()
    }
  });

  return {
    validate: validate,
    getValue: () => { return this.element.value }
  }
}
