import moment from 'moment'
import * as _ from 'lodash';
import Swal from 'sweetalert2'

export default {
  async confirmDelete(message = "Yakin untuk menghapus??") {
    const { isConfirmed } = await Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    })

    return isConfirmed
  },
  removeFigureAndImg(htmlString) {
    const div = document.createElement("div");
    div.innerHTML = htmlString;

    // Hapus elemen <figure> dan <img> jika ada
    const figureElement = div.querySelector("figure");
    const imgElement = div.querySelector("img");
    if (figureElement) figureElement.remove();
    if (imgElement) imgElement.remove();

    // Kembalikan string HTML yang telah dimodifikasi
    return div.innerHTML;
  },
  removeAssetUrl(item, assetUrl) {
    if (item.image.startsWith(assetUrl)) {
      item.image = item.image.replace(assetUrl, "");
    }
    return item
  },
  resetForm(formObject) {
    if (formObject && typeof formObject === "object") {
      for (const key in formObject) {
        if (Object.hasOwn(formObject, key)) {
          formObject[key] = "";
        }
      }
    }
  },
  firstUpper(str) {
    if (!str) return str; // Return the original string if it's empty
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  async getLocation() {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      if (!position) throw "Cant get location";

      return {
        status: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } catch (err) {
      return {
        status: false,
        message: err,
      };
    }
  },
  formatDesc(originalString) {
    const limitedString = originalString.length > 100 ? originalString.substring(0, 100) + '...' : originalString;
    return limitedString;
  },
  formatDate(dateToFormat) {
    const parsedDate = moment(dateToFormat, 'YYYY-MM-DD HH:mm:ss');
    const formattedDate = parsedDate.format('dddd, D MMMM YYYY');
    return formattedDate;
  },
  formatNumber(num) {
    // Convert the number to a string
    const numStr = num.toString();
    // Use regular expression to add commas every three digits
    const formattedNum = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedNum;
  },
  removeFormat(str) {
    // Remove commas from the string
    const numStr = str.replace(/./g, '');
    // Parse the string back into a number
    const num = parseFloat(numStr);
    return num;
  },
  formatToTwoDigits(number) {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number.toString();
    }
  },
  findOne(arr, conditions) {
    const foundItem = _.find(arr, (item) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });

    return foundItem !== undefined ? foundItem : false;
  },
  findAll(arr, conditions, logicalOperator) {
    const foundItem = _.filter(arr, (item) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });
    return (foundItem !== undefined || foundItem.length !== 0) ? foundItem : false;
  },
  delete(arr, conditions, logicalOperator) {
    return _.reject(arr, (item) => {
      return conditions.every((condition) => {
        const value = item[condition.key];
        const filterValue = condition.value;

        switch (condition.operator) {
          case '!=':
            return value !== filterValue;
          case '>':
            return value > filterValue;
          case '>=':
            return value >= filterValue;
          case '<':
            return value < filterValue;
          case '<=':
            return value <= filterValue;
          default:
            return value === filterValue;
        }
      });
    });
  },
  checkArr(data) {
    if (Array.isArray(data)) {
      return this.isArrayEmpty(data) ? false : true;
    } else if (typeof data === "object" && data !== null) {
      //object
      return this.isObjectEmpty(data) ? false : true;
    } else {
      return false;
    }
  },

  isArrayEmpty(arr) {
    return Array.isArray(arr) && arr.length === 0;
  },

  isObjectEmpty(obj) {
    return (
      typeof obj === "object" && obj !== null && Object.keys(obj).length === 0
    );
  },
  isNumber(event) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  },
};

