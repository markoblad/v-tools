import * as _ from 'lodash';
import * as s from 'underscore.string';
import * as pluralize from 'pluralize';
import * as moment from 'moment';
import * as math from 'mathjs';
import * as accounting from 'accounting';
import * as vn2w from 'v-number-to-words';

export class VTools {

  public static get ROUND_TO_DEFAULT(): number {
    return 7;
  }

  public static get ALPHABET(): string[] {
    return ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  }

  public static get ROMAN_MAP(): {} { return {
      '1000': 'M',
      '900': 'CM',
      '500': 'D',
      '400': 'CD',
      '100': 'C',
      '90': 'XC',
      '50': 'L',
      '40': 'XL',
      '10': 'X',
      '9': 'IX',
      '5': 'V',
      '4': 'IV',
      '1': 'I',
    };
  }

  public static get ORDERED_ROMAN_MAP(): any { return [
      [1000, 'M'],
      [900, 'CM'],
      [500, 'D'],
      [400, 'CD'],
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
    ];
  }

  public static get PERIOD_FREQUENCY_LEGEND(): {} { return {
      '1': 'One year',
      '2': 'Six months',
      '3': 'Four months',
      '4': 'Three months',
      '6': 'Two months',
      '8': 'Month and a half',
      '12': 'One month',
      '24': 'Half month',
      '26': 'Two weeks',
      '52': 'Week',
      '364': 'One day',
      '365': 'One day',
      '366': 'One day',
    };
  }

  // public static get PERIOD_FREQUENCY_TO_PERIOD(): {} { return {
      // '1': '1.years',
      // '2': '6.months',
      // '3': '4.months',
      // '4': '3.months',
      // '12': '1.months',
      // '26': '2.weeks',
      // '52': '1.weeks',
  //   };
  // }

  public static get ANNUAL_FREQUENCY_TO_LABEL(): {} { return {
      '1': 'Annual',
      '4': 'Quarterly',
      '12': 'Monthly',
    };
  }

  // public static get ANNUAL_FREQUENCY_TO_TIME(): {} { return {
      // '1': '1.year',
      // '4': '3.months',
      // '12': '1.month',
  //   };
  // }

  public static get PERIOD_FREQ_OPTIONS(): {} { return {
      'Annual': 1,
      'Semi-Annual': 2,
      'Quarter': 4,
      'Month': 8,
    };
  }

  public static get ALL_FISCAL_PERIODS(): string[] { return [
      'N/A',
      'FY', 'FYTD',
      'Q1', 'Q2', 'Q3', 'Q4',
      'H1', 'H2',
      '9M',
      'T1M', 'T3M', 'T9M', 'TSM', 'TTM',
      'M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07', 'M08', 'M09', 'M10', 'M11', 'M12',
      'ASOF'
    ];
  }

  public static get PERIODLY(): string[] { return [
      'annually',
      'semi-annually',
      'quarterly',
      'bi-monthly',
      'monthly',
      'semi-monthly',
      'bi-weekly',
      'weekly',
      'daily',
      'hourly'
    ];
  }

  public static get PERIODS(): string[] { return [
      'years',
      'semi-years',
      'quarters',
      'bi-months',
      'months',
      'semi-months',
      'bi-weeks',
      'weeks',
      'days',
      'hours',
      'minutes',
      'seconds',
    ];
  }

  public static get SINGULAR_PERIODS(): string[] {
    return _.map(VTools.PERIODS, (i) => { return pluralize(i, 1); });
  }

  public static isBlank(value?: any): boolean {
    if (value == null || value == undefined) {
      return true;
    } else if (typeof value === 'string' || typeof value === 'number') {
      return s.isBlank(value.toString());
    } else if (VTools.isArray(value)){
      return value.length === 0;
    } else if (VTools.isObject(value)) {
      return Object.getOwnPropertyNames(value).length === 0;
    } else {
      return s.isBlank(VTools.makeString(value));
    }
  }

  public static isObject(obj?: any): boolean {
    return Object.prototype.toString.call( obj ) === '[object Object]';
  }

