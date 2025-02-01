export default {
  data() {
    return {
      formErrors: {},
      countError: 0,
      validationRules: {
        required: field => value => !!value || `${field} is required.`,
        email: field => value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Please enter a valid email address.',
        numeric: field => value => /^\d+$/.test(value) || `Must contain only numbers.`,
        noSpace: field => value => /^\S+$/.test(value) || `${field} cannot contain spaces.`,
        noSymbol: field => value => /^[a-zA-Z0-9\s]*$/.test(value) || `${field} cannot contain symbols.`,
        combinedValidation: field => value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\s]+$/.test(value) ||
          `${field} must contain at least one lowercase letter, one uppercase letter, one number, and one special character.`,
        minLength: (field, min) => value => value.length >= parseInt(min) || `${field} must be at least ${min} characters long.`,
        maxLength: (field, max) => value => value.length <= parseInt(max) || `${field} must be at most ${max} characters long.`,
        match: (field, matchField) => (value, fields) => fields[matchField] === value || `${field} must match ${matchField}.`,
        phoneNumber: field => value => /^\+?(\d{1,3})?(\d{10})$/.test(value) || `${field} must be a valid phone number.`,
        dateFormat: (field) => value => /\d{4}-\d{2}-\d{2}/.test(value) || `${field} must be in the format YYYY-MM-DD.`


      },
    }
  },
  methods: {
    generateRules(validationNames, field) {
      const fieldRules = validationNames.map(validationName => {

        const [name, param] = validationName.split(":");
        const ruleFunction = this.validationRules[name];

        if (ruleFunction) {
          return param !== undefined ? ruleFunction(field, param) : ruleFunction(field);
        }
      }).filter(Boolean); // Remove undefined values

      return fieldRules;
    },
    validateForm(rules, formData) {
      this.formErrors = {};
      this.countError = 0
      const fieldRules = {};

      for (const rule of rules) {
        if (rule.validation && rule.validation.length > 0) {
          fieldRules[rule.model] = this.generateRules(rule.validation, rule.model)
        }
      }

      for (const field in fieldRules) {
        for (const rule of fieldRules[field]) {
          if (rule(formData[field]) != true) {
            this.formErrors[field] = rule(formData[field]);
            this.countError++
          }
        }
      }

      if (this.countError == 0) {
        return true
      } else {
        return false
      }
    },
  }
}