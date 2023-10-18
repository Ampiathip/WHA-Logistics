import moment from "moment";
import CryptoJS from "crypto-js";
/**************** Date Time Config ****************/
const monthsFull = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];
const monthsShort = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
const weekdaysFull = [
  "อาทิตย์",
  "จันทร์",
  "อังคาร",
  "พุธ",
  "พฤหัสบดี",
  "ศุกร์",
  "เสาร์",
];
const weekdaysShort = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

export default {
  getDate(date) {
    let dd =
      (moment(date).get("date") < 10 ? "0" : "") + moment(date).get("date");
    let MM =
      (moment(date).get("month") + 1 < 10 ? "0" : "") +
      (moment(date).get("month") + 1);
    let yyyy = moment(date).get("year");
    return yyyy + "-" + MM + "-" + dd;
  },
  setDatePicker(date) {
    let dd = moment(date).get("date");
    let MM = moment(date).get("month");
    let yyyy = moment(date).get("year");
    return yyyy + "," + MM + "," + dd;
  },
  log(...message) {
    console.log(...message);
  },
  checkEmailFormat(email) {
    let emailPattern =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(email);
  },
  momentDate(datetime, type = "short") {
    if (datetime !== null) {
      let year = parseInt(moment(datetime).format("YYYY")) + 543;
      let dd = moment(datetime).get("date");
      let month;
      if (type == "short") {
        month = monthsShort[moment(datetime).get("month")];
      } else {
        month = monthsFull[moment(datetime).get("month")];
      }
      return dd + " " + month + " " + year;
    } else {
      return "-";
    }
  },
  momentTime(time) {
    // let datetime = moment(time).format("YYYY-MM-DD " + time);
    return moment(time).format("DD-MM-YYYY h:mm a");
  },
  momentDateTime(datetime, type = "short", setTime = false) {
    let year = parseInt(moment(datetime).format("YYYY")) + 543;
    let date = moment(datetime).get("date");
    let month;
    if (type == "short") {
      month = monthsShort[moment(datetime).get("month")];
    } else {
      month = monthsFull[moment(datetime).get("month")];
    }
    let time = setTime ? moment(datetime).format("HH:mm [น.]") : "";

    return date + " " + month + " " + year + " " + time;
  },
  isValid(data, value, valid_msg) {
    let x = document.getElementsByClassName("alert")[0];
    x.classList.add("alert-hidden");
    if (data == value) {
      return true;
    } else {
      x.classList.remove("alert-hidden");
      x.innerText = valid_msg;
      return false;
    }
  },
  isNotValid(data, value, valid_msg) {
    let x = document.getElementsByClassName("alert")[0];
    x.classList.add("alert-hidden");
    if (data != value) {
      return true;
    } else {
      x.classList.remove("alert-hidden");
      x.innerText = valid_msg;
      return false;
    }
  },
  totalPageCalc(array, page_size) {
    return Math.ceil(array.length / page_size);
  },
  pageData(array, page_number, page_size) {
    --page_number;
    return array.slice(page_number * page_size, (page_number + 1) * page_size);
  },
  rowNumber(indx, page_number, page_size) {
    return indx + 1 + (page_number - 1) * page_size;
  },
  pageControl(page_number, total_pages) {
    let page;
    if (page_number < 1) {
      page = 1;
    } else if (page_number > total_pages) {
      page = total_pages;
    } else {
      page = page_number;
    }
    return page;
  },
  isEvenRow(value) {
    return value % 2 == 0 ? "even" : "odd";
  },
  pagination(c, m, r = 2) {
    let current = c,
      last = m,
      delta = r,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || (i >= left && i < right)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  },

  /********** End of Pagination Calculation ****************/
  /************************** format price *****************************/
  formatNumber(price) {
    return new Intl.NumberFormat("en").format(price);
  },
  /******************************************************************/
  /**************** Local Storage *******************/
  storageSave(name, items) {
    localStorage.setItem(name, JSON.stringify(items));
  },
  storageGet(name) {
    let items = localStorage.getItem(name);
    if (items) {
      items = JSON.parse(items);
    } else {
      items = false;
    }
    return items;
  },
  storageRemove(name) {
    localStorage.removeItem(name);
  },
  /*************************************************/
  /**************** Cookie Save *******************/
  setCookie(cname, cvalue, hours = 1) {
    var now = new Date();
    now.setTime(now.getTime() + hours * 60 * 60 * 1000);
    document.cookie =
      cname + "=" + cvalue + "; expires=" + now.toUTCString() + "; path=/";
  },
  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  /*************************************************/
  /**************** Set Time Format *******************/
  setSQLTimeFormat(time) {
    return moment(time).format("YYYY-MM-DD HH:mm:ss");
  },
  base64toBlob(base64Data, contentType) {
    contentType = contentType || "";
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  },
  renderCategory(data) {
    let str = "";
    if (data) {
      data.map((item, index) => {
        str += item.name;
        if (index != data.length - 1) str += ", ";
      });
    }
    return str;
  },
  encryptData(data, obj = false) {
    if (obj) {
      return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        process.env.REACT_APP_SECRET_KEY
      ).toString();
    } else {
      return CryptoJS.AES.encrypt(
        data,
        process.env.REACT_APP_SECRET_KEY
      ).toString();
    }
  },
  decryptData(ciphertext, obj = false) {
    let bytes = CryptoJS.AES.decrypt(
      ciphertext.toString(),
      process.env.REACT_APP_SECRET_KEY
    );
    if (obj) {
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else {
      return bytes.toString(CryptoJS.enc.Utf8);
    }
  },
  getCtypeId(code, cType) {
    return cType
      .filter((item) => {
        return item.code == code;
      })
      .map((item) => {
        return item.id;
      })[0];
  },
  getCtypeName(id, cType, lang) {
    return cType
      .filter((item) => {
        return item.id == id;
      })
      .map((item) => {
        if (lang == "th") {
          return item.nameTh;
        } else {
          return item.nameEn;
        }
      })[0];
  },
  /*************************************************/
};
