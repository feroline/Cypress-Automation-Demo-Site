export const registerLocator = {
  
    FIRST_NAME: 'input[ng-model="FirstName"]',
    LAST_NAME: 'input[ng-model="LastName"]',
    ADDRESS: 'textarea[ng-model="Adress"]',
    EMAIL_ADDRESS: 'input[ng-model="EmailAdress"]',
    PHONE: 'input[ng-model="Phone"]',
    TEXT_LABEL_HOBBIES: 'Hobbies',



    FNC_GENERIC_RADIO: (value) => {
        return `input[type="radio"][ng-model="radiovalue"][value="${value}"]`;
    },
    FNC_GENDER_RADIO: (gender) => {
        console.log(gender)
        
        if(gender == 'male'){
            return registerLocator.FNC_GENERIC_RADIO('Male');
        }
        else if(gender == 'female'){
            return registerLocator.FNC_GENERIC_RADIO('FeMale');
        }else if(gender != 'male' || gender != 'female'){
            throw new Error(`atualmente é possível inserir apenas o sexo masculino ou feminino o inserido foi "${gender}"`)
        }
    },
};