  public static isArray(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  public static isDate(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  public static isString(value?: any): boolean {
    return (typeof(value) === 'string');
  }

  public static isNumeric(value?: any): boolean {
    return !VTools.isObject(value) && !VTools.isArray(value) && !isNaN(parseFloat(value)) && isFinite(value);
  }

  public static isTrue(value?: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }
    let arr = ['yes', 'y', 'true', 't', '1', 'on'];
    return (_.includes(arr, value.toString().toLowerCase()));
  }

  public static isFalse(value?: any): boolean {
    if (value === undefined || value === null) {
      return false;
    }
    let arr = ['no', 'n', 'false', 'f', '0', 'off'];
    return (_.includes(arr, value.toString().toLowerCase()));
  }

  public static isTrueOrFalse(value?: any): boolean {
    return VTools.isTrue(value) || VTools.isFalse(value);
  }

  public static eachSlice(value: any[], size: number = 1, callback: Function): void {
    for (let i = 0, l = value.length; i < l; i += size) {
      callback(value.slice(i, i + size));
    }
  }

  public static arraySum(value?: any): number {
    if (value && VTools.isArray(value)) {
      return _.reduce(value, function(memo: number, num: any) {
        let numType = typeof num;
        return ((num && (numType === 'string' || numType === 'number') &&  (isFinite(num) || num === Infinity)) ? memo + parseFloat(num) : memo);
      }, 0);
    } else { return 0; }
  }

  public static arrayItemCounts(array: any): any {
    return _.reduce(array || [], function(memo: any, e: any){
      memo[e] = memo[e] || 0; memo[e] += 1; return memo;
    }, {});
  }

  public static hasRangeOverlap(
    range1: [number, number],
    range2: [number, number],
    options: {strict?: boolean, sort?: boolean} = {}
  ): boolean {
    if (VTools.isTrue(options['sort'])) {
      range1 = range1.sort();
      range2 = range2.sort();
    }
    return range1 && range2 && range1.length === 2 && range2.length === 2 &&
    (VTools.isTrue(options['strict']) ?
      ( 
        (range1[0] !== range1[1]) && (
          ((range1[0] < range2[1]) && (range1[1] > range2[0])) ||
          ((range2[0] < range1[1]) && (range2[1] > range1[0]))
        )
      ) :
      ((range1[0] <= range2[1]) && (range2[0] <= range1[1]))
    );
  }

  public static makeString(value?: any): string {
    if (value == null) return '';
    return '' + value;
  }

  public static coerceToString(value: any): string {
    return _.some(['[object Undefined]', '[object Null]'], (t): boolean => {
      return Object.prototype.toString.call(value) === t;
    }) ? '' : value.toString();
  }

  public static pluralize(value: string): string {
    return pluralize.apply(this, arguments);
  }

  public static reverse(value: string): string {
    return value.split('').reverse().join('');
  }

  public static ambipluralize(value: string): any {
    if (s.isBlank(value)) return value;
    value = VTools.pluralize(value);
    if ((/ies$/i).test(value)) {
      value = value.replace(/ies$/i, '(ies)');
    // } else if (value.test(/es$/i)) {
      // value = value.replace(/es$/i, '(es)')
    } else if ((/s$/i).test(value)) {
      value = value.replace(/s$/i, '(s)');
    }
    return value;
  }

  public static normalizeString(value?: string): any {
    return (value || '').toString()
    .replace(/[\s\'\.\,\:\;\/\(\)\[\]\-\#\@\!\$\%\^\&\*\+\=\"\?\<\>\~\`]+/g, '')
    .replace(/^\d/, function(m) { return 'pre_' + m[0]; });
  }

  public static parseZeroPaddedInt(value?: any): number {
    if (s.isBlank(value) || value === 0 || value === '0' || s.isBlank(value.toString().replace(/0/g, ''))) {
      return 0;
    }
    value = value.toString();
    let firstNonZeroIndex = value.search(/(?!0)/);
    return parseInt(value.slice(firstNonZeroIndex, value.length), 10);
  }

  public static stringToDecimal(s: any): number {
    // return parseFloat((s || 0).toSting().trim().replace(/[\,\$\%\-{2,}]*/g, ''))
    // return parseFloat((s || 0).toSting().trim()
    //   .replace(/[\,\$\%]*/g, '').replace(/\p{Sc}/ug, ''))
    return parseFloat((s || 0).toString().trim().replace(/[^\d\.]/g, ''));
  }

  public static string_to_decimal = VTools.stringToDecimal;

  public static stringToInteger(s: any): number {
    return parseInt(VTools.stringToDecimal(s).toString(), 10);
  }

  public static string_to_integer = VTools.stringToInteger;

  public static parseBigOrZero(value: number | string) {
    return math.bignumber(VTools.isNumeric(value) ? value : 0.0);
  }

  public static variableCurrency(number: number | string, currency?: string): string | null {
    number = VTools.makeString(number);
    if (VTools.roundToDecimal(parseFloat(number), 2) === parseFloat(number)) {
      return accounting.formatMoney(number, currency);
    } else {
      let str = VTools.decimalToStr(parseFloat(number));
      let precision = str ? (str.split('.')[1] || '').length : 2;
      if (precision === 1) precision = 2;
      return accounting.formatMoney(number, currency, precision);
    }
  }

  public static variableInteger(number: number | string): string | null {
    number = VTools.makeString(number);
    if (!VTools.isNumeric(number)) return number;
    if (VTools.roundToDecimal(parseFloat(number), 0) === parseFloat(number)) {
      return accounting.formatNumber(<any>number);
    } else {
      let decimalStr = VTools.decimalToStr(parseFloat(number));
      if (!decimalStr) return decimalStr;
      let pieces = decimalStr.split('.');
      return accounting.formatNumber(<any>(pieces[0] || '0')) + '.' + (pieces[1] || '00');
    }
  }

  public static noExponentsStr(number: number | string): string {
    number = VTools.makeString(number);
    let f = parseFloat(number);
    let data = String(f).split(/[eE]/);
    if (data.length === 1) { return data[0]; }
    let z = '', sign = f < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + '0.';
      while (mag++) z += '0';
      return z + str.replace(/^\-/, '');
    }
    mag -= str.length;
    while (mag--) z += '0';
    return str + z;
  }


  public static decimalToStr(number: number | string, roundTo: number = VTools.ROUND_TO_DEFAULT): string | null {
    number = VTools.makeString(number);
    let f = parseFloat(number);
    let str = VTools.noExponentsStr(f);
    roundTo = VTools.isNumeric(roundTo) ? parseInt(roundTo.toString(), 10) : VTools.ROUND_TO_DEFAULT;
    if (str === 'NaN') return null;
    let firstNonZeroIndex = (VTools.reverse(str).split('')).findIndex( (element): boolean => {
      return (parseInt(element, 10) !== 0 || element === '.');
    });
    if (firstNonZeroIndex === -1) return '0.00';
    str = str.substring(0, (str.length + firstNonZeroIndex));
    if (!(/\./).test(str) || (_.last(str.split('.')) || '').length < 3 || str.slice(-1) === '.' ) {
      str = parseFloat(str).toFixed(2);
    } else if (!(/\./).test(str) || (_.last(str.split('.')) || '').length > 7 || str.slice(-1) === '.' ) {
      str = VTools.roundToDecimal(parseFloat(str), roundTo).toString();
    }
    return str;
  }

  public static decimalToPercStr(number: number | string) {
    return (VTools.decimalToStr(parseFloat(
      math.multiply(VTools.parseBigOrZero(number),
      math.bignumber(100.0)
    ).toString())) || '0.0') + '%';
  }

  public static percToDecimal(number: number | string) {
    return parseFloat(math.divide(
      VTools.parseBigOrZero(number),
      math.bignumber(100.0)).toString()
    );
  }

  public static percentThreshold(number: number | string, verbose?: boolean) {
    if (!VTools.isNumeric(number)) return number;
    number = VTools.makeString(number);
    let result;
    if (parseFloat(number) === 50) { result = 'a majority';
    } else if (VTools.roundToDecimal(parseFloat(number), 2) ===  66.66 ||
    VTools.roundToDecimal(parseFloat(number), 2) === 66.67) {
      result = 'at least two-thirds';
    } else if (VTools.roundToDecimal(parseFloat(number), 1) === 33.3) {
      result = 'at least one-third';
    } else { result = 'at least ' + number + '%'; }
    // if (isTrue(verbose) && num !== 50) result = result + ' (' + num + ')';
    return result;
  }

  public static numberWithCommas(x: number | string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  public static decimalToPercentage(number: number | string, dec: number = 2): string {
    return ((parseFloat(VTools.makeString(number)) || 0.0) * 100).toFixed(dec);
  }

  public static roundToDecimal(value: number | string, dec: number = 2): number {
    dec = VTools.isNumeric(dec) ? parseInt(VTools.makeString(dec), 10) : 2;
    if (VTools.isNumeric(value)) {
      let bigValue = VTools.parseBigOrZero(value);
      let num: any = math.divide(
      //   math.round(math.multiply(bigValue, math.bignumber(math.pow(10, dec)))),
        math.round(math.multiply(bigValue, math.pow(10, dec))),
        math.pow(10, dec)
      );
      // if (dec >= 0) num = num.toFixed(dec);
      if (dec >= 0) { num = math.format(num, {notation: 'fixed', precision: dec}); };
      num = parseFloat(num.toString());
      return num;
    } else {
      return parseFloat(VTools.makeString(value));
    }
  }

  public static numberToWords(value: number | string) {
    return vn2w.numberToWords(value);
  }

  public static enumDate(obj?: any) {
    if (s.isBlank(obj)) return null;
    if (typeof(obj) === 'number') {
      // let exp = ParseInt(obj.toExponential().split(/e[\+\-]/)[1], 10);
      // if (exp < 12) {

      // } else {
        return obj;
      // }
    }
    if (typeof(obj) === 'string' || typeof(obj) === 'object') {
      // let dateObj = Date.parse(obj);
      // let offset = new Date().getTimezoneOffset()*60000;
      // return new Date(dateObj).getTime() + offset
      return parseInt(moment.utc(obj).format('x'), 10);
    }
    // return Date.parse(obj)
    return parseInt(moment.utc(obj).format('x'), 10);
  }

  public static coerceToDate(date: any, options?: {}) {
    try {
      return moment.utc(VTools.enumDate(date) || 0);
    } catch (err) {
      return date;
    }
  }

  public static formatDate(value?: any, options: any = {utc: false}) {
    let momentObj: moment.Moment;
    if (value && value.toString().length > 0) {
      if (typeof value === 'number') {
        momentObj = moment.unix(value);
      } else if (value.toString().trim().match(/^\d{4}-\d{2}\d{2}$/)) {
        momentObj = moment(value, 'YYYY-MM-DD');
      } else if (value.toString().trim().match(/^\d{8}$/)) {
        momentObj = moment(value, 'YYYYMMDD');
      } else {
        momentObj = moment(value);
      }
      return options['utc'] ? momentObj.utc().format('LL') : momentObj.format('LL');
    } else {
      return value;
    }
  }

  public static formatDateSentence(date?: any, options?: {}) {
    if (s.isBlank(date)) return date;
    date = VTools.coerceToDate(date, options);
    try {
      return moment(date).format('Do') + ' day of ' + moment(date).format('MMMM, YYYY');
    } catch (err) { return date; }
  }

  public static titleize(value: string) {
    if (s.isBlank(value)) return value;
    return s.titleize(value.toString().trim());
  }

  public static toRoman(value: number) {
    value = value || 0;
    let result = '';
    if (value === 0) { return result; };
    _.each(VTools.ORDERED_ROMAN_MAP, function(pair) {
      let divisor = pair[0];
      let roman = pair[1];
      let quotient = Math.floor(value / divisor);
      let modulus = value % divisor;
      result = result + roman.repeat(quotient);
      value = modulus;
    });
    return result;
  }

  public static toRomanette(value: number): string {
    value = value || 0;
    return VTools.toRoman(value).toLowerCase();
  }
  public static toAlpha(value: number | string, result?: string) {
    value = parseInt(VTools.makeString(value) || '0', 10);
    result = result || '';
    let divisor = 26;
    while (value > 0) {
      let updatedNumber = Math.floor((value - 1) / divisor);
      let modulus = (value - 1) % divisor;
      result = VTools.ALPHABET[modulus] + result;
      value = updatedNumber;
    }
    return result;
  }

  public static toOrdinal(value: number): string {
    let ordStub: string[] = ['th', 'st', 'nd', 'rd'],
      modulus: number = value % 100;
    return value + (ordStub[(modulus - 20) % 10] || ordStub[modulus] || ordStub[0]);
  }

  public static join_array(array: any[]) {
    if (array && VTools.isArray(array)) {
      let nonBlanks = _.filter(array, (i) => { return !s.isBlank(i); });
      return VTools.smart_array_values(nonBlanks).join(', ');
    }
  }

  public static join_array2d(array2d: any[]) {
    if (array2d && VTools.isArray(array2d)) {
      return VTools.smart_array2d_values(array2d)
      .map((innerArray: any) => {
        return VTools.isArray(innerArray) ?
        innerArray.join(' - ') :
        innerArray.toString();
      }).join('; ');
    }
  }

  // confusing: doesn't return keys
  public static join_array_of_hashes_values(arrayOfHashes: any[]): string | any {
    if (arrayOfHashes && VTools.isArray(arrayOfHashes)) {
      return VTools.smart_array_of_hash_values(arrayOfHashes)
      .map((hash: any) => {
        return (VTools.isObject(hash) ?
        (_.map(hash, (v, k) => { return VTools.smartFormatValue(v); }).join(', ')) :
        VTools.smartFormatValue(hash));
      }).join('; ');
    }
  }

  // confusing naming: returns an array
  public static hash_to_lines(hash: any): any[] {
    return _.map(VTools.smart_hash_values(hash), (v, k) => {
      return VTools.makeString(k) + ': ' + VTools.makeString(v);
    });
  }

  // confusing naming: returns a string
  public static hashes_to_lines(hashes: any[]): string | any {
    if (!VTools.isArray(hashes)) { return hashes; }
    return hashes.map((hash) => {
      return VTools.hash_to_lines(hash);
    }).join('; ');
  }

  public static smartRecursiveFormat(obj: any) {
    let updatedObj: any;
    if (obj && VTools.isObject(obj)) {
      updatedObj = _.defaults({}, obj);
      _.each(obj, (v, k) => {
        updatedObj[k] = VTools.smartRecursiveFormat(v);
      });
    } else if (obj && VTools.isArray(obj)) {
      updatedObj = [];
      obj.forEach((v: any) => {
        updatedObj.push(VTools.smartRecursiveFormat(v));
      });
    } else {
      updatedObj = VTools.smartFormatValue(obj);
    }
    return updatedObj;
  }
  public static smart_array_values = VTools.smartRecursiveFormat;
  public static smart_hash_values = VTools.smartRecursiveFormat;
  public static smart_array2d_values = VTools.smartRecursiveFormat;
  public static smart_array_of_hash_values = VTools.smartRecursiveFormat;

  public static smartFormatValue(v: any): string {
    let formattedV = v;
    if (VTools.isDate(v) || moment.isMoment(v) ||
    (typeof v === 'string' && (/^\d\d\d\d\-\d\d\-\d\d$/).test(v))) {
      formattedV = VTools.formatDate(v);
    } else if (typeof v === 'number') {
      formattedV = VTools.variableInteger(v);
    }
    return formattedV;
  }
  public static smart_format_value = VTools.smartFormatValue;

  public static valueOrHolder(value?: any) {
    if (s.isBlank(value) || value.toString().replace(/\s/ig, '').length === 0) {
      return '_________________';
    } else {
      return value;
    }
  }

  public static arrayToHumanList(value?: any, options?: any): string {
    options = options || {};
    if (!VTools.isArray(value)) { return value; };
    _.defaults(options,
      {
        separator: ',',
        junctive: 'and',
        serial: null,
      }
    );
    let multipleJunctive = (options['serial'] || (options['separator'] === ';') && !VTools.isFalse(options['serial'])) ?
      (options['separator'] + ' ') : ' ';
    let length = value.length;
    let str = '';
    _.each(value, function(item: any, index: number) {
      if (index !== 0) {
        str = str + (
          (length === 2) ?
            (' ' + options['junctive'] + ' ') :
            (
              (length > 2 && index < (length - 1)) ?
                (options['separator'] + ' ') :
                (multipleJunctive + options['junctive'] + ' ')
            )
        );
      }
      str = str + item;
    });
    return str;
  }

  public static jsFormat(val: any, fns?: any): any {
    if (VTools.isBlank(fns)) { return VTools.coerceToString(val); }
    fns = [].concat(fns || []);
    _.each(fns, (fn: any) => {
      try { val = VTools.hasOwnProperty(fn) ? (<any>VTools)[fn](val) : val;
      } catch (err) { return VTools.coerceToString(val); }
    });
    return VTools.coerceToString(val);
  }

  public static jsFormatVField(val: any, vFieldHelp?: any, formatterKeys?: any[]) {
    if (!vFieldHelp || VTools.isBlank(formatterKeys)) { return val; }
    let fns: any = [];
    (formatterKeys || []).forEach((formatterKey) => {
      return fns = fns.concat((vFieldHelp || {})[formatterKey] || []);
    });
    return s.isBlank(fns) ? val : VTools.jsFormat(val, fns);
  }

  public static jsFormatVFields(item: any, vFieldsHelp?: any, formatterKeys?: any[]) {
    if (s.isBlank(item) || !vFieldsHelp) return item;
    let updatedItem: any = {};
    _.each(item, function(val, key) {
      let vFieldHelp = (vFieldsHelp || {})[key] || {};
      updatedItem[key] = VTools.jsFormatVField(val, vFieldHelp, formatterKeys);
    });
    return updatedItem;
  }

  public static jsInputProcess(item: {}, vFieldsHelp?: {}, formatterKeys?: any[]) {
    return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors']);
  }

  public static jsDisplay(item: {}, vFieldsHelp?: {}) {
    return VTools.jsFormatVFields(item, vFieldsHelp, ['js_formatters']);
  }

  public static jsInputDisplay(item: {}, vFieldsHelp?: {}) {
    return VTools.jsFormatVFields(item, vFieldsHelp, ['jsInputProcessors', 'js_formatters']);
  }

}

export default VTools;
